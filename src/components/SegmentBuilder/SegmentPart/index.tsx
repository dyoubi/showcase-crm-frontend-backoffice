import { useMemo } from 'react';

import { GetEntitiesReformatted } from '@/domains/entity';
import { Condition } from '@/domains/casino/segmentation';
import { Spacer } from '@/shared/Spacer';
import { Divider } from '@/shared/SectionTitle/styles';
import { Select } from '@/shared/Select';
import { Button } from '@/shared/Button';
import { IconTrash } from '@/shared/Icons';
import { Flex } from '@/shared/Flex';
import { ConditionsContainer } from './ConditionsContainer';

import { getRelationsOptions, getSelectedRelationsIndex } from './logic.helper';

interface SegmentPartProps {
  className?: string;
  onRemove: () => void;
  segmentPartIndex: number;
  entity: GetEntitiesReformatted[string];
  setRelations: (relations: string[]) => void;
  condition: Condition;
}

const NoneOption = { label: 'None', value: '-1' };

export const SegmentPart = ({
  className,
  onRemove,
  segmentPartIndex,
  entity,
  setRelations,
  condition,
}: SegmentPartProps) => {
  // hooks
  const relationsOptions = useMemo(() => getRelationsOptions(entity), [entity]);

  // constants
  const currentRelationsIndex = getSelectedRelationsIndex(condition, entity.relations, entity.name);
  const currentRelations = entity.relations?.[currentRelationsIndex];

  return (
    <div className={className} style={{ width: '95%', margin: '12px auto' }}>
      <Flex
        display="flex"
        flexDirection="row"
        height={110}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Select
          value={relationsOptions[currentRelationsIndex] || NoneOption.value}
          onChange={(option) =>
            setRelations(entity.relations?.[parseInt(option?.value || '-1', 10)])
          }
          options={[NoneOption, ...relationsOptions]}
          label={`I want create filter for ${entity.name} using :`}
          width={230}
        />
        <Spacer size="xs" />
        <Button color="danger" onClick={onRemove}>
          <IconTrash size="m" />
        </Button>
      </Flex>
      <Divider />
      <Spacer size="xs" />
      {currentRelations?.map((relation) => (
        <ConditionsContainer
          entityName={relation}
          index={segmentPartIndex}
          key={relation}
          defaultIsCollapsed={false}
        />
      ))}
      <ConditionsContainer entityName={entity.name} index={segmentPartIndex} defaultIsCollapsed />
    </div>
  );
};

SegmentPart.displayName = 'SegmentPart';
