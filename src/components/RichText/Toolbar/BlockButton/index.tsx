import { memo } from 'react';
import { useSlate } from 'slate-react';
import { CustomTypes, Element } from 'slate';

import * as Icons from '@/shared/Icons';

import { isBlockActive, toggleBlock } from '../../logic.helper';
import { ICON_STYLES, TEXT_ALIGN_TYPES } from '../../constants';

import { ToolButton } from '../ToolButton';

interface BlockButtonProps {
  format: Element['type'] | CustomTypes['Align'];
  onMouseDown?: () => void;
}

const AVAILABLE_BLOCK_ICONS: Record<Element['type'] | CustomTypes['Align'], Icons.IconFC>  = {
  'block-quote':   Icons.IconBlockquote,
  'bulleted-list': Icons.IconListBullet,
  'button':        Icons.IconClick,
  'center':        Icons.IconAlignCenter,
  'heading-one':   Icons.IconHeading1,
  'heading-two':   Icons.IconHeading2,
  'heading-three': Icons.IconHeading3,
  'heading-four':  Icons.IconHeading4,
  'heading-five':  Icons.IconHeading5,
  'heading-six':   Icons.IconHeading6,
  'image':         Icons.IconImage,
  'justify':       Icons.IconAlignJustify,
  'left':          Icons.IconAlignLeft,
  'list-item':     Icons.IconListBullet,
  'numbered-list': Icons.IconListNumbered,
  'paragraph':     Icons.IconBlockquote,
  'right':         Icons.IconAlignRight,
};

export const BlockButton = memo(({ format, onMouseDown }: BlockButtonProps) => {
  const editor = useSlate();

  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );

  const AvailableIcon = AVAILABLE_BLOCK_ICONS[format];

  const SelectedIcon = (AvailableIcon) ? <AvailableIcon {...ICON_STYLES} /> : format;

  return (
    <ToolButton
      isActive={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        return onMouseDown && onMouseDown();
      }}
    >
      {SelectedIcon}
    </ToolButton>
  );
});

export const ToggleBlockButton = (props: BlockButtonProps) => {
  const editor = useSlate();
  return <BlockButton {...props} onMouseDown={() => toggleBlock(editor, props.format)} />;
};
