import { useState } from 'react';

export const useTabState = (defaultValue?: string) => useState(defaultValue || '');

export const useTabStateNew = (defaultValue?: string) => {
  const [selectedTabId, onSelect] = useState(defaultValue || '');

  return { selectedTabId, onSelect };
};
