import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

export type BlockFormat =
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'list-item'
  | 'paragraph'
  | 'image'
  | 'button';

export type Align = 'left' | 'center' | 'right' | 'justify';

type CustomElement = {
  type: BlockFormat;
  url?: string;
  link?: string;
  align?: Align;
  children: ReadonlyArray<CustomText>;
};
type CustomText = {
  text: string;
  color?: string;
  bold?: true;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  tooltip?: string;
  link?: string;
};

declare module 'slate' {
  type AlignType = Align;
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
    Align: Align;
    BlockFormat: BlockFormat;
    MarkType: keyof Omit<CustomText, 'text'>;
  }
}
