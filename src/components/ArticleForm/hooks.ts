import { useFormContext, UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';

import { GetArticleResponse } from '@/domains/casino/article';
import { syncFormValuesWithArticle } from './logic.helper';
import * as t from './types';

export const useArticleForm = () => useFormContext<t.ArticleForm>();

// this hooks will sync the articleForm with the form
export const useSyncFormWithArticle = (
  articleForm: UseFormReturn<t.ArticleForm>,
  article?: GetArticleResponse,
) => {
  const { setValue } = articleForm;

  useEffect(() => {
    if (!article) {
      return;
    }

    syncFormValuesWithArticle(setValue, article);
  }, [article, setValue]);
};
