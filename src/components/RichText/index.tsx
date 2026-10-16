import React, { memo, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, withReact, Slate } from 'slate-react';

import { Toolbar } from './Toolbar';
import { Leaf } from './Leaf';
import { Element } from './Element';
import { RichTextContext } from './context';

import { withImages } from './hocs';
import { editorStyles } from './styles';
import * as c from './constants';
import * as t from './types';
import { VoidValue } from './constants';

interface RichTextProps {
  value: Descendant[];
  onChange: (newValue: Descendant[]) => void;
  autoFocus?: boolean;
}
export const RichText = memo(({ value, onChange, autoFocus = false }: RichTextProps) => {
  const editor = useMemo(() => withImages(withReact(createEditor())), []);
  const editorValue = !value?.length ? VoidValue : value; // editor don't accept value = [] it create an error

  const contextValue = useMemo(
    () => ({
      value: editorValue,
      setValue: onChange,
    }),
    [editorValue, onChange],
  );

  /**
   * For have a full controlled slate component,
   * we need to assign editor.children
   * cf https://github.com/ianstormtaylor/slate/issues/4710 & https://github.com/ianstormtaylor/slate/issues/4689
   * */
  editor.children = editorValue;

  return (
    <RichTextContext.Provider value={contextValue}>
      <Slate editor={editor} value={editorValue} onChange={onChange}>
        <div style={{ borderRadius: 4, overflow: 'hidden' }}>
          <Toolbar />

          <Editable
            className={editorStyles}
            renderElement={Element}
            renderLeaf={Leaf}
            placeholder="Enter some text…"
            spellCheck
            autoFocus={autoFocus}
          />
        </div>
      </Slate>
    </RichTextContext.Provider>
  );
});

export const useRichTextState = (defaultValue: t.RichTextState) => {
  const [value, setValue] = useState<t.RichTextState>(defaultValue || c.VoidValue);

  return [value, setValue];
};

export * from './constants';
