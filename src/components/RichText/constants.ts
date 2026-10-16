import { Descendant } from 'slate';

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

export const VoidValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const ICON_STYLES = {
  size: 18,
  strokeWidth: 2,
};
