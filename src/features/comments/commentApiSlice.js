import { api } from './../api/apiSlice';
const commentApiRoute = 'comments';
const commentApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllComments: build.query({
            query: ({postID}) => ({
                url: `${commentApiRoute}/get-all-comments/${postID}`,
                method: 'GET'
            })
        })
    })
});
export const {
    useGetAllCommentsQuery
} = commentApi;