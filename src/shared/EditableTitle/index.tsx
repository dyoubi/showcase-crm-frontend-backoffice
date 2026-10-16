import { FormEvent, memo, useRef } from 'react';

import { useToggle } from '../../hooks';
import { Button } from '../Button';

import { Flex } from '../Flex';
import { IconPencil } from '../Icons/IconPencil';

import * as S from './styles';
import * as c from './constants';

export interface EditableTitleProps<C> {
  value?: string;
  onSave: (newValue: string) => Promise<C>;
  className?: string;
}

export const EditableTitle = memo(<C,>({ value, onSave, className }: EditableTitleProps<C>) => {
  // hooks
  const [isEditMode, toggleEditMode] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const onCancelClick = () => toggleEditMode();
  const inputRef = useRef<HTMLInputElement>(null);

  // constants
  const onSaveClick = () => {
    toggleIsLoading();
    const inputValue = inputRef.current?.value;
    if (!inputValue) {
      return;
    }
    onSave(inputValue).finally(() => {
      // when the promise is finished whenever is succeded or not
      // we toggle isLoading & EditMode state
      toggleIsLoading();
      toggleEditMode();
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveClick();
  };

  return (
    <S.Container flexDirection="column" isEditMode={isEditMode} className={className}>
      <Flex flexDirection="row" style={{ height: 71 }} alignItems="center" gap={14}>
        {isEditMode ? (
          <form onSubmit={onSubmit}>
            <S.EditableInput
              key={value}
              ref={inputRef}
              readOnly={isLoading}
              defaultValue={value}
              buttonContent={isEditMode ? 'Save' : undefined}
              buttonProps={{
                onClick: onSaveClick,
                disabled: isEditMode && isLoading,
              }}
            />
          </form>
        ) : (
          <S.ValueText>{value || 'Untitled'}</S.ValueText>
        )}

        {!isEditMode ? (
          <Flex flexDirection="row" alignItems="center" gap={8}>
            <IconPencil className={c.CLASSNAMES.EDIT_ICON} onClick={toggleEditMode} size="l" strokeWidth={2} />

            <span className={c.CLASSNAMES.EDIT_TEXT} onClick={toggleEditMode}>
              Edit
            </span>
          </Flex>
        ) : (
          <Button color="danger" onClick={onCancelClick} disabled={isLoading}>
            Cancel
          </Button>
        )}
      </Flex>
    </S.Container>
  );
});

EditableTitle.displayName = 'EditableTitle';
