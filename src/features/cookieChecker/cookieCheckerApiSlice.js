import { api } from './../api/apiSlice';
import { setAcceptsCookies } from './../auth/authSlice';
const cookieCheckerApiRoute = "cookie_checker";
const cookieCheckerApi = api.injectEndpoints({
    endpoints: (build) => ({
        checkCookie: build.mutation({
            query: () => ({
                url: `${cookieCheckerApiRoute}`,
                method: 'GET'
            }),
            async onQueryStarted(
                args,
                {dispatch, queryFulfilled}
            ){
                try{
                    const {data} = await queryFulfilled;
                    if(typeof data?.message === 'string' && data.message === 'cookie found'){
                        dispatch(setAcceptsCookies(true));
                    }
                }catch(err){
                    if(typeof err?.error?.data?.message === 'string' && err.error.data.message === 'cookie not found'){
                        dispatch(setAcceptsCookies(false));
                    }
                }
            }
        }),
        setCookie: build.mutation({
            query: () => ({
                url: `${cookieCheckerApiRoute}`,
                method: 'POST'
            })
        })
    })
});
export const {
    useCheckCookieMutation,
    useSetCookieMutation
} =  cookieCheckerApi;