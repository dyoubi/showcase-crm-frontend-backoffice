import React from 'react';

import * as t from './types';

interface ConfirmationModalContextType {
  triggerConfirmationModal: (options: t.ConfirmationModalState) => void;
}

export const ConfirmationModalContext = React.createContext<
  ConfirmationModalContextType | undefined
>(undefined);
