import { api } from './../api/apiSlice';
const commentVoteApiRoute = 'comment_votes';
const commentVoteApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCommentVote: build.query({
            query: ({commentID}) => ({
                url: `${commentVoteApiRoute}/${commentID}`,
                method: 'GET'
            }),
            providesTags: [{type: 'CommentVote', id: 'LIST'}]
        }),
        addOrUpdateCommentVote: build.mutation({
            query: ({teamID, commentID, vote}) => ({
                url: `${commentVoteApiRoute}`,
                method: 'POST',
                body: {
                    teamID,
                    commentID,
                    vote
                }
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}, {type: 'CommentVote', id: 'LIST'}]
        }),
        deleteCommentVote: build.mutation({
            query: ({commentVoteID, commentID}) => ({
                url: `${commentVoteApiRoute}/${commentVoteID}`,
                method: 'DELETE',
                body: {
                    commentID
                }
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}, {type: 'CommentVote', id: 'LIST'}]
        })
    })
});
export const {
    useGetCommentVoteQuery,
    useAddOrUpdateCommentVoteMutation,
    useDeleteCommentVoteMutation
} = commentVoteApi;