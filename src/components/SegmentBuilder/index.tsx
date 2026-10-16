import { memo } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { Conditions } from '@/domains/casino/segmentation';
import { useGetEntities } from '@/domains/entity';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { FeedbackMessage } from '@/shared/FeedbackMessage';
import { Button } from '@/shared/Button';
import { IconLoader } from '@/shared/Icons';

import { SegmentPart } from './SegmentPart';
import * as S from './styles';
import { setRelationsToCondition } from './logic.helper';
import { SegmentBuilderForm } from './types';

interface SegmentBuilderProps {
  className?: string;
  onEntity: string;
  initialsConditions: Conditions;
  onBuildFinished: (data: Conditions) => void;
}

export const SegmentBuilder = memo(
  ({
    onBuildFinished: onSubmitCb,
    initialsConditions,
    onEntity,
    className,
  }: SegmentBuilderProps) => {
    // hooks
    const form = useForm<SegmentBuilderForm>({ defaultValues: { conditions: initialsConditions } });
    const { fields, append, remove, update } = useFieldArray({
      control: form.control,
      name: 'conditions',
    });
    const { data, isFetching } = useGetEntities();

    // constants
    const entity = data?.[onEntity];

    if (isFetching) {
      return <IconLoader size="xxl" style={{ margin: '0 auto', display: 'block' }} />;
    }

    if (!entity) {
      return (
        <FeedbackMessage color="danger">
          <h3>The entity {onEntity} doesn&apos;t exists ! SegmentBuilder cant be displayed</h3>
        </FeedbackMessage>
      );
    }

    const onSubmit = form.handleSubmit(({ conditions }) => conditions && onSubmitCb?.(conditions));

    return (
      <form className={className} onSubmit={onSubmit}>
        <FormProvider {...form}>
          <DevTool {...form} />
          {fields.map(({ id, ...condition }, index) => (
            <SegmentPart
              key={id}
              segmentPartIndex={index}
              entity={entity}
              onRemove={() => remove(index)}
              setRelations={(relations) =>
                update(
                  index,
                  setRelationsToCondition({
                    relations,
                    condition: fields[index],
                    entityName: entity.name,
                  }),
                )
              }
              condition={condition}
            />
          ))}
          <S.IconAddPlus size="xl" color="secondary" onClick={() => append({})} />
          <Flex flexDirection="row">
            <Spacer size="l" />
            <Button type="submit">Save</Button>
          </Flex>
        </FormProvider>
      </form>
    );
  },
);

SegmentBuilder.displayName = 'SegmentBuilder';
