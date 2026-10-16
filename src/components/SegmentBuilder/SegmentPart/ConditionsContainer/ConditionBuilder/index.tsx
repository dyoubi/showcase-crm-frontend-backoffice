/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo, useMemo } from 'react';
import { useController } from 'react-hook-form';
import get from 'lodash/get';

import { EntityModelReformatted } from '@/domains/entity';
import { Badge } from '@/shared/Badge';
import { IconTrash } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { Input } from '@/shared/Input';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { getOptionFromValue, isSingleValue, OptionType } from '@/shared/Select';
import { FeedbackMessage } from '@/shared/FeedbackMessage';
import { getPropertiesOptions, getFilterData, validation } from './logic.helper';
import * as c from './constants';
import * as S from './styles';
import { useSegmentBuilderForm } from '../../../hooks';
import { ValueType } from './types';

interface ConditionBuilderProps {
  badge?: 'and' | 'or';
  removeCondition?: () => void;
  properties: EntityModelReformatted['properties'];
  path: `conditions.${number}.${string}.${'and' | 'or'}.${number}`;
}

export const ConditionBuilder = memo(
  ({ badge, removeCondition, properties, path }: ConditionBuilderProps) => {
    // hooks
    const propertiesList = useMemo(() => getPropertiesOptions(properties), [properties]);
    const form = useSegmentBuilderForm();
    const { field } = useController({
      control: form.control,
      name: path,
      rules: {
        validate: validation,
      },
    });

    // constants
    const {
      formState: { errors },
    } = form;
    const filterData = getFilterData(field.value);
    const error = get(errors, path)?.message;

    // callbacks
    const onPropertyChange = ({ value }: OptionType) => {
      if (!value) return;

      field.onChange({
        [value?.toString()]: { eq: '' },
      });
    };

    const onOperatorChange = ({ value }: OptionType) => {
      if (!value) return;

      field.onChange({
        [filterData.propertyName]: { [value?.toString()]: '' },
      });
    };

    const onValueChange = (newValue: ValueType) => {
      field.onChange({
        [filterData.propertyName]: { [filterData.operator]: newValue },
      });
    };

    // constants
    const currentProperty = properties[filterData.propertyName];
    const ValueEditorComponent = c.PropertyValueEditor[currentProperty?.type || 'string'];
    let enumValues: string[] | undefined;

    if (currentProperty?.type === 'string') {
      enumValues = currentProperty?.jsonSchema?.enum;
    }

    return (
      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th colSpan={2}> </th>
            <th></th>
            <th colSpan={1}> </th>
            <th> </th>
            <th colSpan={1}> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Flex display="flex" width={40} alignItems="center" justifyContent="center">
                {badge && <Badge>{badge.toUpperCase()}</Badge>}
              </Flex>
            </td>
            <td>
              <Spacer size="s" />
            </td>
            <td>
              <S.Select
                isMulti={false}
                options={propertiesList}
                value={getOptionFromValue(filterData.propertyName, propertiesList)}
                color={error?.message === c.ERROR_MESSAGES.MISSING_PROPERTY ? 'danger' : 'primary'}
                onChange={(a) => a && isSingleValue(a) && onPropertyChange(a)}
                size="m"
              />
            </td>
            <td>
              <Spacer size="xs" />
            </td>
            <td>
              <S.Select
                value={getOptionFromValue(filterData.operator, c.operatorOptions)}
                onChange={(a) => a && isSingleValue(a) && onOperatorChange(a)}
                color={error?.message === c.ERROR_MESSAGES.MISSING_OPERATOR ? 'danger' : 'primary'}
                options={c.operatorOptions}
                size="xl"
              />
            </td>
            <td>
              <Spacer size="xs" />
            </td>
            <td>
              <S.ValueEditorContainer>
                {ValueEditorComponent ? (
                  <ValueEditorComponent
                    color={error?.message === c.ERROR_MESSAGES.MISSING_VALUE ? 'danger' : 'primary'}
                    value={filterData.value}
                    enumValues={enumValues}
                    setValue={(e) => onValueChange(e)}
                  />
                ) : (
                  <Input style={{ opacity: 0 }} />
                )}
              </S.ValueEditorContainer>
            </td>
            <td>
              <Spacer size="xs" />
            </td>
            <td>
              <Button color="danger" onClick={removeCondition}>
                <IconTrash size="m" />
              </Button>
            </td>
          </tr>
          <tr>
            <td colSpan={2} />
            <td>
              {error?.message === c.ERROR_MESSAGES.MISSING_PROPERTY && (
                <FeedbackMessage color="danger">{error?.message}</FeedbackMessage>
              )}
            </td>
            <td colSpan={1} />
            <td>
              {error?.message === c.ERROR_MESSAGES.MISSING_OPERATOR && (
                <FeedbackMessage color="danger">{error?.message}</FeedbackMessage>
              )}
            </td>
            <td colSpan={1} />
            <td>
              {error?.message === c.ERROR_MESSAGES.MISSING_VALUE && (
                <FeedbackMessage color="danger">{error?.message}</FeedbackMessage>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  },
);

ConditionBuilder.displayName = 'ConditionBuilder';
