import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { produce } from 'immer';
import { useContext } from 'react';

import { CustomText } from '@/libs/slate';

import { isElement, isMarkActive, insertImage } from './logic.helper';
import * as t from './types';
import { RichTextContext } from './context';

export const useSetMarkTooltipMark = () => {
  const editor = useSlate();
  const mark: t.MarkFormat = 'tooltip';

  return (tooltipValue?: string) => {
    const isActive = isMarkActive(editor, mark);

    if (!tooltipValue) {
      return;
    }

    if (isActive) {
      Editor.removeMark(editor, mark);
    } else {
      Editor.addMark(editor, mark, tooltipValue);
    }
  };
};
export const useSetLinkMark = () => {
  const editor = useSlate();
  const mark: t.MarkFormat = 'link';

  return (url?: string) => {
    const isActive = isMarkActive(editor, mark);

    if (!url) {
      return;
    }

    if (isActive) {
      Editor.removeMark(editor, mark);
    } else {
      Editor.addMark(editor, mark, url);
    }
  };
};

export const useRichTextContext = () => {
  const context = useContext(RichTextContext);
  if (!context) {
    throw new Error('useAppTheme must be within AppThemeContext.Provider');
  }

  return context;
};

export const useEditNode = () => {
  const editor = useSlate();
  const { setValue } = useRichTextContext();

  return (path: number[], nodeValue: CustomText) => {
    if (!path) {
      return;
    }

    setValue(
      produce(editor.children, (draft) => {
        const a = draft[path[0]];

        if (!isElement(a) || !a?.children[path[1]]) {
          return;
        }
        a.children[path[1]] = nodeValue;
      }),
    );
  };
};

export const useEditFocusedNode = () => {
  const editor = useSlate();
  const editNode = useEditNode();

  return (newLeaf: CustomText) => {
    const path = editor.selection?.focus?.path || [];
    if (path.length !== 2) {
      return;
    }
    editNode(path, newLeaf);
  };
};

export const useEditorMethods = () => {
  const editor = useSlate();
  return {
    isMarkActive: (mark: t.MarkFormat) => isMarkActive(editor, mark),
    removeMark: (mark: t.MarkFormat) => Editor.removeMark(editor, mark),
    insertImage: (url: string) => insertImage(editor, url),
  };
};
