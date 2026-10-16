import { Tag } from '@/domains/casino/tag';

export interface TagForm {
  slug?: string;
  name?: string;
  color?: string;
  type?: Tag['type'];
}
