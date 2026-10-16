import { Condition } from '@/domains/casino/segmentation';

interface SetRelationsToCondition {
  relations: string[];
  condition: Condition;
  entityName: string;
}

export const setRelationsToCondition = ({
  relations = [],
  condition = {},
  entityName,
}: SetRelationsToCondition) => {
  // we save the values on the entity
  const newCondition: Condition = { [entityName]: { ...condition[entityName] } };
  relations.forEach((relation) => {
    newCondition[relation] = condition[relation] || { and: [], or: [] };
  });
  return newCondition;
};
