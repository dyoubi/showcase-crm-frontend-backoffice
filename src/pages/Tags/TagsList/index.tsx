import { memo } from 'react';

import { Tag, useDeleteCasinoTag, useGetCasinoTags } from '@/domains/casino/tag';
import { Badge } from '@/shared/Badge';
import { Card } from '@/shared/Card';
import { IconEdit, IconSearch, IconTrash } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { Table } from '@/shared/Table';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { DATA_TEST_IDS } from '@/constants';

import { useConfirmDeleteItem, useDebouncedValue } from '../../../hooks';

interface TagsListProps {
  setTagEdit: (tag: Tag | undefined) => void;
}

export const TagsList = memo(({ setTagEdit }: TagsListProps) => {
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const { data, refetch: reFetchTags, isFetching } = useGetCasinoTags({ searchTerm });
  const { mutateAsync: deleteTag } = useDeleteCasinoTag();
  const confirmDeleteItem = useConfirmDeleteItem();

  const removeTag = async (tagId: string) => {
    await deleteTag(tagId);
    await reFetchTags();
  };

  return (
    <Flex flex={1} flexDirection="column">
      <Card>
        <Input
          data-testid={DATA_TEST_IDS.SEARCH_TAG_INPUT}
          leftIcon={IconSearch}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
      </Card>
      <Spacer size="xs" />
      <Card
        loadingOverlay={isFetching}
        loadingOverlayDataTestId={DATA_TEST_IDS.LOADING_TAGS_OVERLAY}
      >
        <Table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody data-testid={DATA_TEST_IDS.TAGS_LIST}>
            {data?.map((tag) => (
              <tr key={tag.id}>
                <td>
                  <Badge color={tag.color}>{tag.name}</Badge>
                </td>
                <td>
                  <Badge color={tag.color}>{(tag.color ?? '').toUpperCase()}</Badge>
                </td>
                <td>
                  <IconEdit
                    data-testid={DATA_TEST_IDS.EDIT_TAG_BUTTON}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setTagEdit(tag)}
                  />
                  &nbsp;&nbsp;
                  <IconTrash
                    data-testid={DATA_TEST_IDS.REMOVE_TAG_BUTTON}
                    data-tag-id={tag.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      confirmDeleteItem({
                        type: 'tag',
                        name: tag?.name,
                        onConfirm: () => removeTag(tag?.id),
                      })
                    }
                    color="danger"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Flex>
  );
});
