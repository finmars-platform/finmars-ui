export interface FmUploadFile {
  id: string;
  file: File | null;
  progress: number;
}

export interface FmDialogOptions {
  dialogTitle?: string;
  dialogContent?: string;
}

export interface FmTaskObject {
  status: string;
  progress_object?: {
    current: number;
    description: string;
    percent: number;
    total: number;
  };
  attachments?: [
    {
      file_report: number;
    }
  ];
}

export interface FmFileUploadProps extends FmDialogOptions {
  type?: 'simple' | 'task';
  variant?: 'normal' | 'large';
  taskObject?: FmTaskObject | null;
  indeterminate?: boolean;
  multiple?: boolean;
  label?: string;
  icon?: string;
}
