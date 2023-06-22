import * as yup from 'yup';

export const bettorPredictionValidationSchema = yup.object().shape({
  bettor_id: yup.string().nullable(),
  prediction_id: yup.string().nullable(),
});
