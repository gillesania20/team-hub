import { api } from './../api/apiSlice';
const userApiRoute = 'users';
const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query({
            query: ({userID}) => ({
                url: `${userApiRoute}/${userID}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return response.user;
            }
        }),
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
    useGetUserQuery,
    useAddUserMutation
} = userApi;