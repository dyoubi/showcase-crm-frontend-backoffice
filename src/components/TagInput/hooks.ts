import { useState } from 'react';

import * as t from './types';

export const useTagInputState = (defaultValue?: t.TagInputState) =>
  useState<t.TagInputState>(defaultValue || []);
