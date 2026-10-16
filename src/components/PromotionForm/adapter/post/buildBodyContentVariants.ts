import { getRichTextContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';

export const buildBodyContentVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'richtext',
    default: getRichTextContent('fr', formValues.data?.fr?.body?.content),
    variants: [
      getRichTextContent('fr', formValues.data?.fr?.body?.content),
      getRichTextContent('en', formValues.data?.en?.body?.content),
    ],
  } as const);
