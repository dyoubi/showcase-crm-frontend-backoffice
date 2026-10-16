import { routes } from '@/libs/router/constants';

import { useAppDateFormat } from '@/hooks';
import { useFormatPrice } from '@/domains/currency';

import {
  EPaymentMandateType,
  GetPaymentMandateDetailResponse,
} from '@/domains/finance/payments';

import { LinkButton } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';
import { Stack, StackItem } from '@/shared/Stack';

import { CryptoIcon } from '@/components/CryptoIcon';

import { replaceUrlParameters, titleCase } from '@/utils';

interface PaymentMandateDetailHeaderProps {
  mandate: GetPaymentMandateDetailResponse['mandate'];
  demand?: GetPaymentMandateDetailResponse['demand'];
}

export const PaymentMandateDetailData = (props: PaymentMandateDetailHeaderProps) => {
  const {
    demand,
    mandate,
  } = props;

  const { formatDate } = useAppDateFormat();
  const formatPrice = useFormatPrice()

  const render = () => {
    if (
      demand
      && mandate.type === EPaymentMandateType.WITHDRAWAL
    ) {
      return (
        <>
          <StackItem
            label="Demand Submission Date"
            value={formatDate(demand.date, { displayFullDate: true })}
          />

          <StackItem
            label="Demand Status"
            value={titleCase(demand.status)}
          />

          <tr style={{ border: 0 }}>
            <td>
              <LinkButton
                color="secondary"
                href={replaceUrlParameters(routes.WITHDRAWAL_DETAIL, { demandId: demand.id })}
              >
                See Demand
              </LinkButton>
            </td>
          </tr>
        </>
      );
    }

    return null;
  };

  return (
    <>
      {(mandate.error) ? (
        <>
          <Card status="danger">
            {mandate.error}
          </Card>
          <Spacer size="m" />
        </>
      ) : null}

      <Stack>
        <StackItem
          label="Date"
          value={formatDate(mandate.date)}
        />

        <StackItem
          label="Amount"
          value={(
            <Flex alignItems="center" gap={8}>
              <CryptoIcon
                code={mandate.currency}
                size="l"
              />

              {formatPrice({
                  amount: mandate.amount,
                  currency: mandate.currency,
                  maximumFractionDigits: mandate.amount.split('.')?.[1].length,
                  withoutUnit: true,
                })}
            </Flex>
          )}
        />

        <StackItem
          label="Address"
          value={<pre style={{ margin: 0 }}>{mandate.address}</pre>}
        />

        <StackItem
          label="Type"
          value={titleCase(mandate.type)}
        />

        {render()}
      </Stack>
    </>
  );
};
