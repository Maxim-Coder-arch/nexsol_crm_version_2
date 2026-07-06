import { configureStore } from '@reduxjs/toolkit';
import { apiClient } from './client-api';
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
    reducer: {
        [apiClient.reducerPath]: apiClient.reducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiClient.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;