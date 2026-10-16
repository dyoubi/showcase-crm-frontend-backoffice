import React from 'react';

import { IconFC } from '../Icons/types';

export interface TabItem {
  title?: React.ReactNode;
  content?: React.ReactNode;
  icon?: IconFC;
  tabId: string;
  disabled?: boolean;
}
