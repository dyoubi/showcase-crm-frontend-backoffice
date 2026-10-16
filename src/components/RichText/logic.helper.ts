import { Transforms, Editor, Element as SlateElement, CustomTypes } from 'slate';

import { TEXT_ALIGN_TYPES, LIST_TYPES } from './constants';
import * as t from './types';

export const isMarkActive = (editor: Editor, format: t.MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? !!marks?.[format] : false;
};

export const toggleBlock = (
  editor: Editor,
  format: SlateElement['type'] | CustomTypes['Align'],
) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as CustomTypes['Align']),
    };
  } else {
    const newType = isList ? 'list-item' : (format as CustomTypes['BlockFormat']);
    newProperties = {
      type: isActive ? 'paragraph' : newType,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format as CustomTypes['BlockFormat'], children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: Editor, format: t.MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: SlateElement['type'] | CustomTypes['Align'],
  blockType = 'type',
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      // @ts-ignore
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
    }),
  );

  return !!match;
};

export const isElement = (data: unknown): data is SlateElement => {
  return !!(data as SlateElement)?.children;
};

export const insertImage = (editor: Editor, url: string) => {
  if (!url) {
    return;
  }

  const text = { text: ' ' };

  const image: t.ImageElement = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};
