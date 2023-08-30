import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    acceptsCookies: null,
    token: null
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAcceptsCookies: (state, action) => {
            state.acceptsCookies = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = null;
        }
    }
});
export default authSlice;
export const {
    setAcceptsCookies,
    setToken,
    resetToken
} = authSlice.actions;
export const selectAcceptsCookies = (state) => state.auth.acceptsCookies;
export const selectToken = (state) => state.auth.token;