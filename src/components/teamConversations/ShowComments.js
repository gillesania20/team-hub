import { useGetAllCommentsQuery } from './../../features/comments/commentApiSlice';
import Loader from './../loader/Loader';
import Comment from './Comment';
const ShowComments = ({postID}) => {
    const { data, isLoading, error } = useGetAllCommentsQuery({postID});
    let content = <></>;
    let listOfComments = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(
        (typeof data?.message === 'string' && data.message === 'comments found')
        && (typeof data?.comments !== 'undefined' && data.comments !== null)
    ){
        listOfComments = data.comments.map((comment) => {
            return <div key={comment._id}>
                <Comment
                    userID={comment.user._id}
                    created_at={comment.created_at}
                    username={comment.user.username}
                    commentBody={comment.body}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                />
            </div>;
        });
        content = <div>
            {listOfComments}
        </div>;
    }
    return content;
}
export default ShowComments;