import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MEMBER, NOT_MEMBER } from './../../constants';
import { useGetCheckMembershipQuery } from './../../features/memberships/membershipApiSlice';
import { useDeleteCommentMutation } from './../../features/comments/commentApiSlice';
import {
    useAddOrUpdateCommentVoteMutation, useGetCommentVoteQuery, useDeleteCommentVoteMutation
} from './../../features/commentVotes/commentVoteApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const Comment = ({showOptions, showOptionsFunc, commentID, userID, created_at, username, commentBody, likes, dislikes}) => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetCheckMembershipQuery({userID, teamID});
    const {
        data: dataCommentVote, isLoading: isLoadingCommentVote, error: errorCommentVote
    } = useGetCommentVoteQuery({commentID});
    const [deleteComment, {isLoading: isLoadingDeleteComment}] = useDeleteCommentMutation();
    const [addOrUpdateCommentVote, {isLoading: isLoadingAddOrUpdateCommentVote}] = useAddOrUpdateCommentVoteMutation();
    const [deleteCommentVote, {isLoading: isLoadingDeleteCommentVote}] = useDeleteCommentVoteMutation();
    const navigate = useNavigate();
    let content = <></>;
    let teamRole = null;
    let commentVoteID = null;
    let buttonSection = <></>;
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
    const handleLike = async () => {
        await addOrUpdateCommentVote({teamID, commentID, vote: 1});
        return null;
    }
    const handleDislike = async () => {
        await addOrUpdateCommentVote({teamID, commentID, vote: -1});
        return null;
    }
    const handleUndoLike = async (commentVoteID) => {
        await deleteCommentVote({commentVoteID, commentID});
        return null;
    }
    const handleUndoDislike = async (commentVoteID) => {
        await deleteCommentVote({commentVoteID, commentID});
        return null;
    }
    if(isLoading === true || isLoadingCommentVote === true){
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
        if(
            (typeof dataCommentVote?.message === 'string' && dataCommentVote.message === 'comment-vote found')
            && (typeof dataCommentVote?.commentVote?.vote !== 'undefined' && dataCommentVote.commentVote.vote !== null)
        ){
            if(dataCommentVote.commentVote.vote === 1){
                commentVoteID = dataCommentVote.commentVote._id;
                buttonSection = <>
                    <button
                        type='button' onClick={()=>handleUndoLike(commentVoteID)} disabled={(isLoadingDeleteCommentVote === true)}
                    >undo like</button>
                    <button
                        type='button' onClick={handleDislike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                    >dislike</button>
                </>;
            }else if(dataCommentVote.commentVote.vote === -1){
                commentVoteID = dataCommentVote.commentVote._id;
                buttonSection = <>
                    <button
                        type='button' onClick={handleLike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                    >like</button>
                    <button
                        type='button' onClick={()=>handleUndoDislike(commentVoteID)} disabled={(isLoadingDeleteCommentVote === true)}
                    >undo dislike</button>
                </>;
            }else{
                buttonSection = <></>;
            }
        }else if(typeof dataCommentVote?.message === 'string' && dataCommentVote.message === 'comment-vote not found'){
            buttonSection = <>
                <button
                    type='button' onClick={handleLike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                >like</button>
                <button
                    type='button' onClick={handleDislike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                >dislike</button>
            </>;
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
                {buttonSection}
            </div>
        </div>;
    }else{
        if(typeof error?.data?.message === 'string'){
            content = <ErrorWithMessage message={error.data.message} />;
        }else if(typeof errorCommentVote?.data?.message === 'string'){
            content = <ErrorWithMessage message={errorCommentVote.data.message} />;
        }else{
            content = <DefaultError />;
        }
    }
    return content;
}
export default Comment;