export type ToastType = 'INFO' | 'SUCCESS' | 'ERROR';

export interface Toast {
  message: string;
  type: ToastType;
}
