import { memo } from 'react';

import { MachineViewForm } from '@/components/MachineViewForm';
import { MachineView } from '@/domains/casino/machineView';

import { Modal } from '@/shared/Modal';
import { IconArrowLeft } from '@/shared/Icons';

interface EditMachineViewProps {
  machineViewToEdit?: MachineView;
  setMachineViewEdit: (g: MachineView | undefined) => void;
}

export const EditMachineView = memo(({ machineViewToEdit, setMachineViewEdit }: EditMachineViewProps) => {
  const handleOnHideModal = () => setMachineViewEdit(undefined);

  return (
    <Modal
      icon={<IconArrowLeft style={{ cursor: 'pointer' }} onClick={handleOnHideModal} />}
      onHide={handleOnHideModal}
      show={!!machineViewToEdit}
      title="Edit Game"
      width={750}
    >
      <MachineViewForm
        key={machineViewToEdit?.id}
        machineViewToEditId={machineViewToEdit?.id}
        onSubmit={() => setMachineViewEdit(undefined)}
      />
    </Modal>
  );
});
