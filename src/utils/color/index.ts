/**
 * Taken from https://github.com/Chris-Baker/Emotion-RGBA
 */

interface RGB {
  red: number;
  green: number;
  blue: number;
}

// compile this once
const nonHexChars = /[^#a-f\d]/gi;

/**
 * Convert a hex color to an RGB object. Shorthand hex (#fff) or expanded hex (#ffffff) are supported.
 * from https://github.com/Chris-Baker/Emotion-RGBA
 */
export function hexRgb(colorHex: string): RGB {
  let hex = colorHex;
  // sanitise our inputs
  if (
    !hex ||
    !(hex.length === 4 || hex.length === 7) || // Cheap check for length
    hex[0] !== '#' || // Cheap check for correct first char
    nonHexChars.test(hex) // More expensive check for any non hex chars
  ) {
    throw new Error('Expected a valid hex string');
  }

  // remove the # from the start of the string
  hex = hex.substring(1);

  // if we have a shorthand hex then expand it
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // convert into our rbg values
  const num = parseInt(hex, 16);
  // eslint-disable-next-line no-bitwise
  const red = num >> 16;
  // eslint-disable-next-line no-bitwise
  const green = (num >> 8) & 255;
  // eslint-disable-next-line no-bitwise
  const blue = num & 255;

  return { red, green, blue };
}

/**
 * Convert a hex or named color and alpha into an rgba string directly usable in CSS.
 * For example: rgba('red', 1) -> 'rgba(255, 0, 0, 1)'
 *
 * @param {string} color the color to convert, this can be a hex value or a known HTML color string
 * @param {number} alpha the opacity of the color in the range 0 to 1 with 0.5 being 50%
 * @return {string} an rgba string of the form 'rgba(255, 255, 255, 1)'
 * @throws {Error} will throw an error if color is not a valid hex or named color
 *
 * from https://github.com/Chris-Baker/Emotion-RGBA
 */
export function convertHexColorToRgba(color: string, alpha: number): string {
  // 1. match the color to either and known color string or a hex value
  // look at first character to see if it is a #. If not then we need to look up the hex value
  const hexColor = color;

  // 2. make sure our opacity is in a sensible range 0 to 1
  if (alpha < 0 || alpha > 1) {
    throw new Error(`Invalid opacity '${alpha}'. Opacity should be in the range 0 to 1`);
  }

  // 3. convert our hex value to rgb
  try {
    const rgb: RGB = hexRgb(hexColor);
    return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`;
  } catch (e) {
    throw new Error(
      `Invalid color '${hexColor}'. Color should be a valid hexadecimal value, for example '#FFFFFF'`,
    );
  }
}

export function rgbLuminance({ red, green, blue }: RGB): number {
  const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

  return luminance;
}
