import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MEMBER, NOT_MEMBER } from './../../constants';
import { useGetCheckMembershipQuery } from './../../features/memberships/membershipApiSlice';
import { useDeleteCommentMutation } from './../../features/comments/commentApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const Comment = ({showOptions, showOptionsFunc, commentID, userID, created_at, username, commentBody, likes, dislikes}) => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetCheckMembershipQuery({userID, teamID});
    const [deleteComment, {isLoading: isLoadingDeleteComment}] = useDeleteCommentMutation();
    const navigate = useNavigate();
    let content = <></>;
    let teamRole = null;
    const handleOptions = () => {
        if(showOptions === commentID){
            showOptionsFunc('');
        }else{
            showOptionsFunc(commentID);
        }
        return null;
    }
    const handleEdit = () => {
        navigate(`/dash/comments/edit-comment/${teamID}/${commentID}`);
        return null;
    }
    const handleDelete = async () => {
        await deleteComment({commentID});
        return null;
    }
    if(isLoading === true){
        content = <Loader />;
    }else if(
        (typeof data?.message === 'string' && data.message === 'membership found')
        ||(typeof error?.data?.message === 'string' && error.data.message === 'membership not found')
    ){
        if(typeof data?.message === 'string' && data.message === 'membership found'){
            teamRole = MEMBER;
        }else if(typeof error?.data?.message === 'string' && error.data.message === 'membership not found'){
            teamRole = NOT_MEMBER;
        }
        content = <div>
            <div hidden={(clientID !== userID)}>
                <div>
                    <button type='button' onClick={handleOptions}>...</button>
                </div>
                <div hidden={(showOptions !== commentID)}>
                    <div>
                        <button type='button' onClick={handleEdit}>Edit</button>
                    </div>
                    <div>
                        <button
                            type='button' onClick={handleDelete} disabled={(isLoadingDeleteComment === true)}
                        >Delete</button>
                    </div>
                </div>
            </div>
            <div>
                <span>{username}</span><span>{teamRole}</span>
                <span>{created_at}</span>
            </div>
            <div>
                {commentBody}
            </div>
            <div>
                <span>
                    <span>likes: </span><span>{likes}</span>
                </span>
                <span>
                    <span>dislikes: </span><span>{dislikes}</span>
                </span>
            </div>
            <div>
                <button type='button'>like</button>
                <button type='button'>dislike</button>
            </div>
        </div>;
    }else{
        if(typeof error?.data?.message === 'string'){
            content = <ErrorWithMessage message={error.data.message} />;
        }else{
            content = <DefaultError />;
        }
    }
    return content;
}
export default Comment;