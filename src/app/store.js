import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
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
setupListeners(store.dispatch);// a utility used to enable 'refetchOnFocus' and 'refetchOnReconnect' behaviors
export default store;