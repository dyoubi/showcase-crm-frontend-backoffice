import { useStoreContext } from '../hooks/useStoreContext';
import { FileListWithSearch } from './Grid';

export const FilesListTab = () => {
  const { selectedStoreId } = useStoreContext();

  if (!selectedStoreId) {
    return null;
  }

  return <FileListWithSearch selectedStoreId={selectedStoreId} />;
};
