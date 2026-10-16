import { getMediaUrl } from '@/domains/casino/media';
import { useConfirmDeleteItem } from '@/hooks';
import { Flex } from '@/shared/Flex';
import { LoadingOverlay } from '@/shared/LoadingOverlay';
import { Spacer } from '@/shared/Spacer';
import { ListContainer, Ul, Li } from './styles';
import { useStoreContext } from '../hooks/useStoreContext';
import { FileItem } from './Item';
import { SelectedFile } from './Selected';
import { Header } from './Header';
import { useFileList } from '../hooks/useFileList';

export const FileListWithSearch = ({ selectedStoreId }: { selectedStoreId: string }) => {
  const { selectedMedia, setSelectedMedia } = useStoreContext();
  const confirmDeleteItem = useConfirmDeleteItem();

  const {
    files,
    state,
    searchInputRef,
    isFetching,
    searching,
    searchResults,
    setSearchTerm,
    handleDelete,
    setState,
  } = useFileList(selectedStoreId);

  return (
    <>
      <Header
        state={state}
        setState={setState}
        searchRef={searchInputRef}
        onSearch={setSearchTerm}
        isSearching={searching}
        maxResults={searchResults?.count || 0}
      />
      <Spacer size="l" />
      <ListContainer>
        <Flex flex={1} style={{ position: 'relative' }}>
          {isFetching && <LoadingOverlay />}
          <Ul>
            {files?.map((file) => {
              const selected = file.guid === selectedMedia?.guid;
              return (
                <Li key={file.guid}>
                  <FileItem
                    imageUrl={getMediaUrl(file.file_id, file.revision)}
                    selected={selected}
                    onClick={() => setSelectedMedia(selected ? undefined : file)}
                    onRemove={() =>
                      confirmDeleteItem({
                        type: 'file',
                        name: file.file_name,
                        onConfirm: () => handleDelete(file),
                      })
                    }
                  />
                </Li>
              );
            })}
          </Ul>
        </Flex>
        <SelectedFile />
      </ListContainer>
    </>
  );
};
