import { BASE_URL } from './../../constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setUserID } from './../auth/authSlice';
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(typeof token === 'string' && token.length > 0){
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include'//to manage cookies when using fetch()
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    let refreshResult = null;
    if(typeof result?.error?.data?.message === 'string'){
        if(
            result.error.data.message === 'jwt expired'
            || result.error.data.message === 'not authorized'
        ){
            refreshResult = await baseQuery({
                url: '/auth/refresh',
                method: 'POST'
            }, api, extraOptions);
            if(
                typeof refreshResult?.data?.message === 'string'
                && refreshResult.data.message === 'refresh successful'
            ){
                api.dispatch(setToken(refreshResult.data.accessToken));
                api.dispatch(setUserID(refreshResult.data.userID));
                result = await baseQuery(args, api, extraOptions);
            }
        }
    }
    return result;
}
const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    //refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Posts', 'Comments', 'PostVote', 'CommentVote'],
    endpoints: (builder) => ({})
});

export {
    api
}