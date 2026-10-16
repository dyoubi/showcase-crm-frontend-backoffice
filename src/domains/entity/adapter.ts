import * as t from './types';

const isObjectProperty = (property: t.EntityProperties): property is t.ObjectProperty => {
  return 'objectProperties' in property && property.itemType === 'object';
};

const flatObjectProperties = (entity: t.EntityModel) => {
  const newEntity: t.EntityModelReformatted = { ...entity, properties: {} };
  const { properties } = entity;

  Object.keys(properties).forEach((propertyKey) => {
    const currentProperty = properties[propertyKey];

    if (!isObjectProperty(currentProperty)) {
      newEntity.properties[propertyKey] = currentProperty;
      return;
    }

    const nestedPropertiesKeys = Object.keys(currentProperty.objectProperties || {});

    nestedPropertiesKeys.forEach((nestedProperty) => {
      newEntity.properties[`${propertyKey}.${nestedProperty}`] = {
        type: currentProperty.objectProperties[nestedProperty].type,
      };
    });
  });

  return newEntity;
};

export const reformatResponse = (response: t.GetEntitiesResponse) => {
  const entityNames = Object.keys(response || {});
  const reformattedResponse: t.GetEntitiesReformatted = {};

  entityNames.forEach((entityName) => {
    reformattedResponse[entityName] = flatObjectProperties(response[entityName]);
  });

  return reformattedResponse;
};
