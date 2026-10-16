import * as yup from 'yup';

import './customMethods';

yup.setLocale({
  mixed: {
    notType: 'Invalid format',
    required: 'Required',
  },
  string: {
    min: ({ min }) => `Minimum ${min} characters`,
    max: ({ max, value }) =>
      `Maximum ${max} characters, there is ${value.length - max} extra characters`,
  },
});
