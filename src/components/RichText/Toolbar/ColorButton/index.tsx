import { memo, useRef } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { useTheme } from '@emotion/react';

import { Flex } from '@/shared/Flex';
import { IconPalette } from '@/shared/Icons/IconPalette';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { ToolButton } from '../ToolButton';

export const ColorButton = memo(() => {
  const inputElement = useRef<HTMLInputElement>(null);
  const editor = useSlate();
  const theme = useTheme();

  const color = Editor.marks(editor)?.color;

  return (
    <ToolButton type="button" onClick={() => inputElement?.current?.click?.()}>
      <Flex alignItems="center" justifyContent="center">
        <IconPalette size="m" color={color || 'currentColor'} />
      </Flex>
      <VisuallyHidden>
        <input
          ref={inputElement}
          type="color"
          value={color || theme.typography.colors.primary}
          onChange={({ target }) => editor.addMark('color', target.value)}
        />
      </VisuallyHidden>
    </ToolButton>
  );
});
