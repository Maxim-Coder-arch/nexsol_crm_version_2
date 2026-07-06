import { ModalType, ToastState, UiState } from '@/types/slices/uiState.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UiState = {
    isModalOpen: false,
    modalType: null,
    modalProps: {},
    isLoading: false,
    toast: {
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        actions: [],
        duration: 3000,
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ type: ModalType; props?: Record<string, any> }>) => {
            state.isModalOpen = true;
            state.modalType = action.payload.type;
            state.modalProps = action.payload.props || {};
        },

        closeModal: (state) => {
            state.isModalOpen = false;
            state.modalType = null;
            state.modalProps = {};
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        showToast: (state, action: PayloadAction<Omit<ToastState, 'isOpen'>>) => {
            state.toast.isOpen = true;
            state.toast.type = action.payload.type;
            state.toast.title = action.payload.title || '';
            state.toast.message = action.payload.message;
            state.toast.actions = action.payload.actions || [];
            state.toast.duration = action.payload.duration ?? 3000;
        },

        hideToast: (state) => {
            state.toast.isOpen = false;
            state.toast.actions = [];
        },

        clearToast: (state) => {
            state.toast = initialState.toast;
        },
    },
});

export const {
    openModal,
    closeModal,
    setLoading,
    showToast,
    hideToast,
    clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;