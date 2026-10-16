import { RichTextState } from '../RichText/types';

export interface ArticleForm {
  slug?: string;
  name?: string;
  data?: {
    fr?: DataType;
    en?: DataType;
  };
}

interface DataType {
  title?: {
    id?: string;
    contentText?: string;
    contentId?: string;
    defaultVariantId?: string;
  };
  body?: {
    id?: string;
    content?: RichTextState;
    contentId?: string;
    defaultVariantId?: string;
  };
}

export type Lang = 'fr' | 'en';
