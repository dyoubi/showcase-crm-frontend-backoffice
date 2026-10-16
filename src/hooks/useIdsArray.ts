import { useCallback, useState } from 'react';
import { generateId } from '@/utils';

const getDefaultArray = (defaultIdsNumber: number) => {
  const array = [];
  for (let i = 0; i < defaultIdsNumber; i += 1) {
    array.push(generateId());
  }
  return array;
};

export const useIdsArray = (defaultIdsNumber = 0) => {
  const [ids, setState] = useState(getDefaultArray(defaultIdsNumber));

  const pushId = useCallback(() => setState((oldIds) => [...oldIds, generateId()]), [setState]);

  const removeId = useCallback(
    (id: string) => setState((oldIds) => [...oldIds].filter((currentId) => currentId !== id)),
    [setState],
  );

  return { ids, pushId, removeId };
};
