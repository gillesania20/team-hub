import { api } from './../api/apiSlice';
import { setToken } from './../auth/authSlice';
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
                }catch(err){
                    //error
                }
            }
        })
    })
});
export const {
    useLoginMutation
} = authApi;