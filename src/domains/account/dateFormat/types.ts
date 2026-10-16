import { DATE_FORMATS } from './constants';

export type DateFormatType = typeof DATE_FORMATS[number];

export type DateCountry = DateFormatType['country'];

export type GetBeginAndEndDatesProps = {
  daysFromToday?: number,
  begin?: Date | string,
  end?: Date | string,
};
