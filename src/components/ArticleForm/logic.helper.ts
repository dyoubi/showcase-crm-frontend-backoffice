import { UseFormReturn } from 'react-hook-form';

import { GetArticleResponse } from '@/domains/casino/article';
import { findVariants } from '@/domains/casino/content';

import { ArticleForm } from './types';

export const syncFormValuesWithArticle = (
  setValue: UseFormReturn<ArticleForm>['setValue'],
  article?: GetArticleResponse,
) => {
  const syncFormValues = (lang: 'fr' | 'en') => {
    const bodyVariant = findVariants(article?.body?.variants, { lang, default: false });
    const bodyVariantDefault = findVariants(article?.body?.variants, {
      lang,
      default: true,
    });

    const titleVariant = findVariants(article?.title?.variants, { lang, default: false });
    const titleVariantDefault = findVariants(article?.title?.variants, {
      lang,
      default: true,
    });

    setValue(`data.${lang}.body.id`, bodyVariant?.[0]?.id);
    setValue(`data.${lang}.body.content`, bodyVariant?.[0]?.data?.content);
    setValue(`data.${lang}.body.contentId`, article?.body?.id);
    setValue(`data.${lang}.body.defaultVariantId`, bodyVariantDefault?.[0]?.id);

    setValue(`data.${lang}.title.id`, titleVariant?.[0]?.id);
    setValue(`data.${lang}.title.contentText`, titleVariant?.[0]?.data?.contentText);
    setValue(`data.${lang}.title.contentId`, article?.title?.id);
    setValue(`data.${lang}.title.defaultVariantId`, titleVariantDefault?.[0]?.id);
  };

  setValue('name', article?.name);
  setValue('slug', article?.key);
  syncFormValues('fr');
  syncFormValues('en');
};
