import { GroupInputs } from '@/components/GroupInputs';
import { SelectRHF } from '@/components/RHF/Select';

import { Input } from '@/shared/Input';
import { IconRotate } from '@/shared/Icons';
import { Card } from '@/shared/Card';

import { getControlledInputProps } from '@/libs/react-hook-form/utils';
import { useBonusFormContext } from '../hooks';
import { getInput } from '../logic.helper';

import * as c from './constants';

export const BonusReloadChooseDate = () => {
  const formData = useBonusFormContext();

  const { getNumberProps } = getInput(formData);
  return (
    <Card title="Date">
      <GroupInputs>
        <Input
          leftIcon={IconRotate}
          label="Bonus reload interval"
          {...getNumberProps('bonusReloadInterval')}
        />

        <SelectRHF
          label="Reload interval unity"
          options={c.intervalUnityOption}
          {...getControlledInputProps(formData, 'reloadIntervalUnity')}
        />
      </GroupInputs>
    </Card>
  );
};
