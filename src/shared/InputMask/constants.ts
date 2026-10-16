import { IMask } from 'react-imask';

export const DateBlocks = {
  d: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2,
  },
  m: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2,
  },
  y: {
    mask: IMask.MaskedRange,
    from: 1900,
    to: 9999,
  },
  H: {
    mask: IMask.MaskedRange,
    from: 0,
    to: 23,
    maxLength: 2,
  },
  M: {
    mask: IMask.MaskedRange,
    from: 0,
    to: 59,
    maxLength: 2,
  },
} as const;

export const MaskInputClassName = 'mask-input';
