import { memo, forwardRef } from 'react';

import { Flex } from '@/shared/Flex';

import { Label } from '../Label';
import { FeedbackMessage } from '../FeedbackMessage';

import * as S from './styles';
import * as c from './constants';
import * as t from './types';

export const InputWrapper = memo(
  forwardRef<HTMLDivElement, t.InputWrapperProps>(
    (
      {
        color = 'primary',
        buttonContent,
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
        className,
        caption,
        label,
        buttonProps,
        children,
        ...restProps
      },
      ref,
    ) => {
      return (
        <S.Root ref={ref} className={className} {...restProps}>
          {label && <Label>{label}</Label>}
          <S.Container>
            <S.InputContainer
              className={c.CLASSNAMES.INPUT_CONTAINER}
              color={color}
              withButton={!!buttonContent}
            >
              {LeftIcon && <LeftIcon className={c.CLASSNAMES.ICON_LEFT} color={color} size="m" />}
              <Flex flex={1}>{children}</Flex>
              {RightIcon && (
                <RightIcon className={c.CLASSNAMES.ICON_RIGHT} color={color} size="m" />
              )}
            </S.InputContainer>
            {buttonContent && (
              <S.Button type="button" color="primary" {...buttonProps} ref={undefined}>
                {buttonContent}
              </S.Button>
            )}
          </S.Container>
          {caption && <FeedbackMessage color={color}>{caption}</FeedbackMessage>}
        </S.Root>
      );
    },
  ),
);

export const { CLASSNAMES } = c;

InputWrapper.displayName = 'InputWrapper';

export * from './types';
