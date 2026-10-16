import { ReactNode, useState, memo, useMemo } from 'react';

import { Button } from '@/shared/Button';
import { Modal } from '@/shared/Modal';

import { Flex } from '@/shared/Flex';

import { DATA_TEST_IDS } from '@/constants';
import { ConfirmationModalContext } from './context';
import { ConfirmationModalState } from './types';
import { useToggle } from '../../hooks';

interface ConfirmationModalProviderProps {
  children?: ReactNode;
}

export const ConfirmationModalProvider = memo(({ children }: ConfirmationModalProviderProps) => {
  const [{
    cancelText,
    confirmText,
    content,
    isDeleting,
    onConfirm,
    title,
    ...rest
  }, setState] = useState<ConfirmationModalState>({});

  const [display, toggleDisplay] = useToggle();

  const value = useMemo(
    () => ({
      triggerConfirmationModal: (params: ConfirmationModalState) => {
        setState(params);
        toggleDisplay();
      },
    }),
    [setState, toggleDisplay],
  );

  const onClickConfirm = () => {
    onConfirm?.();
    toggleDisplay();
  };

  return (
    <ConfirmationModalContext.Provider value={value}>
      {children}

      <Modal {...rest} title={title} show={display} onHide={toggleDisplay}>
        <div style={{ marginBottom: '24px' }}>{content}</div>

        <Flex
          flexDirection="row"
          justifyContent="flex-start"
          gap={16}
          style={{ marginTop: '16px' }}
        >
          <Button
            color={(isDeleting) ? 'danger' : 'secondary'}
            data-testid={DATA_TEST_IDS.CONFIRM_CHOICE}
            onClick={onClickConfirm}
          >
            {confirmText || 'Yes'}
          </Button>

          <Button
            color={(isDeleting) ? 'secondary' : 'danger'}
            data-testid={DATA_TEST_IDS.CANCEL_CHOICE}
            onClick={toggleDisplay}
          >
            {cancelText || 'Cancel'}
          </Button>
        </Flex>
      </Modal>
    </ConfirmationModalContext.Provider>
  );
});
