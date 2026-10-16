import { useNavigate } from 'react-router-dom';

import { ArticleForm } from '@/components/ArticleForm';

import { usePostArticle, usePatchArticle, GetArticleResponse } from '@/domains/casino/article';
import { useCurrentCasino } from '@/domains/casino/hooks';

import { replaceUrlParameters } from '@/utils';
import { routes } from '@/libs/router/constants';
import { useHandleError, useToaster } from '../../hooks';

import { createArticleDTO, updateArticleDTO } from './DTOs';

interface UseOnFormSubmitParams {
  article?: GetArticleResponse;
  isNewArticle: boolean;
}

export const useOnFormSubmit = ({ article, isNewArticle }: UseOnFormSubmitParams) => {
  // hooks
  const { id: casinoId } = useCurrentCasino();
  const { mutateAsync: postArticle, isLoading: isLoadingPost } = usePostArticle();
  const { mutateAsync: patchArticle, isLoading: isLoadingPatch } = usePatchArticle();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const toaster = useToaster();

  // constants
  const articleId = article?.id;
  const save = async (values: ArticleForm) => {
    try {
      if (isNewArticle || !articleId) {
        const { id } = await postArticle(createArticleDTO(values, casinoId));
        await patchArticle({ id, name: values.name });
        toaster({ content: 'Article created' });
        navigate(replaceUrlParameters(routes.ARTICLE, { articleId: id }));
        return;
      }

      await patchArticle({ id: articleId, ...updateArticleDTO(values) });
      toaster({ content: 'Article edited' });
    } catch (e) {
      handleError(e);
    }
  };
  return { save, isLoading: isLoadingPost || isLoadingPatch };
};
