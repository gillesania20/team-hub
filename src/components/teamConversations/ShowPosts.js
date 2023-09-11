import { useParams } from 'react-router-dom';
import { useGetAllPostsQuery } from './../../features/posts/postApiSlice';
import ShowComments from './ShowComments';
import AddComment from './AddComment';
import Loader from './../loader/Loader';
import Post from './Post';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const ShowPosts = () => {
    const { teamID } = useParams();
    const { data, isLoading, error } = useGetAllPostsQuery({teamID});
    let content = <></>;
    let listOfPosts = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
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
                <AddComment postID={post._id}/>
            </div>;
        });
        content = <div>
            {listOfPosts}
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default ShowPosts;