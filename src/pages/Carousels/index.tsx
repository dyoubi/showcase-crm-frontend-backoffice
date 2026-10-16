import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useDeleteCarousel, useGetCarrousels } from '@/domains/casino/carousel';
import { replaceUrlParameters } from '@/utils';
import { Card } from '@/shared/Card';
import { Table } from '@/shared/Table';
import { Button } from '@/shared/Button';
import { IconEdit, IconTrash, IconSearch } from '@/shared/Icons';
import { Input } from '@/shared/Input';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { routes } from '@/libs/router/constants';
import { useConfirmDeleteItem, useDebouncedValue } from '../../hooks';

export const Carousels = memo(() => {
  // hooks
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const { data: promotions, refetch } = useGetCarrousels(searchTerm);
  const { mutateAsync: deleteCarousel } = useDeleteCarousel();
  const navigate = useNavigate();
  const confirmDeleteItem = useConfirmDeleteItem();

  return (
    <Page breadcrumbs={[{ content: 'Carousels' }]} headTitle="Carousels list">
      <Card
        title="Carousels list"
        topContent={
          <Button color="primary" onClick={() => navigate(routes.CREATE_CAROUSEL)}>
            Create new carousel
          </Button>
        }
      >
        <Spacer size="xs" />
        <Input
          color="secondary"
          leftIcon={IconSearch}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
        <Spacer size="l" />
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
                <td>{item.key}</td>
                <td width={40}>
                  <Flex>
                    <Button
                      color="success"
                      onClick={() =>
                        navigate(replaceUrlParameters(routes.CAROUSEL, { carouselId: item.id }))
                      }
                    >
                      <IconEdit size="l" />
                    </Button>
                    <Spacer />
                    <Button
                      color="danger"
                      onClick={() =>
                        confirmDeleteItem({
                          type: 'carousel',
                          name: item?.key,
                          onConfirm: async () => {
                            await deleteCarousel(item.id);
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
