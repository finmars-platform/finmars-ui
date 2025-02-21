import type { Component } from 'vue';
import type { ExtractComponentProps } from '@/types';

export type FmDialogEvent =
  | 'open'
  | 'before-close'
  | 'close'
  | 'confirm'
  | 'cancel'
  | 'click-overlay';

export interface FmDialogProps {
  id?: string;
  teleport?: string;
  title?: string;
  width?: string | number;
  draggable?: boolean;
  cssClass?: string[];
  cssStyle?: Record<string, string>;
  contentCssClass?: string[];
  contentCssStyle?: Record<string, string>;
  confirmButton?: boolean;
  cancelButton?: boolean;
  onClose?: () => void;
  onConfirm?: (data: unknown) => void;
  onCancel?: (data: unknown) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: 'primary' | 'secondary' | 'tertiary';
  cancelButtonType?: 'primary' | 'secondary' | 'tertiary';
  closeOnClickOverlay?: boolean;
  closeOnEsc?: boolean;
}

export interface FmDialogComponentProps<T extends Component> {
  component: T;
  componentProps?: ExtractComponentProps<T>;
  dialogProps?: FmDialogProps;
}

export interface FmDialogComponentEmits {
  (event: 'open', value?: unknown): void;
  (event: 'before-close', value?: unknown): void;
  (event: 'close', value?: unknown): void;
  (event: 'confirm', value?: unknown): void;
  (event: 'cancel', value?: unknown): void;
  (event: 'click-overlay', value?: unknown): void;
}
