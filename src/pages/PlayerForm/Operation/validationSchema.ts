import * as yup from 'yup';

import * as t from './types';

export const validationSchema: yup.SchemaOf<t.AddOperationForm> = yup.object({
  balanceId: yup.string().required('Please select an balance'),
  operationType: yup.mixed().required('Please select an operation type'),
  amount: yup
    .number()
    .typeError('An number is required for this field')
    .positive('Number must be positive')
    .required(),
});
