import { ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

import { OnClickOutside } from '@/components/OnClickOutside';
import { Flex } from '../Flex';
import { Spacer } from '../Spacer';

import * as S from './styles';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Drawer = ({ open, onClose, title, icon, children }: DrawerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return createPortal(
    <S.Container ref={containerRef} open={open}>
      {open && <OnClickOutside containerRef={containerRef} onClose={onClose} />}

      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Flex flexDirection="row" alignItems="center" gap={12}>
          {icon}

          <h2 style={{ margin: 0, fontSize: 26 }}>
            {title}
          </h2>
        </Flex>

        <S.CloseIcon
          // TODO Figure out why when we execute the callback immediately the hook doesn't update
          onClick={() => setTimeout(onClose, 0)}
        />
      </Flex>
      <Spacer size="l" />

      {children}
    </S.Container>,
    document.body,
  );
};
