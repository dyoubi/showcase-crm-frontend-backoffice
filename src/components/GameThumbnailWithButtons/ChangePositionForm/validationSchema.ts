import * as yup from 'yup';

export const validationSchema = yup.object({
  newPosition: yup.number().typeError('Please enters a number').min(1, 'Minimum value is 0'),
});
