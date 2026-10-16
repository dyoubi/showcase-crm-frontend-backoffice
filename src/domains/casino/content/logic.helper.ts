import isNil from 'lodash/isNil';

import {
  ContentRequestDTO,
  ContentRichText,
  ContentLangType,
  ContentDeviceType,
  ContentVariationType,
} from './types';

export const getLang = (lang: ContentLangType) =>
  ((
    {
      fr: {
        lang: 'fr',
        langType: 'fr-FR',
      },
      en: {
        lang: 'en',
        langType: 'en-EN',
      },
    } as const
  )[lang]);

export const getRichTextContent = (
  lang: ContentLangType,
  content?: ContentRichText['content'],
) => ({
  ...getLang(lang),
  data: { content: content || [] },
});

export const getTextContent = (lang: 'fr' | 'en', value = '') => ({
  ...getLang(lang),
  data: {
    contentText: value,
  },
});

export const getImageContent = (
  lang: 'fr' | 'en',
  device: 'mobile' | 'desktop',
  contentUrl = '',
) => ({
  ...getLang(lang),
  devices: [device],
  data: {
    contentURL: contentUrl,
  },
});

export const findVariantFromLang = (
  variants: ReadonlyArray<ContentVariationType>,
  lang: ContentLangType,
): ReadonlyArray<ContentVariationType> =>
  (variants || []).filter((variant) => variant?.lang === lang);

export const findVariantFromDevice = (
  variants: ReadonlyArray<ContentVariationType>,
  device: ContentDeviceType,
): ReadonlyArray<ContentVariationType> =>
  (variants || []).filter((variant) => !!variant?.devices?.includes(device));

export const findDefaultVariant = (
  variants: ReadonlyArray<ContentVariationType>,
  isDefaultVariant: boolean,
): ReadonlyArray<ContentVariationType> =>
  (variants || []).filter((variant) => !!variant?.default === isDefaultVariant);

export const findVariants = (
  variants: ContentRequestDTO['variants'] = [],
  params: {
    lang?: ContentLangType;
    device?: ContentDeviceType;
    default?: boolean;
  } = {},
) => {
  const { lang, device, default: isDefaultVariant } = params;
  let currentVariants = variants;

  if (lang) {
    currentVariants = findVariantFromLang(currentVariants, lang);
  }

  if (device) {
    currentVariants = findVariantFromDevice(currentVariants, device);
  }
  if (!isNil(isDefaultVariant)) {
    currentVariants = findDefaultVariant(currentVariants, isDefaultVariant);
  }

  return currentVariants;
};
