import { api } from './../api/apiSlice';
import { setAcceptsCookies } from './../auth/authSlice';
const cookieCheckerApiRoute = "cookie_checker";
const cookieCheckerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCookie: build.query({
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
                    if(typeof data?.message === 'string'){
                        if(data.message === 'cookie found'){
                            dispatch(setAcceptsCookies(true));
                        }else if(data.message === 'cookie not found'){
                            dispatch(setAcceptsCookies(false));
                        }
                    }
                }catch(err){
                    //error
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
    useGetCookieQuery,
    useSetCookieMutation
} =  cookieCheckerApi;