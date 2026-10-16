import { RenderLeafProps } from 'slate-react';

import { MarkTooltip } from './MarkTooltip';
import { LinkTooltip } from './LinkTooltip';

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let child = children;
  const style = { color: leaf?.color } as const;

  if (leaf.bold) {
    child = <strong>{child}</strong>;
  }

  if (leaf.code) {
    child = <code>{child}</code>;
  }

  if (leaf.italic) {
    child = <em>{child}</em>;
  }

  if (leaf.underline) {
    child = <u>{child}</u>;
  }

  if (typeof leaf?.tooltip === 'string') {
    child = <MarkTooltip leaf={leaf}>{child}</MarkTooltip>;
  }

  if (typeof leaf?.link === 'string') {
    child = <LinkTooltip leaf={leaf}>{child}</LinkTooltip>;
  }

  return (
    <span {...attributes} style={style}>
      {child}
    </span>
  );
};
