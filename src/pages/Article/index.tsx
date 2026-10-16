import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/components/Page';
import { ArticleForm } from '@/components/ArticleForm';
import { SelectLang, useLangState } from '@/components/SelectLang';

import { useGetArticle, usePatchArticle } from '@/domains/casino/article';
import { routes } from '@/libs/router/constants';

import { Card } from '@/shared/Card';
import { EditableTitle } from '@/shared/EditableTitle';
import { Flex } from '@/shared/Flex';
import { IconEdit } from '@/shared/Icons';

import { useQueryParams } from '../../hooks';
import { useOnFormSubmit } from './hooks';

export const Article = memo(() => {
  // hooks
  const params = useParams();
  const query = useQueryParams();
  const { articleId = 'new' } = params;
  const isNewArticle = articleId === 'new';
  const { data: article, refetch } = useGetArticle(articleId || '', {
    enabled: !isNewArticle,
  });
  const patchRequest = usePatchArticle();
  const stateLang = useLangState('fr');

  const onTitleSave = async (name: string) => {
    await patchRequest.mutateAsync({ id: articleId, name });
    await refetch();
  };

  const { save, isLoading } = useOnFormSubmit({ article, isNewArticle });

  return (
    <Page
      breadcrumbs={[
        { content: 'Articles', link: routes.ARTICLES },
        { content: article?.name || 'Untitled', link: routes.PROMOTIONS },
      ]}
      headTitle={`Article > ${article?.name || ''}`}
    >
      <Flex flexDirection="column" gap={16}>
        {(!isNewArticle) ? (
          <EditableTitle
            onSave={onTitleSave}
            value={article?.name}
          />
        ) : null}

        <Card
          icon={IconEdit}
          loadingOverlay={isLoading}
          title="Editor"
          topContent={<SelectLang {...stateLang} />}
        >
          <ArticleForm
            article={article}
            defaultValues={{ slug: query.get('slug') || undefined }}
            displayNameInput={isNewArticle}
            key={article?.id}
            lang={stateLang.lang}
            onSubmit={save}
          />
        </Card>
      </Flex>
    </Page>
  );
});
