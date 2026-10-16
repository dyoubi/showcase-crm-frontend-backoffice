import { useState } from 'react';
import { Element as SlateElement, Transforms } from 'slate';
import { ReactEditor, useSlate, RenderElementProps } from 'slate-react';

import { ellipsisMiddle } from '@/utils';
import { Tooltip, useTooltipRef } from '@/shared/Tooltip';
import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';
import { IconEdit } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { useToggle } from '../../../../hooks';

export const ButtonElement = ({ element, attributes, children }: RenderElementProps) => {
  // hooks
  const editor = useSlate();
  const [value, setValue] = useState(element?.link);
  const [displayInput, toggleDisplayInput] = useToggle(!value);
  const tooltipRef = useTooltipRef();

  // constants
  const path = ReactEditor.findPath(editor, element);

  const tooltipContent = displayInput ? (
    <Flex flexDirection="row">
      <Input
        autoFocus
        label="Link to open on click :"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        buttonContent="Save"
        buttonProps={{
          onClick: () => {
            Transforms.setNodes<SlateElement>(editor, { ...element, link: value }, { at: path });
            toggleDisplayInput();
          },
        }}
      />
      <Spacer size="xxs" />
      <Flex flexDirection="column" justifyContent="flex-end">
        <Button type="button" color="danger" onClick={toggleDisplayInput}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  ) : (
    <Flex flexDirection="row" alignItems="center">
      <span>{ellipsisMiddle(element?.link)}</span>
      <Spacer size="xs" />
      <IconEdit color="white" size="m" onClick={toggleDisplayInput} />
    </Flex>
  );

  return (
    <Flex justifyContent={(element.align !== 'justify' && element.align) || undefined}>
      <Tooltip
        ref={tooltipRef}
        message={tooltipContent}
        displayOn="mouseenter"
        placement="top"
        hideOnClick
      >
        <Button {...attributes}>{children}</Button>
      </Tooltip>
    </Flex>
  );
};
