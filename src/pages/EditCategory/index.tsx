import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';

import { Page } from '@/components/Page';
import { TagInput, useTagInputState } from '@/components/TagInput';
import { MediaPickerRHF } from '@/components/RHF/MediaPicker';
import {
  useGetCategory,
  useGetCategoryMachinesViews,
  usePatchCategory,
  isBuiltInCategory,
} from '@/domains/casino/category';
import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';

import { IconGamepad, IconInfoCircle, IconLoader } from '@/shared/Icons';
import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';
import { TextArea } from '@/shared/TextArea';
import { EditableTitle } from '@/shared/EditableTitle';
import { Card } from '@/shared/Card';
import { Tooltip } from '@/shared/Tooltip';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';
import { routes } from '@/libs/router/constants';

import { ChangeGamesOrder } from './ChangeGamesOrder';
import { useHandleFormSubmit, useValidationSchema } from './hooks';
import * as t from './types';

export const EditCategory = memo(() => {
  // hooks
  const { categoryId = '' } = useParams();
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetCategory(categoryId, {
    onSuccess: (data) => {
      formData.setValue('slug', data?.key);
      formData.setValue('description', data?.description);
      formData.setValue('image.url', data?.image?.url);
      setTagsIds(data?.tags?.map(({ id }) => id) || []);
    },
  });

  const formData = useForm<t.EditCategoryForm>({
    resolver: yupResolver(useValidationSchema(category)),
  });
  const [tagsIds, setTagsIds] = useTagInputState();
  const reqPatchCategory = usePatchCategory(categoryId);

  const changeCategoryName = (name: string) =>
    reqPatchCategory.mutateAsync({ name }).then(() => refetch());

  const { refetch: reFetchCategoryMachineViewOrder } = useGetCategoryMachinesViews(categoryId);

  // constants
  const isBuiltIn = isBuiltInCategory(category?.key);

  const onSubmit = formData.handleSubmit(
    useHandleFormSubmit(
      async () => {
        await refetch();
        await reFetchCategoryMachineViewOrder();
      },
      category,
      tagsIds,
    ),
  );

  if (isLoading) {
    return <IconLoader />;
  }

  return (
    <Page
      breadcrumbs={[
        { content: 'Games categories', link: routes.GAMES_CATEGORIES },
        { content: category?.name || 'Untitled' },
      ]}
      headTitle={`Category > ${category?.name || ''}`}
    >
      <DevTool control={formData.control} />
      <EditableTitle value={category?.name} onSave={changeCategoryName} />
      <Spacer size="m" />
      <Card icon={IconGamepad} title="Games infos :">
        <form onSubmit={onSubmit}>
          <TagInput
            label="Tags associated :"
            setTagsIds={setTagsIds}
            tagsIds={tagsIds}
            tagType="machine"
          />
          <Spacer size="m" />
          <Input
            {...getInputProps(formData, 'slug')}
            label={
              <>
                <span>Slug&nbsp;</span>
                {isBuiltIn && (
                  <Tooltip
                    placement="right"
                    message="This is an built-in category you cannot edit the slug"
                  >
                    <IconInfoCircle size="xs" color="warning" />
                  </Tooltip>
                )}
              </>
            }
            disabled={isBuiltIn}
          />
          <Spacer size="m" />
          <TextArea
            {...getInputProps(formData, 'description')}
            label="Description"
            resize="vertical"
          />
          <Spacer size="m" />
          <MediaPickerRHF {...getControlledInputProps(formData, 'image.url')} />
          <Spacer size="m" />
          <Flex justifyContent="center">
            <Button type="submit" color="success">
              Submit
            </Button>
          </Flex>
        </form>
      </Card>
      <Spacer size="m" />
      {category && <ChangeGamesOrder category={category} categoryId={category?.id} />}
    </Page>
  );
});
