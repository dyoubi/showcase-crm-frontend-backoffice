import { memo } from 'react';
import { useSlate } from 'slate-react';

import { IconBold, IconCode, IconColorSwatch, IconInfoCircle, IconItalic, IconLink, IconUnderline, IconFC } from '@/shared/Icons';

import { isMarkActive, toggleMark } from '../../logic.helper';
import { MarkFormat } from '../../types';
import { ToolButton } from '../ToolButton';
import { ICON_STYLES } from '../../constants';

interface MarkButtonProps {
  format: MarkFormat;
  onMouseDown?: () => void;
}

const AVAILABLE_MARK_ICONS: Record<MarkFormat, IconFC> = {
  bold:      IconBold,
  italic:    IconItalic,
  underline: IconUnderline,
  code:      IconCode,
  tooltip:   IconInfoCircle,
  link:      IconLink,
  color:     IconColorSwatch,
};

export const MarkButton = memo(({ format, onMouseDown }: MarkButtonProps) => {
  const editor = useSlate();

  const AvailableIcon = AVAILABLE_MARK_ICONS[format];

  const SelectedIcon = (AvailableIcon) ? <AvailableIcon {...ICON_STYLES} /> : format;

  return (
    <ToolButton
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        return onMouseDown && onMouseDown();
      }}
    >
      {SelectedIcon}
    </ToolButton>
  );
});

export const ToggleMarkButton = (props: MarkButtonProps) => {
  const editor = useSlate();

  return <MarkButton {...props} onMouseDown={() => toggleMark(editor, props.format)} />;
};
