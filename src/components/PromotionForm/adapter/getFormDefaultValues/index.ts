import { GetPromotionResponse } from '@/domains/casino/promotion';
import {
  ContentRequestDTO,
  ContentDeviceType,
  ContentLangType,
  findVariants,
} from '@/domains/casino/content';
import * as t from '../../types';

const splitDefaultFromVariants = (variants: ContentRequestDTO['variants'] = []) => {
  const [defaultVariant] = findVariants(variants, { default: true });
  const variantsWithoutDefault = variants.filter((variant) => !variant.default);

  return {
    defaultVariantId: defaultVariant?.id,
    variantsWithoutDefault,
  };
};

const getMediaVariantContentUrl = (
  lang: ContentLangType,
  device: ContentDeviceType,
  content?: ContentRequestDTO,
) => {
  const { defaultVariantId, variantsWithoutDefault } = splitDefaultFromVariants(content?.variants);
  const [variant] = findVariants(variantsWithoutDefault, { lang, device });

  return {
    id: variant?.id,
    contentId: content?.id,
    defaultVariantId,
    contentURL: variant?.data?.contentURL,
  };
};

const getTitleVariant = (lang: ContentLangType, content?: ContentRequestDTO) => {
  const { defaultVariantId, variantsWithoutDefault } = splitDefaultFromVariants(content?.variants);
  const [variant] = findVariants(variantsWithoutDefault, { lang });

  return {
    id: variant?.id,
    contentId: content?.id,
    defaultVariantId,
    contentText: variant?.data?.contentText,
  };
};

const getRichTextVariant = (lang: ContentLangType, content?: ContentRequestDTO) => {
  const { defaultVariantId, variantsWithoutDefault } = splitDefaultFromVariants(content?.variants);
  const [variant] = findVariants(variantsWithoutDefault, { lang });

  return {
    id: variant?.id,
    contentId: content?.id,
    defaultVariantId,
    content: variant?.data?.content,
  };
};

const getFormData = (lang: ContentLangType, promotion?: GetPromotionResponse) => ({
  title: getTitleVariant(lang, promotion?.title),
  body: getRichTextVariant(lang, promotion?.body),
  termsAndConditions: getRichTextVariant(lang, promotion?.terms),
  medias: {
    desktop: {
      banner: getMediaVariantContentUrl(lang, 'desktop', promotion?.banner),
      header: getMediaVariantContentUrl(lang, 'desktop', promotion?.header),
      thumbnail: getMediaVariantContentUrl(lang, 'desktop', promotion?.thumbnail),
    },
    mobile: {
      banner: getMediaVariantContentUrl(lang, 'mobile', promotion?.banner),
      header: getMediaVariantContentUrl(lang, 'mobile', promotion?.header),
      thumbnail: getMediaVariantContentUrl(lang, 'mobile', promotion?.thumbnail),
    },
  },
});

export const getFormDefaultValues = (promotion?: GetPromotionResponse): t.PromotionForm =>
  ({
    slug: promotion?.key,
    startDate: promotion?.startDate,
    endDate: promotion?.endDate,
    data: {
      fr: getFormData('fr', promotion),
      en: getFormData('en', promotion),
    },
  } as const);
