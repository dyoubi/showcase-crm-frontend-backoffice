import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import { GetCasinoMachinesResponse } from '@/domains/casino/machine';
import { usePostAssociateTagToEntity, useDeleteAllTagsAssociated, Tag } from '@/domains/casino/tag';
import { usePostMachineView, usePatchMachineView, MachineView } from '@/domains/casino/machineView';

import { slugify } from '@/utils';
import { QUERY_KEYS } from '@/libs/react-query';
import { DATA_TEST_IDS } from '@/constants';
import { useHandleError, useToaster } from '../../hooks';

import { findMachineFromId } from './logic.helper';
import * as t from './types';

export interface OnSubmit {
  isEditMode: boolean;
  tagsIds: readonly Tag['id'][];
  machineView?: MachineView;
  onSubmit?: () => void;
}
export const useHandleFormSubmit = ({ onSubmit, isEditMode, machineView, tagsIds }: OnSubmit) => {
  const toast = useToaster();
  const { mutateAsync: postMachineView } = usePostMachineView();
  const { mutateAsync: patchMachineView } = usePatchMachineView();
  const errorHandler = useHandleError();
  const queryClient = useQueryClient();

  const { mutateAsync: postAssociateTagToEntity } = usePostAssociateTagToEntity();
  const { mutateAsync: deleteAllTagsAssociated } = useDeleteAllTagsAssociated();

  const associateTagsToMachineView = async (machineViewId: string) => {
    // first we remove all the tags associates for push all our new tags
    await deleteAllTagsAssociated({ entityType: 'machine', entityId: machineViewId });

    await Promise.all(
      tagsIds.map((tagId) =>
        postAssociateTagToEntity({
          entityType: 'machine',
          tagId,
          entityId: machineViewId,
        }),
      ),
    );
  };

  return async (values: t.MachineViewForm) => {
    const {
      title,
      description,
      machineId,
      slug,
      image,
      maxPayout,
      provider,
      providerId,
      rtp,
      volatility,
    } = values;

    if (!title || !description || !slug) {
      return;
    }

    const commonPayload = {
      description,
      image: {
        desktop: {
          url: image?.desktop?.url,
        },
        mobile: {
          url: image?.mobile?.url,
        },
      },
      key: slug,
      maxPayout,
      provider,
      providerId,
      rtp,
      title,
      volatility,
    } as const;

    try {
      /** EDIT MACHINE VIEW MODE */
      if (isEditMode && machineView?.id) {
        await associateTagsToMachineView(machineView?.id);
        await patchMachineView({
          ...commonPayload,
          id: machineView?.id,
        });

        toast({ content: `The game ${title} has been edited` });
        return;
      }
      /** END EDIT */

      /** CREATE MACHINE VIEW MODE */
      const newMachineView = await postMachineView({
        ...commonPayload,
        operatorId: machineId,
      });

      await associateTagsToMachineView(newMachineView?.id);
      toast({
        dataTestId: DATA_TEST_IDS.ADD_GAME_TOAST,
        content: `The game ${title} has been created`,
      });
      /** END CREATE */
    } catch (ex) {
      errorHandler(ex);
    } finally {
      if (onSubmit) {
        onSubmit();
      }
      await queryClient.refetchQueries(QUERY_KEYS.GET_CASINO_MACHINES_VIEWS, { active: true });
    }
  };
};

/**
 * When the user change machine, this hook will automatically prefill
 * title & description & slug inputs
 */
interface SyncTitleAndDescription {
  machineId?: string;
  setValue: UseFormSetValue<t.MachineViewForm>;
  machines: GetCasinoMachinesResponse;
}
export const useSyncTitleAndDescription = ({
  machineId = '',
  setValue,
  machines,
}: SyncTitleAndDescription) => {
  useEffect(() => {
    const machineAssociated = findMachineFromId(machineId, machines);

    if (!machineAssociated) {
      return;
    }

    setValue('title', machineAssociated?.info?.title);
    setValue('slug', slugify(machineAssociated?.info?.title || machineAssociated?.key || ''));
    setValue('description', machineAssociated?.info?.description);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machineId]);
};
