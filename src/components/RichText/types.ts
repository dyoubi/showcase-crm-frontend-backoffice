import { CustomTypes, Element } from 'slate';

export type MarkFormat = CustomTypes['MarkType'];

export type ImageElement = {
  type: 'image';
  url: string;
  children: ReadonlyArray<EmptyText>;
};

export type EmptyText = {
  text: string;
};

export type RichTextState = ReadonlyArray<Element>;
