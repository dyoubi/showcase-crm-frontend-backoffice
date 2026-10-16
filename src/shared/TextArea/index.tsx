import { memo, forwardRef } from 'react';

import { useId } from '@/hooks';

import { Label } from '../Label';
import { FeedbackMessage } from '../FeedbackMessage';

import * as S from './styles';
import * as t from './types';

export const TextArea = memo(forwardRef<HTMLTextAreaElement, t.TextAreaPropsType>((props, ref) => {
  const {
    'data-testid': dataTestId,
    caption,
    className,
    color = 'primary',
    id,
    label,
    multiple,
    name,
    ...restProps
  } = props;

  const defaultId = useId();
  const selectedId = id || defaultId;

  return (
    <div>
      {(label) ? (
        <Label htmlFor={selectedId}>
          {label}
        </Label>
      ) : null}

      <S.TextArea
        id={selectedId}
        className={className}
        color={color}
        data-testid={dataTestId || name}
        multiple={multiple}
        name={name}
        ref={ref}
        {...restProps}
      />
      {caption && <FeedbackMessage color={color}>{caption}</FeedbackMessage>}
    </div>
  );
}));

TextArea.displayName = 'TextArea';
