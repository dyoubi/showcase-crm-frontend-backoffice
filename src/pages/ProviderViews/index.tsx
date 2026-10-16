import { memo, useCallback, useState } from 'react';

import { Page } from '@/components/Page';

import { GetProvidersResponse, useProviders } from '@/domains/casino/provider';

import { Card } from '@/shared/Card';
import { Table } from '@/shared/Table';
import { Button } from '@/shared/Button';
import { IconEdit, IconSearch } from '@/shared/Icons';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';
import { Modal } from '@/shared/Modal';
import { SectionTitle } from '@/shared/SectionTitle';
import { Input } from '@/shared/Input';

import { useDebouncedValue } from '@/hooks';

import { ProviderForm } from './ProviderForm';

export const Providers = memo(() => {
  // hooks
  const [searchTerm, setSearchTerm] = useDebouncedValue('');
  const { data: providers, refetch } = useProviders(searchTerm);
  const [editProvider, setEditProvider] = useState<GetProvidersResponse[number] | undefined>(
    undefined,
  );
  const closeEditModal = useCallback(() => {
    setEditProvider(undefined);
    refetch();
  }, [setEditProvider, refetch]);

  return (
    <Page breadcrumbs={[{ content: 'Providers' }]} headTitle="Providers">
      {editProvider && (
        <Modal show onHide={closeEditModal}>
          <ProviderForm editProvider={editProvider} onFormSubmitted={closeEditModal} />
        </Modal>
      )}
      <SectionTitle>Providers list :</SectionTitle>
      <Card>
        <Input
          color="secondary"
          leftIcon={IconSearch}
          onChange={({ target: { value } }) => setSearchTerm(value)}
        />
      </Card>
      <Spacer size="xs" />
      <Card>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers?.map((item) => (
              <tr key={item.id + item.position}>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>
                  <Flex justifyContent="center">
                    <Button color="success" onClick={() => setEditProvider(item)}>
                      <IconEdit size="l" />
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
