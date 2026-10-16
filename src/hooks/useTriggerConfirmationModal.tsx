import { useContext } from 'react';

import { ConfirmationModalContext } from '@/components/ConfirmationModalProvider/context';

import { IconDanger } from '@/shared/Icons';

import { titleCase } from '@/utils';

export const useTriggerConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);

  if (!context) {
    throw new Error(
      'useTriggerConfirmationModal must be within ConfirmationModalProvider.Provider',
    );
  }

  return context.triggerConfirmationModal;
};

interface DeleteItemParams {
  type?: string;
  name?: string;
  onConfirm?: () => void;
}

export const useConfirmDeleteItem = () => {
  const triggerConfirmationModal = useTriggerConfirmationModal();

  return ({ type = '', name = '', onConfirm }: DeleteItemParams) =>
    triggerConfirmationModal({
      icon: IconDanger,
      isDeleting: true,
      width: 480,
      title: 'Warning',
      content: (
        <>
          Are you sure you want to delete the {type}&nbsp;<strong>{name || 'untitled'}</strong>?
        </>
      ),
      onConfirm,
      confirmText: titleCase(`Delete ${type}`),
      isOverflow: false,
    });
};
