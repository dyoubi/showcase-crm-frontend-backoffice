import { convertHexColorToRgba } from '.';

const cases: [string, number, string][] = [
  ['#ffffff', 0.25, 'rgba(255, 255, 255, 0.25)'],
  ['#fff', 0.35, 'rgba(255, 255, 255, 0.35)'],
  ['#00AA99', 0.25, 'rgba(0, 170, 153, 0.25)'],
  ['#00AA99', 0, 'rgba(0, 170, 153, 0)'],
  ['#DAEEEC', 1, 'rgba(218, 238, 236, 1)'],
];

describe('test color.convertHexColorToRgba', () => {
  test.each(cases)('given %p as arguments, returns %p', (color, alpha, expectedResult) => {
    const result = convertHexColorToRgba(color, alpha);
    expect(result).toEqual(expectedResult);
  });
});
