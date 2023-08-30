import { api } from './../api/apiSlice';
const userApiRoute = 'users';
const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        addUser: build.mutation({
            query: ({username, password, birthday}) => ({
                url: `${userApiRoute}`,
                method: 'POST',
                body: {
                    username,
                    password,
                    birthday
                }
            })
        })
    })
});
export const {
    useAddUserMutation
} = userApi;