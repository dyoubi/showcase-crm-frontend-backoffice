import { getImageContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';

export const buildHeaderVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'image',
    default: getImageContent(
      'fr',
      'desktop',
      formValues.data?.fr?.medias?.desktop?.header?.contentURL,
    ),
    variants: [
      getImageContent('fr', 'desktop', formValues.data?.fr?.medias?.desktop?.header?.contentURL),
      getImageContent('fr', 'mobile', formValues.data?.fr?.medias?.mobile?.header?.contentURL),
      getImageContent('en', 'desktop', formValues.data?.en?.medias?.desktop?.header?.contentURL),
      getImageContent('en', 'mobile', formValues.data?.en?.medias?.mobile?.header?.contentURL),
    ],
  } as const);
