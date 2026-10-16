import { CryptosFiatRatesHistory, useFormatPrice } from '@/domains/currency';
import { formatDate } from '@/utils';

export const useFormatRatesToOptions = (rates: CryptosFiatRatesHistory = []) => {
  const formatPrice = useFormatPrice();

  return rates.map((rate) => {
    const label = `${formatPrice({ amount: rate?.rate, currency: rate?.coinIso })} | ${formatDate(
      new Date(Number(rate?.timestamp)),
      'dd/MM/yyyy HH:mm',
    )}`;

    const value = rate.rate;

    return {
      label,
      value,
    };
  });
};
