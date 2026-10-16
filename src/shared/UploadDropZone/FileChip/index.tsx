import { FileError } from 'react-dropzone';

import { ellipsisMiddle } from '@/utils';
import { Tooltip } from '../../Tooltip';
import { Spacer } from '../../Spacer';
import { IconCircleCheck, IconLoader, IconTrash } from '../../Icons';

import { FileStatus } from '../types';
import * as S from './styles';
import * as c from './constants';

export interface FileChipProps {
  variant: FileStatus;
  isLoading?: boolean;
  fileName?: string;
  onRemove?: () => void;
  errors?: FileError[];
  className?: string;
}

const statusIconProps = {
  className: c.CLASSNAMES.ICON_STATUS,
  color: 'currentColor',
  size: 14,
} as const;

export const FileChip = ({
  variant,
  fileName = '',
  errors,
  onRemove,
  isLoading,
  className,
}: FileChipProps) => {
  const isSuccess = variant === 'success';

  const errorMessage = errors?.map(({ code, message }) => (
    <div key={code}>{c.ERRORS_MAPPER[code] || message || c.ERRORS_MAPPER.unknown}</div>
  ));

  let icon = <IconCircleCheck {...statusIconProps} />;

  if (!isSuccess) {
    icon = <IconTrash {...statusIconProps} />;
  }

  if (isLoading) {
    icon = <IconLoader {...statusIconProps} />;
  }

  return (
    <Tooltip message={<div>{errorMessage}</div>} placement="top">
      <S.Container variant={variant} className={className}>
        <S.FileName>{ellipsisMiddle(fileName)}</S.FileName>
        <Spacer size="xxs" />
        {icon}
        <IconTrash className={c.CLASSNAMES.ICON_REMOVE} size={14} onClick={onRemove} />
      </S.Container>
    </Tooltip>
  );
};
