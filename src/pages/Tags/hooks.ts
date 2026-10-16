/* eslint-disable no-bitwise */
export const useTagColor = (tag: string) => {
  const hashValue: number = tag
    .split('')
    .reduce((hash, character) => (hash << 5) - hash + character.charCodeAt(0), 0);

  const colorCode = `#${(hashValue & 0xffffff).toString(16).padStart(6, '0')}`;

  return colorCode;
};
