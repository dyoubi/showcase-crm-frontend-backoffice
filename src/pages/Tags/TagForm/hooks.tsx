import { useQueryClient } from 'react-query';

import { formatApiError, isApiError } from '@/domains/api';
import { usePostCasinoTag } from '@/domains/casino/tag';
import { QUERY_KEYS } from '@/libs/react-query';
import { DATA_TEST_IDS } from '@/constants';
import { useToaster } from '../../../hooks';

import * as t from './types';

export const useHandleFormSubmit = (tagId?: string) => {
  const { mutateAsync } = usePostCasinoTag();
  const toast = useToaster();
  const queryClient = useQueryClient();

  return async ({ name, color, type, slug }: t.TagForm) => {
    try {
      if (!name || !color || !type || !slug) {
        return;
      }

      await mutateAsync({ id: tagId, name, color, type, key: slug });
      toast({
        dataTestId: DATA_TEST_IDS.ADD_TAG_TOAST,
        content: (
          <>
            Tag <i>{name}</i> {tagId ? 'edited' : 'created'}.
          </>
        ),
      });
      await queryClient.refetchQueries(QUERY_KEYS.GET_CASINO_TAGS, { active: true });
    } catch (ex) {
      if (!isApiError(ex)) {
        console.error(ex);
        toast({
          dataTestId: DATA_TEST_IDS.ADD_TAG_TOAST,
          color: 'danger',
          content: `An unknown error occured, please check the tech team.`,
        });
        return;
      }

      const apiError = formatApiError(ex);

      toast({
        dataTestId: DATA_TEST_IDS.ADD_TAG_TOAST,
        color: 'danger',
        content: `An unknown API error occured, please check the tech team :${apiError.message}`,
      });
      console.error(apiError.message);
    }
  };
};
