import { FileRejection } from 'react-dropzone';

export type FileStatus = 'success' | 'primary' | 'danger';

interface FileRejected extends FileRejection {
  id: string;
}

export type FilesAccepted = Array<{
  id: string;
  isLoading?: boolean;
  status: FileStatus;
  file: File;
}>;

export type FilesRejected = Array<FileRejected>;
