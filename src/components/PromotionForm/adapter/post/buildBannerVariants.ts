import { getImageContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';

export const buildBannerVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'image',
    default: getImageContent(
      'fr',
      'desktop',
      formValues.data?.fr?.medias?.desktop?.banner?.contentURL,
    ),
    variants: [
      getImageContent('fr', 'desktop', formValues.data?.fr?.medias?.desktop?.banner?.contentURL),
      getImageContent('fr', 'mobile', formValues.data?.fr?.medias?.mobile?.banner?.contentURL),
      getImageContent('en', 'desktop', formValues.data?.en?.medias?.desktop?.banner?.contentURL),
      getImageContent('en', 'mobile', formValues.data?.en?.medias?.mobile?.banner?.contentURL),
    ],
  } as const);
