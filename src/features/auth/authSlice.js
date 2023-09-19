import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    acceptsCookies: null,
    token: null,
    userID: null,
    currentPage: '',
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
        },
        setUserID: (state, action) => {
            state.userID = action.payload;
        },
        resetUserID: (state) => {
            state.userID = null;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});
export default authSlice;
export const {
    setAcceptsCookies,
    setToken,
    resetToken,
    setUserID,
    resetUserID,
    setCurrentPage
} = authSlice.actions;
export const selectAcceptsCookies = (state) => state.auth.acceptsCookies;
export const selectToken = (state) => state.auth.token;
export const selectUserID = (state) => state.auth.userID;
export const selectCurrentPage = (state) => state.auth.currentPage;