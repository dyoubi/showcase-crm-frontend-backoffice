import { getBeginAndEndDates } from '@/domains/account/dateFormat';
import { CryptoCodes, ECryptoCodes } from '@/domains/currency';

export const DEFAULT_RESULTS_PER_PAGE = { label: 25, value: 25 };

export const RESULTS_PER_PAGE_OPTIONS = [
  DEFAULT_RESULTS_PER_PAGE, {
  label: 50,
  value: 50,
}, {
  label: 100,
  value: 100,
}, {
  label: 'All',
  value: null,
}];

export const DEFAULT_SELECTION = -7;
const { begin, end } = getBeginAndEndDates({ daysFromToday: DEFAULT_SELECTION });

export const DEFAULT_FILTER = {
  coin: ECryptoCodes.BTC as CryptoCodes,
  begin: begin.toISOString(),
  end: end.toISOString(),

  // TODO @USER-ACTIVITY: This will be improved when the user-activity service is ready
  // TODO @USER-ACTIVITY: Fix base amount of returned results
  // limit: DEFAULT_RESULTS_PER_PAGE.value,
  // offset: 0,

  grouped: true,
};
