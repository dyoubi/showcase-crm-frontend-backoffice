import React, { useCallback } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import styled from '@emotion/styled';
import { Colors, useTheme } from '@emotion/react';

import { IconDanger, IconCircleCheck, IconInfoCircle } from '@/shared/Icons';

export interface UseToasterParams {
  color?: Colors;
  content: React.ReactNode;
  durationMs?: ToastOptions['autoClose'];
  style?: React.CSSProperties;
  displayIcon?: boolean;
  dataTestId?: string;
}

const TOASTER_ICON_CLASS_NAME = 'toaster-icon';

const Icons = {
  primary: IconInfoCircle,
  secondary: IconInfoCircle,
  tertiary: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconInfoCircle,
  danger: IconDanger,
  border: IconInfoCircle,
} as const;

const ToasterBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  .${TOASTER_ICON_CLASS_NAME} {
    flex-shrink: 0;
  }
`;

const ToasterContent = styled.div<{ addMargin: boolean }>(({ theme, addMargin }) => ({
  marginLeft: addMargin ? theme.spaces.margin.xxs : undefined,
}));

/**
 * This hook is used for trigger toast on your app
 * /!\/!\ WARNING you must inject the component src/components/ToasterContainer
 * in your app root for use this hook /!\/!\
 */
export const useToaster = () => {
  const { colors } = useTheme();

  return useCallback(
    ({
      color = 'success',
      content,
      durationMs,
      style,
      displayIcon = true,
      dataTestId,
    }: UseToasterParams) => {
      const toastOption = {
        autoClose: durationMs,
        style: {
          backgroundColor: colors[color].main,
          color: colors[color].contrastText,
          ...style,
        },
      };

      const Icon = Icons[color];

      const body = (
        <ToasterBody data-testid={dataTestId || null} data-color={color}>
          {displayIcon && <Icon className={TOASTER_ICON_CLASS_NAME} size="xl" />}
          <ToasterContent addMargin={displayIcon}>{content}</ToasterContent>
        </ToasterBody>
      );

      toast(body, toastOption);
    },
    [colors],
  );
};
