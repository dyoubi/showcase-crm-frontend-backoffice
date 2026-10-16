import { ArticleForm } from '@/components/ArticleForm';

import { usePatchArticle, GetArticleResponse } from '@/domains/casino/article';

import { useHandleError, useToaster } from '../../../hooks';

import { updateArticleDTO } from './DTOs';
import { useFooterSettingsContext } from '../hooks';

interface UseOnFormSubmitParams {
  article?: GetArticleResponse;
}

export const useOnFormSubmit = ({ article }: UseOnFormSubmitParams) => {
  // hooks
  const { mutateAsync: patchArticle } = usePatchArticle();
  const handleError = useHandleError();
  const toaster = useToaster();
  const { tabTitle, toggleLoading } = useFooterSettingsContext();

  // constants
  const articleId = article?.id;
  const save = async (values: ArticleForm) => {
    try {
      toggleLoading();
      if (!articleId) {
        return;
      }
      await patchArticle({ id: articleId, ...updateArticleDTO(values) });
      toaster({ content: `${tabTitle} edited` });
    } catch (e) {
      handleError(e);
    } finally {
      toggleLoading();
    }
  };

  return { save };
};
