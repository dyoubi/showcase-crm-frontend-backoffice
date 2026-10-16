/** ENTITIES */

interface ContentImage {
  contentURL?: string;
  size?: number;
  mimetype?: string;
}

interface ContentText {
  contentText?: string;
}

export type BlockType =
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
export type ContentLangType = 'fr' | 'en';
export type ContentDeviceType = 'desktop' | 'mobile';

interface BlockElement {
  type: BlockType;
  url?: string;
  link?: string;
  align?: Align;
  children: ReadonlyArray<TextElement>;
}

interface TextElement {
  text: string;
  bold?: true;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  tooltip?: string;
  link?: string;
  color?: string;
}

export interface ContentRichText {
  content?: ReadonlyArray<BlockElement>;
}

export type ContentData = ContentImage & ContentText & ContentRichText;

export interface ContentVariationType {
  id?: string;
  lang?: ContentLangType;
  langType?: 'fr-FR' | 'en-EN';
  default?: boolean;
  devices?: ReadonlyArray<ContentDeviceType>;
  data: ContentData;
}

export interface ContentRequestDTO {
  id: string;
  key: string;
  casinoId: string;
  contentType: 'image' | 'text' | 'richtext';
  default: ContentVariationType;
  variants: ReadonlyArray<ContentVariationType>;
}

export interface PatchContentPayload {
  key?: string;
  contentType?: 'image' | 'text' | 'richtext';
  default?: ContentVariationType;
  variants?: ReadonlyArray<ContentVariationType>;
}

/** END ENTITIES */

/** REQUESTS */
export type PostContentPayload = Omit<ContentRequestDTO, 'id' | 'key'>;
export type GetContentResponse = ContentRequestDTO;
/** END REQUESTS */
