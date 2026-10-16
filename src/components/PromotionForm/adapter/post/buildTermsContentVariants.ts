import { getRichTextContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';

export const buildTermsContentVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'richtext',
    default: getRichTextContent('fr', formValues.data?.fr?.termsAndConditions?.content),
    variants: [
      getRichTextContent('fr', formValues.data?.fr?.termsAndConditions?.content),
      getRichTextContent('en', formValues.data?.en?.termsAndConditions?.content),
    ],
  } as const);
