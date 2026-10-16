import { memo, forwardRef } from 'react';

import { useId } from '@/hooks';

import { Label } from '../Label';
import { FeedbackMessage } from '../FeedbackMessage';

import * as S from './styles';
import * as t from './types';
import * as c from './constants';

export type InputPropsType = t.InputPropsType;

export const Input = memo(forwardRef<HTMLInputElement, t.InputPropsType>((props, ref) => {
  const {
    buttonContent,
    buttonProps,
    caption,
    className,
    color = 'primary',
    id,
    inputstyle = {},
    label,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    style = {},
    ...restProps
  } = props;

  const defaultId = useId();
  const selectedId = id || defaultId;

  return (
    <S.Root className={className} style={style} data-testid="input-root" {...restProps}>
      {(label) ? (
        <Label htmlFor={selectedId}>
          {label}
        </Label>
      ) : null}

      <S.Container className="container">
        <S.InputContainer
          className={c.CLASSNAMES.INPUT_CONTAINER}
          color={color}
          withButton={!!buttonContent}
          style={inputstyle}
          data-testid="input-container"
        >
          {LeftIcon && <LeftIcon className={c.CLASSNAMES.ICON_LEFT} color={color} size="m" />}

          <S.Input
            {...restProps}
            id={selectedId}
            className={c.CLASSNAMES.INPUT}
            data-testid="test-input"
            ref={ref}
          />
          {RightIcon && (
            <RightIcon className={c.CLASSNAMES.ICON_RIGHT} color={color} size="m" />
          )}
        </S.InputContainer>
        {buttonContent && (
          <S.Button type="button" color={color} {...buttonProps} ref={undefined}>
            {buttonContent}
          </S.Button>
        )}
      </S.Container>

      {caption && <FeedbackMessage color={color}>{caption}</FeedbackMessage>}
    </S.Root>
  );
}));

export const { CLASSNAMES } = c;

Input.displayName = 'Input';
