import { useContext } from 'react';

import { StoreContext } from '../context';

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStoreContext must be within StoreContext.Provider');
  }

  return context;
};
