import { configureStore } from '@reduxjs/toolkit';
import { api } from './../features/api/apiSlice';
import authSlice from './../features/auth/authSlice';
const reducer = {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer
}
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});
export default store;