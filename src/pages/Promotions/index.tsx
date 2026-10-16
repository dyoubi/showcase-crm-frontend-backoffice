import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useGetPromotions, useDeletePromotion } from '@/domains/casino/promotion';
import { replaceUrlParameters } from '@/utils';
import { Card } from '@/shared/Card';
import { Table } from '@/shared/Table';
import { Button } from '@/shared/Button';
import { IconEdit, IconTrash } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { routes } from '@/libs/router/constants';
import { useConfirmDeleteItem } from '../../hooks';

export const Promotions = memo(() => {
  // hooks
  const { data: promotions, refetch } = useGetPromotions();
  const navigate = useNavigate();
  const { mutateAsync: deletePromotion } = useDeletePromotion();
  const confirmDeleteItem = useConfirmDeleteItem();

  return (
    <Page breadcrumbs={[{ content: 'Promotions' }]} headTitle="Promotions list">
      <Card
        title="Promotions list"
        topContent={
          <Button color="primary" onClick={() => navigate(routes.CREATE_PROMOTION)}>
            Create new promotion
          </Button>
        }
      >
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions?.map((item) => (
              <tr key={item.id}>
                <td>{item?.name}</td>
                <td width={40}>
                  <Flex>
                    <Button
                      color="success"
                      onClick={() =>
                        navigate(replaceUrlParameters(routes.PROMOTION, { promotionId: item.id }))
                      }
                    >
                      <IconEdit size="l" />
                    </Button>
                    <Spacer />
                    <Button
                      color="danger"
                      onClick={() =>
                        confirmDeleteItem({
                          type: 'promotion',
                          name: item?.name,
                          onConfirm: async () => {
                            await deletePromotion(item.id);
                            await refetch();
                          },
                        })
                      }
                    >
                      <IconTrash size="l" />
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Page>
  );
});
