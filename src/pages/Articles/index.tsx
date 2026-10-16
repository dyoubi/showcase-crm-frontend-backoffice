import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useGetArticles, useDeleteArticle, isBuiltInArticle } from '@/domains/casino/article';
import { replaceUrlParameters } from '@/utils';
import { Card } from '@/shared/Card';
import { Table } from '@/shared/Table';
import { Button } from '@/shared/Button';
import { IconEdit, IconTrash } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { routes } from '@/libs/router/constants';

import { Tooltip } from '@/shared/Tooltip';
import { useConfirmDeleteItem } from '../../hooks';

export const Articles = memo(() => {
  // hooks
  const { data: articles, refetch } = useGetArticles();
  const navigate = useNavigate();
  const { mutateAsync: deleteArticle } = useDeleteArticle();
  const confirmDeleteItem = useConfirmDeleteItem();

  return (
    <Page breadcrumbs={[{ content: 'Articles' }]} headTitle="Articles list">
      <Card
        title="Articles list"
        topContent={
          <Button color="primary" onClick={() => navigate(routes.CREATE_ARTICLE)}>
            Create new article
          </Button>
        }
      >
        <Table>
          <thead>
            <tr>
              <th>Names</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((item) => {
              const isBuiltIn = isBuiltInArticle(item.key);
              const removeBtn = (
                <Button
                  disabled={isBuiltIn}
                  color="danger"
                  onClick={() =>
                    confirmDeleteItem({
                      type: 'article',
                      name: item?.name,
                      onConfirm: async () => {
                        await deleteArticle(item.id);
                        await refetch();
                      },
                    })
                  }
                >
                  <IconTrash size="l" />
                </Button>
              );
              return (
                <tr key={item.id}>
                  <td>{item?.name}</td>
                  <td width={40}>
                    <Flex>
                      <Button
                        color="success"
                        onClick={() =>
                          navigate(replaceUrlParameters(routes.ARTICLE, { articleId: item.id }))
                        }
                      >
                        <IconEdit size="l" />
                      </Button>
                      <Spacer />
                      {isBuiltIn ? (
                        <Tooltip
                          message="You cannot remove this article because it's an built-in"
                          placement="left"
                        >
                          <span>{removeBtn}</span>
                        </Tooltip>
                      ) : (
                        removeBtn
                      )}
                    </Flex>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </Page>
  );
});
