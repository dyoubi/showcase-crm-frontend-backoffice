import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { SelectCurrencyToAdd, useCurrencyState } from '@/components/SelectCurrency';

import * as S from './styles';
import * as t from './types';

const createPayload = (selectCurrency: string) => {
  return {
    name: selectCurrency,
    iso: selectCurrency,
    fiat: false,
    activate: false,
  };
};

export const AddNewCurrencyForm = ({
  onFormSubmitted,
}: {
  onFormSubmitted: (payload: t.Payload) => void;
}) => {
  const stateCurrency = useCurrencyState();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCurrency = stateCurrency.currency;
    onFormSubmitted(createPayload(selectedCurrency));
  };

  return (
    <S.Form onSubmit={handleFormSubmit}>
      <Flex flexDirection="row" alignItems="flex-end" justifyContent="center">
        <SelectCurrencyToAdd {...stateCurrency} />
        <Spacer />
        <Button type="submit">Add currency</Button>
      </Flex>
    </S.Form>
  );
};
