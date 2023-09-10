import { api } from './../api/apiSlice';
const postApiRoute = 'posts';
const postApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllPosts: build.query({
            query: ({teamID}) => ({
                url: `${postApiRoute}/get-all-posts/${teamID}`,
                method: 'GET'
            }),
            providesTags: (result) => {
                let output = null;
                if(typeof result?.posts !== 'undefined' && result.posts !== null){
                    output = [
                        ...result.posts.map(({_id}) =>
                            ({type: 'Posts', id: _id})),
                        {type: 'Posts', id: 'LIST'}
                    ];
                }else{
                    output = [{type: 'Posts', id: 'LIST'}];
                }
                return output;
            }
        }),
        addPost: build.mutation({
            query: ({teamID, body}) => ({
                url: `${postApiRoute}`,
                method: 'POST',
                body: {
                    teamID,
                    body
                }
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}]
        })
    })
});
export const {
    useGetAllPostsQuery,
    useAddPostMutation
} = postApi;