import { getTextContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';


export const buildTitleContentVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'text',
    default: getTextContent('fr', formValues.data?.fr?.title?.contentText),
    variants: [
      getTextContent('fr', formValues.data?.fr?.title?.contentText),
      getTextContent('en', formValues.data?.en?.title?.contentText),
    ],
  } as const);
