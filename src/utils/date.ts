import formatDate from 'date-fns/format';
import parseDate from 'date-fns/parse';

export const convertDateToString = (date: Date, format: string): string => {
  try {
    return formatDate(date, format);
  } catch (ex) {
    return '';
  }
};

export const convertStringToDate = (dateString: string, format: string): Date =>
  parseDate(dateString, format, new Date());
