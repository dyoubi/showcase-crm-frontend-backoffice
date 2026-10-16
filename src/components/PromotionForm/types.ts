import { RichTextState } from '../RichText/types';

export interface PromotionForm {
  name?: string;
  slug?: string;
  startDate?: string;
  endDate?: string;
  data?: {
    fr?: DataType;
    en?: DataType;
  };
}

interface DataType {
  title?: { id?: string; contentText?: string; contentId?: string; defaultVariantId?: string };
  body?: { id?: string; content?: RichTextState; contentId?: string; defaultVariantId?: string };
  termsAndConditions?: {
    id?: string;
    content?: RichTextState;
    contentId?: string;
    defaultVariantId?: string;
  };
  medias?: {
    mobile: PromotionImages;
    desktop: PromotionImages;
  };
}

interface PromotionImages {
  banner?: PromotionImage;
  thumbnail?: PromotionImage;
  header?: PromotionImage;
}

interface PromotionImage {
  id?: string;
  contentURL?: string;
  contentId?: string;
  defaultVariantId?: string;
}

export type Lang = 'fr' | 'en';
