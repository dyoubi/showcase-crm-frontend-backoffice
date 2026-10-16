import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ContentStore, StoreMedia, useGetContentStores } from '@/domains/casino/media';

interface StoreContextType {
  allStores: ContentStore[];
  selectedStoreId: string;
  setSelectedStore: (store?: ContentStore) => void;

  selectedMedia?: StoreMedia;
  setSelectedMedia: (media?: StoreMedia) => void;
  onChooseFile?: (file: StoreMedia) => void;

  showAsPicker?: boolean;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreContextProviderProps {
  show: boolean;
  onClose?: () => void;
  onChooseFile?: (file: StoreMedia) => void;
}

export const StoreContextProvider: React.FC<
  {
    children?: ReactNode;
  } & StoreContextProviderProps
> = ({ children, show, onChooseFile, onClose }) => {
  const [selectedStore, setSelectedStore] = useState<ContentStore | undefined>(undefined);

  const [selectedMedia, setSelectedMedia] = useState<StoreMedia>();

  const { data: stores } = useGetContentStores();

  const onChooseFileCb = useCallback(
    (file: StoreMedia) => {
      if (show && onClose) {
        onClose();
      }
      return onChooseFile && onChooseFile(file);
    },
    [onChooseFile, onClose, show],
  );

  useEffect(() => {
    if (stores && stores?.length === 1) {
      setSelectedStore(stores[0]);
    }
  }, [stores]);

  const providerValue = useMemo(
    () => ({
      allStores: stores as ContentStore[],
      selectedStoreId: selectedStore?.id || '',
      setSelectedStore,
      selectedMedia,
      setSelectedMedia,
      onChooseFile: onChooseFile ? onChooseFileCb : undefined,
      showAsPicker: show,
    }),
    [stores, selectedStore, selectedMedia, setSelectedMedia, onChooseFileCb, show, onChooseFile],
  );

  return <StoreContext.Provider value={providerValue}>{children}</StoreContext.Provider>;
};
