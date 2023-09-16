import { api } from './../api/apiSlice';
import { setToken, setUserID, resetToken, resetUserID } from './../auth/authSlice';
const authApiRoute = 'auth';
const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: ({username, password}) => ({
                url: `${authApiRoute}/login`,
                method: 'POST',
                body: {
                    username,
                    password
                }
            })
        }),
        refresh: build.mutation({
            query: () => ({
                url: `${authApiRoute}/refresh`,
                method: 'POST'
            }),
            async onQueryStarted(
                args,
                {dispatch, queryFulfilled}
            ){
                try{
                    const {data} = await queryFulfilled;
                    if(typeof data?.accessToken !== 'undefined'){
                        dispatch(setToken(data.accessToken));
                    }
                    if(typeof data?.userID === 'string'){
                        dispatch(setUserID(data.userID));
                    }
                }catch(err){
                    //error
                }
            }
        }),
        logout: build.mutation({
            query: () => ({
                url: `${authApiRoute}/logout`,
                method: 'POST'
            }),
            async onQueryStarted(
                args,
                {dispatch, queryFulfilled}
            ){
                try{
                    await queryFulfilled;
                    dispatch(resetToken());
                    dispatch(resetUserID());
                }catch(err){
                    //error
                }
            }
        })
    })
});
export const {
    useLoginMutation,
    useRefreshMutation,
    useLogoutMutation
} = authApi;