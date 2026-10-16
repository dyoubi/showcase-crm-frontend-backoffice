import { ArticleForm } from '@/components/ArticleForm';
import { PatchArticlePayload } from '@/domains/casino/article';

export const updateArticleDTO = ({ slug, data }: ArticleForm): PatchArticlePayload => ({
  key: slug,
  title: {
    id: data?.fr?.title?.contentId || '',
    default: {
      id: data?.fr?.title?.defaultVariantId,
      lang: 'fr',
      data: { contentText: data?.fr?.title?.contentText },
    },
    variants: [
      {
        id: data?.fr?.title?.id,
        lang: 'fr',
        data: { contentText: data?.fr?.title?.contentText },
      },
      {
        id: data?.en?.title?.id,
        lang: 'en',
        data: { contentText: data?.en?.title?.contentText },
      },
    ],
  },
  body: {
    id: data?.fr?.body?.contentId || '',
    default: {
      id: data?.fr?.body?.defaultVariantId,
      lang: 'fr',
      data: { content: data?.fr?.body?.content },
    },
    variants: [
      {
        id: data?.fr?.body?.id,
        lang: 'fr',
        data: { content: data?.fr?.body?.content },
      },
      {
        id: data?.en?.body?.id,
        lang: 'en',
        data: { content: data?.en?.body?.content },
      },
    ],
  },
});
