import { DevTool } from '@hookform/devtools';
import { memo, useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { routes } from '@/libs/router/constants';

import { useToggle } from '@/hooks';

import { EBonusType, useGetBonus } from '@/domains/casino/bonus';
import { useAppFiatCurrency } from '@/domains/currency';
import { useTabStateNew } from '@/shared/Tabs';

import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { IconCash, IconLoader } from '@/shared/Icons';

import { Page } from '@/components/Page';

import { AmountCard } from './AmountCard';
import { AutoBonusSettings } from './AutoBonusSettings';
import { BonusReloadChooseDate } from './BonusReloadChooseDate';
import { ChooseBonusType } from './ChooseBonusType';
import { initialFormDataFromBonus } from './adapter';
import { useHandleSubmit } from './hooks';
import * as c from './constants';
import * as t from './types';
import { getBonusCode } from './logic.helper';
import { BonusAssignationsModal } from './BonusAssignationsModal';

export const Bonus = memo(() => {
  const { userFiatCurrency } = useAppFiatCurrency();
  const { bonusId = EBonusType.NEW } = useParams();
  const tabProps = useTabStateNew(c.Tabs.SAME_AMOUNT_FOR_ALL);
  const [showModal, toggleModal] = useToggle();

  const isNewBonus = bonusId === EBonusType.NEW;

  const formData = useForm<t.BonusForm>({
    defaultValues: {
      bonusType: EBonusType.FIXE,
      reloadIntervalUnity: 'h',
      fiat: userFiatCurrency,
    },
  });

  const {
    isError,
    isLoading,
  } = useGetBonus(bonusId, {
    enabled: !isNewBonus,
    onSuccess: (resBonus) => {
      // if there is rank overrides we set the tab AMOUNT_PER_RANK by default
      if (resBonus?.parameters?.rankOverrides) {
        tabProps?.onSelect(c.Tabs.AMOUNT_PER_RANK);
      }

      // Bonus data is ingested here to avoid unnecessary re-renders.
      initialFormDataFromBonus(formData, resBonus);
    },
  });

  // Prefill the “code” input in case is a new bonus
  useEffect(() => {
    if (isNewBonus) {
      formData.setValue('code', getBonusCode());
    }
  }, [isNewBonus]);

  const { control, formState, handleSubmit, } = formData;
  const bonusType = useWatch({
    name: 'bonusType',
    control,
  });

  const handleFormSubmit = handleSubmit(useHandleSubmit(tabProps.selectedTabId === c.Tabs.SAME_AMOUNT_FOR_ALL));

  const render = () => {
    if (isLoading) {
      return (
        <Card loadingOverlay>
            <p>Loading...</p>
        </Card>
      );
    }

    if (isError) {
      return (
        <Card>
          <p>Error loading the bonus detail. Please try refreshing the page.</p>
        </Card>
      );
    }

    return (
      <form id="bonus-details-form" onSubmit={handleFormSubmit}>
        <Flex flexDirection="column" gap={24}>
          <ChooseBonusType />

          {bonusType === EBonusType.RELOAD && (
            <BonusReloadChooseDate />
          )}

          {bonusType === EBonusType.AUTO ? (
            <AutoBonusSettings />
          ) : (
            <Card title="Amount">
              {bonusType && <AmountCard key={bonusType} bonusType={bonusType} {...tabProps} />}
            </Card>
          )}

          <Flex gap={16}>
            <Button
              color="primary"
              disabled={formState.isSubmitting}
              form="bonus-details-form"
              type="submit"
            >
              Save Bonus

              {(formState.isSubmitting) ? (
                <IconLoader color="currentColor" style={{ marginLeft: 8 }} />
              ) : null}
            </Button>
          </Flex>
        </Flex>
      </form>
    );
  };

  const displayModal = bonusId && !isNewBonus && showModal;

  return (
    <FormProvider {...formData}>
      <DevTool control={control} />

      {(displayModal) ? (
        <BonusAssignationsModal
          bonusId={bonusId}
          onClose={toggleModal}
        />
      ) : null}

      <Page
        breadcrumbs={[
          { content: 'Bonuses', link: routes.BONUSES },
          { content: (bonusId === EBonusType.NEW) ? 'New' : bonusId },
        ]}
        headTitle="Bonus Detail"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <h1>
            Bonus Detail
          </h1>

          {(!isNewBonus) ? (
            <Flex alignItems="center" gap={16}>
                <Button
                  type="button"
                  color="secondary"
                  leftIcon={IconCash}
                  onClick={toggleModal}
                >
                  View Usages
                </Button>
            </Flex>
          ) : null}
        </Flex>

        {render()}
      </Page>
    </FormProvider>
  );
});
