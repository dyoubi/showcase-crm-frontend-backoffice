import { ArticleForm } from '@/components/ArticleForm';
import { PostArticlePayload } from '@/domains/casino/article';

export const createArticleDTO = (values: ArticleForm, casinoId: string): PostArticlePayload => ({
  key: values?.slug,
  // name: values?.name,
  title: {
    contentType: 'text',
    default: {
      lang: 'fr',
      data: { contentText: values?.data?.fr?.title?.contentText },
    },
    variants: [
      {
        lang: 'fr',
        data: { contentText: values?.data?.fr?.title?.contentText },
      },
      {
        lang: 'en',
        data: { contentText: values?.data?.en?.title?.contentText },
      },
    ],
    casinoId,
  },
  body: {
    contentType: 'richtext',
    default: {
      lang: 'fr',
      data: { content: values?.data?.fr?.body?.content },
    },
    variants: [
      {
        lang: 'fr',
        data: { content: values?.data?.fr?.body?.content },
      },
      {
        lang: 'en',
        data: { content: values?.data?.en?.body?.content },
      },
    ],
    casinoId,
  },
});
