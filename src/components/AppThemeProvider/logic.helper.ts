import * as t from './types';
import * as c from './constants';

const STORAGE_KEY = 'appThemeMode';

export const saveThemeMode = (mode: t.Mode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    console.error(e);
  }
};

export const getDefaultThemeMode = (): t.Mode => {
  try {
    const storedMode = localStorage.getItem(STORAGE_KEY) as t.Mode;

    if (!c.themes[storedMode]) {
      return 'dark';
    }
    return storedMode;
  } catch (e) {
    console.error(e);
    return 'dark';
  }
};
