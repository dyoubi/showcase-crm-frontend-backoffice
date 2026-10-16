import { usePatchPlayer } from '@/domains/casino/player';
import { usePostAssociateTagToEntity } from '@/domains/casino/tag';
import { deleteAllTagsAssociated } from '@/domains/casino/tag/api';
import { useHandleError, useToaster } from '../../../hooks';
import * as t from './types';

export const useHandleFormSubmit = (tagIds: readonly string[], playerId = '') => {
  const { mutateAsync: patchPlayer, isLoading } = usePatchPlayer();
  const toast = useToaster();
  const handleError = useHandleError();
  const { mutateAsync: postAssociateTagToEntity } = usePostAssociateTagToEntity();

  return {
    onSubmit: async (values: t.PlayerFormType) => {
      try {
        // we remove all tags associated to the player
        await deleteAllTagsAssociated({ entityType: 'player', entityId: playerId });

        await Promise.all(
          tagIds.map((tagId) =>
            postAssociateTagToEntity({
              entityType: 'player',
              tagId,
              entityId: playerId,
            }),
          ),
        );

        await patchPlayer({
          id: playerId,
          firstname: values?.firstname,
          lastname: values?.lastname,
          gender: values?.gender,
          birthdate: values?.birth ? new Date(values?.birth).toISOString() : undefined,
          privacy: {
            rain: values?.rainMode || false,
            statistics: values?.showStats || false,
            ghost: values?.ghostMode || false,
          },
          stats: {
            rankPoint: values?.rank?.points || 0,
            rankLevel: values?.rank?.level || 0,
          },
          marketingAcceptation: values?.marketingAcceptation,
        });

        toast({ content: 'Player information updated' });
      } catch (ex) {
        handleError(ex);
      }
    },
    isLoading,
  };
};
