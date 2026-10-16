import { MachineViewForm } from '@/components/MachineViewForm';
import { Modal } from '@/shared/Modal';
import { IconGamepad } from '@/shared/Icons';

interface AddMachineViewModalProps {
  onHide: () => void;
  onMachineViewAdd: () => void;
}

export const AddMachineViewModal = ({ onHide, onMachineViewAdd }: AddMachineViewModalProps) => {
  return (
    <Modal
      icon={IconGamepad}
      minHeight="60%"
      onHide={onHide}
      show
      title="Add New Game"
    >
      <MachineViewForm onSubmit={onMachineViewAdd} />
    </Modal>
  );
};
