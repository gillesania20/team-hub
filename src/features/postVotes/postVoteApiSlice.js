import { api } from './../api/apiSlice';
const postVoteApiRoute = 'post_votes';
const postVoteApi = api.injectEndpoints({
    endpoints: (build) => ({
        getPostVote: build.query({
            query: ({postID}) => ({
                url: `${postVoteApiRoute}/${postID}`,
                method: 'GET'
            }),
            providesTags: [{type: 'PostVote', id: 'LIST'}]
        }),
        addOrUpdatePostVote: build.mutation({
            query: ({teamID, postID, vote}) => ({
                url: `${postVoteApiRoute}`,
                method: 'POST',
                body: {
                    teamID,
                    postID,
                    vote
                }
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}, {type: 'PostVote', id: 'LIST'}]
        }),
        deletePostVote: build.mutation({
            query: ({postVoteID, postID}) => ({
                url: `${postVoteApiRoute}/${postVoteID}`,
                method: 'DELETE',
                body: {
                    postID
                }
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}, {type: 'PostVote', id: 'LIST'}]
        })
    })
});
export const {
    useGetPostVoteQuery,
    useAddOrUpdatePostVoteMutation,
    useDeletePostVoteMutation
} = postVoteApi;