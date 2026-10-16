import dateFormat from 'date-fns/format';
import lowerCase from 'lodash/lowerCase';
import startCase from 'lodash/startCase';
import slugifyLib from 'slugify';
import { v4 as uuidv4 } from 'uuid';

/**
 * This helper will replace all params in the url
 * for example:
 * replaceUrlParameters('/customer/:refClient', { refClient: '12345' })
 * will return '/customer/12345'
 */
export const replaceUrlParameters = (url: string, params: { [key: string]: string }) => {
  let replacedUrl = url;

  Object.keys(params).forEach((paramName) => {
    replacedUrl = replacedUrl.replace(`:${paramName}`, params[paramName]);
  });

  return replacedUrl;
};

export const generateId = () => uuidv4();

export const pluralize = <C>(text = '', items: Array<C> = []) =>
  `${text}${items?.length > 1 ? 's' : ''}`;

export const ellipsisMiddle = (str = '') => {
  if (str.length > 20) {
    return `${str.substr(0, 20)}...${str.substr(str.length - 10, str.length)}`;
  }
  return str;
};

export const openUrlNewWindow = (url: string) => window.open(url, '_blank');

export const slugify = (value = '') =>
  slugifyLib(value, { lower: true, trim: true, remove: /[:|']/gi });

export const formatDate = (date: Date | string, format = '') => {
  try {
    const dateInstance = new Date(date);
    if (dateInstance.toString() === 'Invalid Date') {
      return undefined;
    }
    return dateFormat(dateInstance, format);
  } catch (ex) {
    return undefined;
  }
};

export const encodeFilter = <C>(param: C) => encodeURIComponent(JSON.stringify(param));

/**
 * This helper will add an "/" if there is not at the end of the string
 * for example:
 * addSlashIfNotPresent('http://google.com')
 * will return 'http://google.com/'
 * and
 * addSlashIfNotPresent('http://google.com/')
 * will return 'http://google.com/'
 */
export const addSlashIfNotPresent = (str = '') => {
  const hasSlashAtTheEnds = (str || '').endsWith('/');

  return hasSlashAtTheEnds ? str : `${str}/`;
};

interface DownloadCsvFileProps {
  data: (string | number)[][];
  filename: string;
  headers: string[];
  timestamp?: string;
}

export const downloadCsvFile = (props: DownloadCsvFileProps) => {
  const {
    data,
    filename,
    headers,
    timestamp = (new Date().toISOString()).split('T')[0],
  } = props;

  if (
    !data
    || !headers
  ) {
    throw new Error('Missing params to download the file.');
  }

  const csvContent = [
      headers,
      ...data,
    ]
    .map(row => row.join(','))
    .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');

    tempLink.href = url;
    tempLink.download = filename || `${timestamp}_exported-csv-file.csv`;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    URL.revokeObjectURL(url);
};

export const titleCase = (str: string) => startCase(lowerCase(str));

export * from './array';
export * from './date';
