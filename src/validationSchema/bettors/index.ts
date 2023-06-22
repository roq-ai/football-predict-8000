import * as yup from 'yup';

export const bettorValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
