import { memo, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';

import { useGetMachineView, useGetMachinesViews } from '@/domains/casino/machineView';
import { useGetCasinoMachines } from '@/domains/casino/machine';
import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';


import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';
import { TextArea } from '@/shared/TextArea';
import { IconDesktop, IconMobile } from '@/shared/Icons';

import { getInputProps, getControlledInputProps } from '@/libs/react-hook-form/utils';

import { SelectRHF } from '../RHF/Select';
import { MediaPickerRHF } from '../RHF/MediaPicker';
import { TagInput, useTagInputState } from '../TagInput';
import { GroupInputs } from '../GroupInputs';

import { useDebouncedValue } from '../../hooks';
import { useValidationSchema } from './useValidationSchema';
import { useHandleFormSubmit, useSyncTitleAndDescription } from './hooks';

import { getMachinesOptions, findMachineFromId } from './logic.helper';

import * as c from './constants';
import * as t from './types';

interface MachineViewFormProps {
  machineViewToEditId?: string;
  onSubmit?: () => void;
}

const disabledProps = {
  color: 'secondary',
  disabled: true,
  readOnly: true,
} as const;

export const MachineViewForm = memo((props: MachineViewFormProps) => {
  const { machineViewToEditId, onSubmit: onSubmitCallback } = props;

  const machineViewId = machineViewToEditId;
  const isEditMode = !!machineViewId;

  // hooks
  const formData = useForm<t.MachineViewForm>({
    resolver: yupResolver(useValidationSchema(machineViewToEditId, isEditMode)),
  });
  const machineId = useWatch({ name: 'machineId', control: formData.control });
  const [machineToSearch, setMachineToSearch] = useDebouncedValue('');
  const [tagsIds, setTagsIds] = useTagInputState();
  const { data: machines = [], isFetching: isMachineCatalogLoading } = useGetCasinoMachines(
    { searchTerm: machineToSearch },
    // { enabled: (machineToSearch?.length || 0) > 3 },
  );
  const { data: machinesViews = [] } = useGetMachinesViews();
  useSyncTitleAndDescription({ machineId, machines, setValue: formData.setValue });

  const { data: machineView } = useGetMachineView(machineViewToEditId || '', {
    enabled: isEditMode,
    onSuccess: (machineViewResponse) => {
      const image = machineViewResponse?.image;
      formData.setValue('description', machineViewResponse?.description);
      formData.setValue('image.desktop.url', image?.desktop?.url);
      formData.setValue('image.mobile.url', image?.mobile?.url);
      formData.setValue('slug', machineViewResponse?.key);
      formData.setValue('title', machineViewResponse?.title);
      setTagsIds(machineViewResponse?.tags?.map(({ id }) => id) || []);
    },
  });

  // constants
  const machineData = findMachineFromId(
    machineViewToEditId ? machineView?.operatorId : machineId,
    machines,
  );
  const { control, handleSubmit } = formData;
  const machineOptions = getMachinesOptions({ machines, machinesViews });

  useEffect(() => {
    if (
      (
        machineId
        || machineViewToEditId
      )
      && machineData
    ) {
      formData.setValue('maxPayout', machineData?.info?.multiplier);
      formData.setValue('provider', machineData?.info?.producer);
      formData.setValue('providerId', machineData?.providerId);
      formData.setValue('rtp', machineData?.info?.payout);
      formData.setValue('volatility', machineData?.info?.volatility_rating);
    }
  }, [machineId, machineView, machineViewToEditId])

  // callbacks
  const onSubmit = handleSubmit(
    useHandleFormSubmit({
      onSubmit: onSubmitCallback,
      isEditMode,
      tagsIds,
      machineView,
    }),
  );

  return (
    <form onSubmit={onSubmit}>
      <Flex flexDirection="column" gap={16}>
      <DevTool control={control} />

      {!isEditMode && (
        <GroupInputs>
          <SelectRHF
            onInputChange={setMachineToSearch}
            label="Select Game"
            isLoading={isMachineCatalogLoading}
            {...getControlledInputProps(formData, 'machineId')}
            options={machineOptions}
          />
        </GroupInputs>
      )}

      <GroupInputs>
        <Input {...getInputProps(formData, 'title')} label="Title" />
        <Input {...getInputProps(formData, 'slug')} label="Slug" />
      </GroupInputs>

      <GroupInputs>
        <TagInput
          key={machineView?.id}
          label="Tags :"
          tagsIds={tagsIds}
          setTagsIds={setTagsIds}
          tagType="machine"
        />
      </GroupInputs>

      <GroupInputs>
        <TextArea
          {...getInputProps(formData, 'description')}
          label="Description"
          resize="vertical"
          minHeight={140}
        />
      </GroupInputs>

      <GroupInputs>
        <Input
          {...disabledProps}
          label="Game ID"
          value={machineData?.id || ''}
        />

        <Input {...disabledProps} label="Studio" value={machineData?.studio || ''} />
      </GroupInputs>

      <GroupInputs>
        <SelectRHF
          label="Type"
          options={[
            { label: 'Slot', value: 'slot' },
            { label: 'Video Slot', value: 'video-slot' },
          ]}
          {...getControlledInputProps(formData, 'slot')}
        />

        <Input {...disabledProps} label="Wagering Coefficient" value={1} />
      </GroupInputs>

      <GroupInputs>
        <Input {...disabledProps} label="Min Bet" />
        <Input {...disabledProps} label="Max Bet" />
      </GroupInputs>

      <GroupInputs>
        <Input
          {...disabledProps}
          label="RTP"
          value={machineData?.info?.payout}
        />

        <Input {...disabledProps} label="Max Coins" />
      </GroupInputs>

      <GroupInputs>
        <Input
          {...disabledProps}
          label="Max payout"
          value={machineData?.info?.multiplier}
        />

        <Input {...disabledProps} label="Bonus Hit Frequency" />
      </GroupInputs>

      <GroupInputs>
        <Input
          {...disabledProps}
          label="Volatility"
          value={machineData?.info?.volatility_rating}
        />

        <SelectRHF
          label="Status"
          options={c.GameOptions}
          {...getControlledInputProps(formData, 'status')}
        />
      </GroupInputs>

      <GroupInputs>
        <MediaPickerRHF
          title={
            <Flex flexDirection="row" alignItems="center">
              <IconDesktop size="l" />
              <Spacer size="xxs" />

              <span>Desktop Thumbnail</span>
            </Flex>
          }
          {...getControlledInputProps(formData, 'image.desktop.url')}
        />

        <MediaPickerRHF
          title={
            <Flex flexDirection="row" alignItems="center">
              <IconMobile size="l" />
              <Spacer size="xxs" />

              <span>Mobile Thumbnail</span>
            </Flex>
          }
          {...getControlledInputProps(formData, 'image.mobile.url')}
        />
      </GroupInputs>

      <Input
        {...disabledProps}
        hidden
        label="Provider"
        value={machineData?.info?.producer}
      />

      <Input
        {...disabledProps}
        hidden
        label="Provider ID"
        value={machineData?.providerId}
      />

      <Flex justifyContent="center">
        <Button type="submit">Save</Button>
      </Flex>
      </Flex>
    </form>
  );
});
