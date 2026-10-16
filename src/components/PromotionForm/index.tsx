import { memo } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { GetPromotionResponse } from '@/domains/casino/promotion';
import { Spacer } from '@/shared/Spacer';

import { Button } from '@/shared/Button';
import { Tabs, useTabState } from '@/shared/Tabs';
import { Input } from '@/shared/Input';
import { Card } from '@/shared/Card';
import { IconEdit } from '@/shared/Icons';

import { getInputProps, getControlledInputProps } from '@/libs/react-hook-form/utils';
import { DatePickerRHF } from '../RHF/DatePicker';
import { GroupInputs } from '../GroupInputs';

import { Body } from './Body';
import { getFormDefaultValues } from './adapter';
import { useCleanEndDate, useOnFormSubmit } from './hooks';
import * as t from './types';

const tabs = [
  { tabId: 'fr', title: 'FR', content: <Body lang="fr" /> },
  { tabId: 'en', title: 'EN', content: <Body lang="en" /> },
];

interface PromotionFormProps {
  isNewPromotion?: boolean;
  promotion?: GetPromotionResponse;
}

export const PromotionForm = memo(({ promotion, isNewPromotion }: PromotionFormProps) => {
  // hooks
  const [tabLang, setTabLang] = useTabState('fr');
  const formData = useForm<t.PromotionForm>({
    shouldUnregister: false,
    defaultValues: getFormDefaultValues(promotion),
  });

  const { control, handleSubmit, setValue } = formData;
  const [startDate] = useWatch({
    name: ['startDate'],
    control,
  });
  useCleanEndDate(setValue, startDate);
  const { save, isLoading } = useOnFormSubmit({ promotion });

  return (
    <FormProvider {...formData}>
      <DevTool control={control} />
      <form onSubmit={handleSubmit(save)}>
        <Card
          width="85%"
          loadingOverlay={isLoading}
          style={{ margin: '0 auto' }}
          icon={IconEdit}
          title="Editor"
          topContent={
            <>
              <Button type="button" color="primary">
                Preview
              </Button>
              <Spacer size="m" />
              <Button type="submit" color="success">
                Save
              </Button>
            </>
          }
        >
          {isNewPromotion && (
            <>
              <Input label="Name" {...getInputProps(formData, 'name')} />
              <Spacer size="m" />
            </>
          )}
          <GroupInputs>
            <DatePickerRHF label="Start date" {...getControlledInputProps(formData, 'startDate')} />
            <DatePickerRHF
              label="End date"
              {...getControlledInputProps(formData, 'endDate')}
              minDate={startDate ? new Date(startDate) : undefined}
            />
            <Input label="Slug" {...getInputProps(formData, 'slug')} />
          </GroupInputs>
          <Spacer size="l" />
          <Tabs selectedTabId={tabLang} onSelect={setTabLang} tabs={tabs} />
        </Card>
      </form>
    </FormProvider>
  );
});
