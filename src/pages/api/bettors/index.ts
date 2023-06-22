import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { bettorValidationSchema } from 'validationSchema/bettors';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBettors();
    case 'POST':
      return createBettor();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBettors() {
    const data = await prisma.bettor
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'bettor'));
    return res.status(200).json(data);
  }

  async function createBettor() {
    await bettorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.bettor_prediction?.length > 0) {
      const create_bettor_prediction = body.bettor_prediction;
      body.bettor_prediction = {
        create: create_bettor_prediction,
      };
    } else {
      delete body.bettor_prediction;
    }
    if (body?.feedback?.length > 0) {
      const create_feedback = body.feedback;
      body.feedback = {
        create: create_feedback,
      };
    } else {
      delete body.feedback;
    }
    const data = await prisma.bettor.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
