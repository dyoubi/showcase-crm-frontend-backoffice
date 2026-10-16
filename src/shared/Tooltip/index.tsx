import { forwardRef, ReactElement, useImperativeHandle, useRef } from 'react';
import { TippyProps } from '@tippyjs/react';

import 'tippy.js/animations/scale-subtle.css';

import * as S from './styles';

export interface TooltipProps {
  displayOn?: 'mouseenter' | 'mouseenter focus' | 'click' | 'focusin' | 'manual';
  message: ReactElement | string | number;
  children: ReactElement | string | number;
  className?: string;
  placement?: TippyProps['placement'];
  hideOnClick?: TippyProps['hideOnClick'];
  visible?: boolean;
}

type TooltipRef = {
  show: () => void;
  hide: () => void;
} | null;

const appendTo = () => document.getElementsByTagName('body')?.[0];

export const Tooltip = forwardRef<TooltipRef, TooltipProps>(
  (
    {
      displayOn = 'mouseenter',
      message,
      children,
      visible,
      hideOnClick = true,
      placement = 'top',
      className,
    },
    ref,
  ) => {
    const instanceRef = useRef<TooltipRef>(null);

    useImperativeHandle(ref, () => ({
      show: () => instanceRef.current?.show?.(),
      hide: () => instanceRef.current?.hide?.(),
    }));

    return (
      <S.Tooltip
        className={className}
        appendTo={appendTo}
        content={message}
        animation="scale-subtle"
        arrow={false}
        placement={placement}
        trigger={displayOn}
        visible={visible}
        hideOnClick={hideOnClick}
        interactive
        onCreate={({ show, hide }) => {
          instanceRef.current = {
            show,
            hide,
          };
        }}
      >
        <S.Content>{children}</S.Content>
      </S.Tooltip>
    );
  },
);

export const useTooltipRef = () => useRef<TooltipRef>(null);
