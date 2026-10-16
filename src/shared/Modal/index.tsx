import { memo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Global } from '@emotion/react';

import { Spacer } from '../Spacer';

import * as S from './styles';
import * as t from './types';

export const Modal = memo((props: t.ModalProps) => {
  const {
    background = 'base',
    'data-testid': dataTestId,
    children,
    isClosable = true,
    isOverflow = true,
    onHide,
    show,
    topContent,
    ...rest
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const outsideClickCallback = useCallback(() => {
    if (!isClosable || !onHide) {
      return;
    }

    onHide();
  }, [isClosable, onHide]);

  if (!show) {
    return null;
  }

  return createPortal(
    <S.Layer>
      <Global styles={{ body: { overflow: 'hidden' } }} />

      <S.Wrapper onClick={outsideClickCallback}>
        <S.Content
          background={background}
          data-testid={dataTestId}
          onClick={(e) => e.stopPropagation()}
          isOverflow={isOverflow}
          ref={contentRef}
          width={rest.width || 750}
          topContent={
            <>
              {topContent}
              <Spacer size="xxs" />
              {isClosable && <S.CloseIcon size="l" onClick={onHide} />}
            </>
          }
          {...rest}
        >
          {children}
        </S.Content>
      </S.Wrapper>
    </S.Layer>,
    document.body,
  );
});

Modal.displayName = 'Modal';
