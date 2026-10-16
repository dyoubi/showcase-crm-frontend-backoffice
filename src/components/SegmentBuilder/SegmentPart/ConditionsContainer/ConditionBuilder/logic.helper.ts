import isNil from 'lodash/isNil';
import isNaN from 'lodash/isNaN';

import { EntityModelReformatted } from '@/domains/entity';
import { Operators, Query } from '@/domains/casino/segmentation';
import { ERROR_MESSAGES } from './constants';

export const getPropertiesOptions = (properties: EntityModelReformatted['properties']) => {
  return Object.keys(properties).map((k) => ({ label: k, value: k }));
};

export const getFilterData = (field: Query = {}) => {
  const [propertyName = ''] = Object.keys(field);
  const operator = (Object.keys(field?.[propertyName] || {})[0] || '') as Operators;

  const value = field?.[propertyName]?.[operator];

  return { propertyName, operator, value };
};

export const validation = (value: Query) => {
  const filterData = getFilterData(value);

  if (!filterData.propertyName) {
    return ERROR_MESSAGES.MISSING_PROPERTY;
  }

  if (!filterData.operator) {
    return ERROR_MESSAGES.MISSING_OPERATOR;
  }
  if (isNil(filterData.value) || isNaN(filterData.value)) {
    return ERROR_MESSAGES.MISSING_VALUE;
  }

  return true;
};
