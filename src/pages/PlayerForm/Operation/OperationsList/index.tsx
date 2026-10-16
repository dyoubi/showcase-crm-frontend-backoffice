import { useGetBalanceOperations } from '@/domains/casino/player/balance';

import { Table } from '@/shared/Table';

interface OperationsListProps {
  balanceId: string;
}

export const OperationsList = ({ balanceId }: OperationsListProps) => {
  const { data: operations } = useGetBalanceOperations(balanceId, {
    // we don't want win & bet operations, they are displayed in another page
    // operationTypesToExclude: [OperationTypeEnum.WIN, OperationTypeEnum.BET],
  });

  return (
    <Table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Value</th>
          <th>Created by</th>
        </tr>
      </thead>
      <tbody>
        {operations?.map((operation) => (
          <tr key={operation.id}>
            <td>{operation.type}</td>
            <td>{operation.value}</td>
            <td>{operation.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
