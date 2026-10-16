import { memo, Fragment, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useGetEntities } from '@/domains/entity';

import { Button } from '@/shared/Button';
import { IconAddPlus } from '@/shared/Icons';

import { Spacer } from '@/shared/Spacer';
import { Select, OptionType } from '@/shared/Select';
import { Flex } from '@/shared/Flex';
import { useSegmentBuilderForm } from '../../hooks';
import { Collapse } from '../../../Collapse';
import { ConditionBuilder } from './ConditionBuilder';

interface ConditionsContainerProps {
  entityName: string;
  defaultIsCollapsed?: boolean;
  index: number;
}

const AndOrOptions = [
  { label: 'Add AND', value: 'and' },
  { label: 'Add OR', value: 'or' },
];

export const ConditionsContainer = memo(
  ({ entityName, defaultIsCollapsed, index }: ConditionsContainerProps) => {
    const segmentBuilderForm = useSegmentBuilderForm();
    const andArray = useFieldArray({
      control: segmentBuilderForm.control,
      name: `conditions.${index}.${entityName}.and`,
    });
    const orArray = useFieldArray({
      control: segmentBuilderForm.control,
      name: `conditions.${index}.${entityName}.or`,
    });
    const [andOr, setAndOr] = useState<OptionType | null>(AndOrOptions[0]);
    const { data: entities } = useGetEntities({ refetchOnMount: false });

    return (
      <Collapse title={entityName} collapsed={!defaultIsCollapsed}>
        <Spacer size="xs" />
        <b style={{ marginLeft: 40 }}>Select {entityName}s where :</b>
        <Spacer size="s" />
        {andArray.fields.map(({ id }, currentIndex) => (
          <Fragment key={id}>
            {entities?.[entityName].properties && (
              <ConditionBuilder
                properties={entities[entityName].properties}
                badge="and"
                path={`conditions.${index}.${entityName}.and.${currentIndex}`}
                removeCondition={() => andArray.remove(currentIndex)}
              />
            )}
            <Spacer size="xxs" />
          </Fragment>
        ))}
        {orArray.fields.map(({ id }, currentIndex) => (
          <Fragment key={id}>
            {entities?.[entityName].properties && (
              <ConditionBuilder
                properties={entities[entityName].properties}
                badge="or"
                path={`conditions.${index}.${entityName}.or.${currentIndex}`}
                removeCondition={() => orArray.remove(currentIndex)}
              />
            )}
            <Spacer size="xxs" />
          </Fragment>
        ))}
        <Flex display="flex" flexDirection="row" justifyContent="center">
          <Select onChange={setAndOr} value={andOr} options={AndOrOptions} width={120} />
          <Spacer size="xxs" />
          <Button
            leftIcon={IconAddPlus}
            onClick={() => {
              if (andOr?.value === 'and') {
                andArray.append({});
                return;
              }
              orArray.append({});
            }}
          />
        </Flex>
      </Collapse>
    );
  },
);

ConditionsContainer.displayName = 'ConditionsContainer';
