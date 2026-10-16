import { EntityModel } from '@/domains/entity';
import { Condition } from '@/domains/casino/segmentation';

export const getRelationsOptions = (entityModel: EntityModel) => {
  const { relations } = entityModel;

  return relations.map((relation, index) => ({
    label: relation.join(' & '),
    value: index.toString(),
  }));
};

export const getSelectedRelationsIndex = (
  condition: Condition,
  relations: string[][],
  entityName: string,
) => {
  const currentRelations = Object.keys(condition || {})
    .filter((relation) => relation !== entityName)
    .sort()
    .join(',');
  const listRelations = relations.map((v) => v.sort().join(','));

  return listRelations.findIndex((a) => a === currentRelations);
};
