import { getImageContent } from '@/domains/casino/content';
import { PromotionForm } from '../../types';


export const buildThumbnailContentVariants = (formValues: PromotionForm, casinoId: string) =>
  ({
    casinoId,
    contentType: 'image',
    default: getImageContent(
      'fr',
      'desktop',
      formValues.data?.fr?.medias?.desktop?.thumbnail?.contentURL,
    ),
    variants: [
      getImageContent('fr', 'desktop', formValues.data?.fr?.medias?.desktop?.thumbnail?.contentURL),
      getImageContent('fr', 'mobile', formValues.data?.fr?.medias?.mobile?.thumbnail?.contentURL),
      getImageContent('en', 'desktop', formValues.data?.en?.medias?.desktop?.thumbnail?.contentURL),
      getImageContent('en', 'mobile', formValues.data?.en?.medias?.mobile?.thumbnail?.contentURL),
    ],
  } as const);
