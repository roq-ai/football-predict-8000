import * as yup from 'yup';

export const predictionValidationSchema = yup.object().shape({
  predicted_result: yup.string().required(),
  match_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
