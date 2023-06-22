import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  content: yup.string().required(),
  bettor_id: yup.string().nullable(),
  prediction_id: yup.string().nullable(),
});
