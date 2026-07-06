export type ModalType = 'profile' | 'settings' | 'confirm' | null;

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface ToastAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'danger' | 'success';
}

export interface ToastState {
    isOpen: boolean;
    type: ToastType;
    title?: string;
    message: string;
    actions?: ToastAction[];
    duration?: number;
}

export interface UiState {
    isModalOpen: boolean;
    modalType: ModalType;
    modalProps: Record<string, any>;
    isLoading: boolean;
    toast: ToastState;
}