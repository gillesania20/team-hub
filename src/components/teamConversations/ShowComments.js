import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllCommentsQuery } from './../../features/comments/commentApiSlice';
import Loader from './../loader/smallLoader/Loader';
import Comment from './Comment';
import ErrorWithMessage from './../errors/smallErrors/ErrorWithMessage';
import DefaultError from './../errors/smallErrors/DefaultError';
const ShowComments = ({postID}) => {
    const [showOptions, setShowOptions] = useState('');
    const { data, isLoading, error } = useGetAllCommentsQuery({postID});
    const navigate = useNavigate();
    let content = <></>;
    let listOfComments = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        if(error.data.message === 'jwt expired'){
            navigate('/login');
        }else{
            content = <ErrorWithMessage message={error.data.message} />;
        }
    }else if(
        (typeof data?.message === 'string' && data.message === 'comments found')
        && (typeof data?.comments !== 'undefined' && data.comments !== null)
    ){
        listOfComments = data.comments.map((comment) => {
            return <div key={comment._id}>
                <Comment
                    showOptions={showOptions}
                    showOptionsFunc={(comment_id)=>setShowOptions(comment_id)}
                    commentID={comment._id}
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
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default ShowComments;