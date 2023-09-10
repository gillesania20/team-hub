import { useGetAllPostsQuery } from './../../features/posts/postApiSlice';
import ShowComments from './ShowComments';
import Loader from './../loader/Loader';
import Post from './Post';
const ShowPosts = () => {
    const { data, isLoading, error } = useGetAllPostsQuery({teamID: '64e477536326c138028e673c'});
    let content = <></>;
    let listOfPosts = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(
        (typeof data?.message === 'string' && data.message === 'posts found')
        && (typeof data.posts !== 'undefined' && data.posts !== null)
    ){
        listOfPosts = data.posts.map((post) => {
            return <div key={post._id}>
                <Post
                    userID={post.user._id}
                    created_at={post.created_at}
                    username={post.user.username}
                    postBody={post.body}
                    likes={post.likes}
                    dislikes={post.dislikes}
                />
                <ShowComments postID={post._id} />
            </div>;
        });
        content = <div>
            {listOfPosts}
        </div>;
    }
    return content;
}
export default ShowPosts;