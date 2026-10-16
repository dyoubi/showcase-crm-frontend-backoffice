import { memo, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page';
import { useDeleteSegment, useGetSegments } from '@/domains/casino/segmentation';
import { replaceUrlParameters } from '@/utils';
import { Table } from '@/shared/Table';
import { IconAddPlus, IconEdit, IconSearch, IconTrash } from '@/shared/Icons';
import { Card } from '@/shared/Card';
import { SectionTitle } from '@/shared/SectionTitle';
import { Input } from '@/shared/Input';

import { Spacer } from '@/shared/Spacer';

import { routes } from '@/libs/router/constants';
import { useConfirmDeleteItem, useDebouncedValue } from '../../hooks';

import { AddNewSegment } from './AddNewSegment';

export const Segments = memo(() => {
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const [displayModal, setDisplayModal] = useState(false);
  const { data: segments, refetch } = useGetSegments(searchTerm);
  const { mutateAsync: deleteSegment } = useDeleteSegment();
  const navigate = useNavigate();
  const onDisplayModal = useCallback(() => setDisplayModal(true), [setDisplayModal]);
  const confirmDeleteItem = useConfirmDeleteItem();

  return (
    <Page breadcrumbs={[{ content: 'Segments list' }]}>
      <SectionTitle>Segments list</SectionTitle>
      {displayModal && <AddNewSegment />}
      <Card>
        <Input
          flex={1}
          leftIcon={IconSearch}
          buttonContent="Add new segment"
          onChange={({ target: { value } }) => setSearchTerm(value)}
          buttonProps={useMemo(
            () => ({ leftIcon: IconAddPlus, onClick: onDisplayModal }),
            [onDisplayModal],
          )}
        />
        <Spacer size="m" />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {segments?.map((segment) => (
              <tr key={segment.id}>
                <td>{segment.name}</td>
                <td>
                  <IconEdit
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      navigate(replaceUrlParameters(routes.SEGMENT_EDIT, { segmentId: segment.id }))
                    }
                  />
                  &nbsp;&nbsp;
                  <IconTrash
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      confirmDeleteItem({
                        type: 'segment',
                        name: segment?.name,
                        onConfirm: async () => {
                          await deleteSegment(segment.id);
                          await refetch();
                        },
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
    </Page>
  );
});
