import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { bettorPredictionValidationSchema } from 'validationSchema/bettor-predictions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.bettor_prediction
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBettorPredictionById();
    case 'PUT':
      return updateBettorPredictionById();
    case 'DELETE':
      return deleteBettorPredictionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBettorPredictionById() {
    const data = await prisma.bettor_prediction.findFirst(convertQueryToPrismaUtil(req.query, 'bettor_prediction'));
    return res.status(200).json(data);
  }

  async function updateBettorPredictionById() {
    await bettorPredictionValidationSchema.validate(req.body);
    const data = await prisma.bettor_prediction.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBettorPredictionById() {
    const data = await prisma.bettor_prediction.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
