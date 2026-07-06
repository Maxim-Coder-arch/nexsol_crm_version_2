import { createSlice } from "@reduxjs/toolkit";

export type ModalType = 'profile' | 'settings' | 'confirm' | null;
interface UiState {
    isModalOpen: boolean;
    modalType: ModalType;
    modalProps: Record<string, any>;
    isLoading: boolean;
    toast: {
        message: string;
        type: 'success' | 'error' | 'info' | null;
    };
}

const initialState: UiState = {
    isModalOpen: false,
    modalType: null,
    modalProps: {},
    isLoading: false,
    toast: {
        message: "",
        type: null
    },
};

const uiSLice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isModalOpen = true;
            state.modalType = action.payload.type;
            state.modalProps = action.payload.props || {};
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.modalType = null;
            state.modalProps = {};
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});



export const {
    openModal,
    closeModal,
    setLoading
} = uiSLice.actions;

export default uiSLice.reducer;