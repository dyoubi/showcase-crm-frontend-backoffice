import { Button } from '@/shared/Button';
import { IconEdit, IconTrash } from '@/shared/Icons';
import { Spacer } from '@/shared/Spacer';
import { ItemContainer, ItemToolbar } from './styles';
import { useStoreContext } from '../hooks/useStoreContext';

interface FileItemProps {
  imageUrl?: string;
  onClick: () => void;
  onRemove?: () => void;
  selected: boolean;
}

export const FileItem = ({ imageUrl, onClick, onRemove, selected }: FileItemProps) => {
  const { showAsPicker } = useStoreContext();

  return (
    <ItemContainer
      display="inline-flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      selected={selected}
      imageUrl={imageUrl}
      onClick={showAsPicker ? onClick : undefined}
    >
      {!showAsPicker && (
        <ItemToolbar className="file-toolbar">
          <Button onClick={onClick} type="button" color="success">
            <IconEdit size="m" />
          </Button>
          <Spacer size="xxs" />
          {onRemove && (
            <Button onClick={onRemove} type="button" color="danger">
              <IconTrash size="m" />
            </Button>
          )}
        </ItemToolbar>
      )}
      <Spacer size="m" />
    </ItemContainer>
  );
};
