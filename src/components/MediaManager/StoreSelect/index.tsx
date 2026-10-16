import { Select, getOptionFromValue } from '@/shared/Select';
import { useMemo } from 'react';
import { useStoreContext } from '../hooks/useStoreContext';

export const StoreSelector = () => {
  const { allStores, selectedStoreId, setSelectedStore } = useStoreContext();

  const options = useMemo(
    () =>
      allStores?.map((store) => ({
        label: store.name,
        value: store.id,
      })),
    [allStores],
  );

  if (!allStores?.length) {
    return <div>Loading stores...</div>;
  }

  return (
    <Select
      width={180}
      label="Select Store"
      value={getOptionFromValue(selectedStoreId, options)}
      options={options}
      onChange={(value) => {
        if (!value?.value) return null;

        const storeSel = allStores?.find((store) => store.id === value.value);

        if (!storeSel) return null;

        return setSelectedStore(storeSel);
      }}
    />
  );
};
