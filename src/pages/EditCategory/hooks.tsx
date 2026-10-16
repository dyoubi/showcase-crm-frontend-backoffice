import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import {
  GetCategoryResponse,
  useGetIsCategorySlugIsAvailable,
  usePatchCategory,
} from '@/domains/casino/category';
import { usePostAssociateTagToEntity, useDeleteAllTagsAssociated } from '@/domains/casino/tag';

import { replaceUrlParameters } from '@/utils';
import { routes } from '@/libs/router/constants';
import { useToaster, useHandleError } from '../../hooks';
import * as t from './types';

export const useHandleFormSubmit = <C,>(
  reFetchGamesOrder: () => Promise<C>,
  category?: GetCategoryResponse,
  tagsIds?: readonly string[],
) => {
  const toast = useToaster();
  const { mutateAsync } = usePatchCategory(category?.id || '');
  const handleError = useHandleError();
  const navigate = useNavigate();
  const { mutateAsync: postAssociateTagToEntity } = usePostAssociateTagToEntity();
  const { mutateAsync: deleteAllTagsAssociated } = useDeleteAllTagsAssociated();

  const associateTagsToCategory = async () => {
    if (!category?.id || !tagsIds) {
      return;
    }
    // we remove all tags associated before push all the new tags
    await deleteAllTagsAssociated({
      entityType: 'category',
      entityId: category?.id,
    });
    await Promise.all(
      tagsIds.map((tagId) =>
        postAssociateTagToEntity({
          entityType: 'category',
          tagId,
          entityId: category?.id,
        }),
      ),
    );
  };

  return async ({ description, slug, image }: t.EditCategoryForm) => {
    try {
      if (!slug || !category || !tagsIds) {
        return;
      }

      await associateTagsToCategory();
      await mutateAsync({ description, slug, image });

      toast({
        content: (
          <>
            The category <i>{category?.name}</i> has been edited
          </>
        ),
      });

      if (category?.key !== slug) {
        navigate(replaceUrlParameters(routes.GAME_EDIT_CATEGORY, { categoryId: category?.id }));
        return;
      }

      await reFetchGamesOrder();
    } catch (ex) {
      handleError(ex);
    }
  };
};

export const useValidationSchema = (
  category?: GetCategoryResponse,
): yup.SchemaOf<t.EditCategoryForm> => {
  const { mutateAsync } = useGetIsCategorySlugIsAvailable(category?.id);

  return yup.object({
    slug: yup.string().required().slug(mutateAsync),
    description: yup.string().trim(),
    image: yup.object({ url: yup.string() }),
  });
};
