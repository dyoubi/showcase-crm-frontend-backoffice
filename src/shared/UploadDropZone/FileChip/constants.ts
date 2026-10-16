import { FileError } from 'react-dropzone';

export const CLASSNAMES = {
  ICON_STATUS: 'ICON_STATUS',
  ICON_REMOVE: 'ICON_REMOVE',
} as const;

export const ERRORS_MAPPER: Record<FileError['code'], string> = {
  'file-too-large': 'File is too large',
  'file-too-small': 'File is too smal',
  'too-many-files': 'Too many files',
  'file-invalid-type': 'Invalid file type',
  unknown: "Impossible to import file",
};
