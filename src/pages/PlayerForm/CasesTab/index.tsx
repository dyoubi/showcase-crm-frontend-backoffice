import React, { memo } from 'react';

import { Title } from '@/components/Title';
import { TextArea } from '@/shared/TextArea';
import { Button } from '@/shared/Button';
import { Table } from '@/shared/Table';
import { IconEye } from '@/shared/Icons';

import { Spacer } from '@/shared/Spacer';
import * as S from './styles';

const array = [
  {
    openedAt: '1 day ago',
    status: 'OPEN',
  },
  {
    openedAt: '1 week ago',
    status: 'CLOSED',
  },
  {
    openedAt: '21/03/2022 09:32',
    status: 'RESOLVED',
  },
] as const;

export const CasesTab = memo(() => {
  return (
    <S.Container>
      <Title>Create new case</Title>
      <Spacer size="xs" />
      <TextArea resize="vertical" />
      <Spacer size="s" />
      <Button size="l" type="button">
        Create new case
      </Button>
      <Spacer size="m" />
      <Table>
        <thead>
          <tr>
            <th>Opened at</th>
            <th>Opened by</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item, index) => (
            <tr key={item.openedAt}>
              <td>{item.openedAt}</td>
              <td>{index % 2 ? 'Esteban' : 'John'}</td>
              <td>{item.status}</td>
              <td>
                <Button color="success" style={{ margin: '0 auto' }}>
                  <IconEye color="white" size="m" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </S.Container>
  );
});
