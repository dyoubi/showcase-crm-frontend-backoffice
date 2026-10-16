import { RichTextState } from '@/components/RichText/types';

export interface CategoryForm {
  isActive?: boolean;
  name?: string;
  slug?: string;
  description?: RichTextState;
}
