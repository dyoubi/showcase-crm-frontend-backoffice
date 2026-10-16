import { memo, useCallback, useMemo, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { replaceUrlParameters } from '@/utils';
import { useGetCategories, useDeleteCategory } from '@/domains/casino/category';
import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';

import { Card } from '@/shared/Card';
import { SectionTitle } from '@/shared/SectionTitle';
import { IconAddPlus, IconEdit, IconSearch, IconTrash } from '@/shared/Icons';
import { Table } from '@/shared/Table';
import { Badge } from '@/shared/Badge';
import { Input } from '@/shared/Input';

import { routes } from '@/libs/router/constants';
import { DATA_TEST_IDS } from '@/constants';
import { useConfirmDeleteItem, useDebouncedValue } from '../../hooks';

import { AddNewCategoryModal } from './AddNewCategoryModal';

export const GamesCategories = memo(() => {
  // hooks
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const { data, refetch, isFetching } = useGetCategories(searchTerm?.trim());
  const { mutateAsync: deleteCasinoCategory } = useDeleteCategory();
  const [displayAddCategoryModal, setDisplayAddCategoryModal] = useState(false);
  const confirmDeleteItem = useConfirmDeleteItem();

  // callbacks
  const onHideModal = useCallback(() => {
    setDisplayAddCategoryModal(false);
  }, [setDisplayAddCategoryModal]);

  const onDisplayModal = useCallback(() => {
    setDisplayAddCategoryModal(true);
  }, [setDisplayAddCategoryModal]);

  const onCasinoAdd = useCallback(() => {
    refetch().finally(() => onHideModal());
  }, [onHideModal, refetch]);

  const onClickDelete = async (id: string) => {
    await deleteCasinoCategory(id);
    await refetch();
  };

  return (
    <Page breadcrumbs={[{ content: 'Games categories' }]} headTitle="Games categories">
      <AddNewCategoryModal
        show={displayAddCategoryModal}
        onHide={onHideModal}
        onCasinoAdd={onCasinoAdd}
      />
      <SectionTitle>Games categories :</SectionTitle>
      <Card>
        <Flex flexDirection="row" width="100%">
          <Input
            flex={1}
            color="secondary"
            leftIcon={IconSearch}
            onChange={({ target: { value } }) => setSearchTerm(value)}
            buttonContent="Add new category"
            data-testid={DATA_TEST_IDS.SEARCH_CATEGORY_INPUT}
            buttonProps={useMemo(
              () => ({
                leftIcon: IconAddPlus,
                onClick: onDisplayModal,
                'data-testid': DATA_TEST_IDS.ADD_NEW_CATEGORY_BUTTON,
              }),
              [onDisplayModal],
            )}
          />
        </Flex>
      </Card>
      <Spacer size="xs" />
      <Card loadingOverlay={isFetching}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody data-testid={DATA_TEST_IDS.CATEGORIES_LIST}>
            {data?.map(({ id, name, description, tags }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                  <Flex
                    flexDirection="row"
                    flexWrap="wrap"
                    flex={1}
                    justifyContent="center"
                    style={{ maxWidth: 400, margin: '0 auto' }}
                  >
                    {tags?.map((tag) => (
                      <Fragment key={tag.id}>
                        <Badge color={tag?.color} style={{ marginBottom: 3 }}>
                          {tag.name}
                        </Badge>
                        <Spacer size="xxs" />
                      </Fragment>
                    ))}
                  </Flex>
                </td>
                <td>
                  <IconEdit
                    style={{ cursor: 'pointer' }}
                    data-testid={DATA_TEST_IDS.EDIT_CATEGORY_BUTTON}
                    onClick={() =>
                      navigate(replaceUrlParameters(routes.GAME_EDIT_CATEGORY, { categoryId: id }))
                    }
                  />
                  &nbsp;&nbsp;
                  <IconTrash
                    data-testid={DATA_TEST_IDS.REMOVE_CATEGORY_BUTTON}
                    style={{ cursor: 'pointer' }}
                    color="danger"
                    onClick={() =>
                      confirmDeleteItem({
                        type: 'category',
                        name,
                        onConfirm: () => onClickDelete(id),
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Page>
  );
});

GamesCategories.displayName = 'GamesCategories';
