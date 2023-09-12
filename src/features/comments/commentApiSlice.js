import { api } from './../api/apiSlice';
const commentApiRoute = 'comments';
const commentApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllComments: build.query({
            query: ({postID}) => ({
                url: `${commentApiRoute}/get-all-comments/${postID}`,
                method: 'GET'
            }),
            providesTags: (result) => {
                let output = null;
                if(typeof result?.comments !== 'undefined' && result.comments !== null){
                    output = [
                        ...result.comments.map(({_id}) =>
                            ({type: 'Comments', id: _id})),
                        {type: 'Comments', id: 'LIST'}
                    ];
                }else{
                    output = [{type: 'Comments', id: 'LIST'}];
                }
                return output;
            }
        }),
        getComment: build.query({
            query: ({commentID}) => ({
                url: `${commentApiRoute}/${commentID}`,
                method: 'GET'
            })
        }),
        addComment: build.mutation({
            query: ({teamID, postID, body}) => ({
                url: `${commentApiRoute}`,
                method: 'POST',
                body: {
                    teamID,
                    postID,
                    body
                }
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}]
        }),
        updateComment: build.mutation({
            query: ({commentID, body}) => ({
                url: `${commentApiRoute}/${commentID}`,
                method: 'PATCH',
                body: {
                    body
                }
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}]
        }),
        deleteComment: build.mutation({
            query: ({commentID}) => ({
                url: `${commentApiRoute}/${commentID}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{type: 'Comments', id: 'LIST'}]
        })
    })
});
export const {
    useGetAllCommentsQuery,
    useGetCommentQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentApi;