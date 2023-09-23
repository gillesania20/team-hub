import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MEMBER, NOT_MEMBER } from './../../constants';
import { useGetCheckMembershipQuery } from './../../features/memberships/membershipApiSlice';
import { useDeleteCommentMutation } from './../../features/comments/commentApiSlice';
import {
    useAddOrUpdateCommentVoteMutation, useGetCommentVoteQuery, useDeleteCommentVoteMutation
} from './../../features/commentVotes/commentVoteApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/smallLoader/Loader';
import ErrorWithMessage from './../errors/smallErrors/ErrorWithMessage';
import DefaultError from './../errors/smallErrors/DefaultError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons';
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
    let teamRoleColor = '';
    let commentVoteID = null;
    let buttonSection = <></>;
    let dateArray = null;
    let date = null;
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
        dateArray = new Date(created_at).toDateString().split(' ');
        date = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        if(typeof data?.message === 'string' && data.message === 'membership found'){
            teamRole = MEMBER;
            teamRoleColor = 'text-success';
        }else if(typeof error?.data?.message === 'string' && error.data.message === 'membership not found'){
            teamRole = NOT_MEMBER;
            teamRoleColor = 'text-danger';
        }
        if(
            (typeof dataCommentVote?.message === 'string' && dataCommentVote.message === 'comment-vote found')
            && (typeof dataCommentVote?.commentVote?.vote !== 'undefined' && dataCommentVote.commentVote.vote !== null)
        ){
            if(dataCommentVote.commentVote.vote === 1){
                commentVoteID = dataCommentVote.commentVote._id;
                buttonSection = <div className='btn-group w-100'>
                    <button
                        type='button' title='Unlike Comment' onClick={()=>handleUndoLike(commentVoteID)}
                        disabled={(isLoadingDeleteCommentVote === true)} className='btn btn-info btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <button
                        type='button' title='Dislike Comment' onClick={handleDislike}
                        disabled={(isLoadingAddOrUpdateCommentVote === true)} className='btn btn-info btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsDownReg} /></button>
                </div>;
            }else if(dataCommentVote.commentVote.vote === -1){
                commentVoteID = dataCommentVote.commentVote._id;
                buttonSection = <div className='btn-group w-100'>
                    <button
                        type='button' title='Like Comment' onClick={handleLike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                        className='btn btn-info btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsUpReg} /></button>
                    <button
                        type='button' title='Undislike Comment' onClick={()=>handleUndoDislike(commentVoteID)}
                        disabled={(isLoadingDeleteCommentVote === true)} className='btn btn-info btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsDown} /></button>
                </div>;
            }else{
                buttonSection = <></>;
            }
        }else if(typeof dataCommentVote?.message === 'string' && dataCommentVote.message === 'comment-vote not found'){
            buttonSection = <div className='btn-group w-100'>
                <button
                    type='button' title='Like Comment' onClick={handleLike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                    className='btn btn-info btn-lg text-primary'
                ><FontAwesomeIcon icon={faThumbsUpReg} /></button>
                <button
                    type='button' title='Dislike Comment' onClick={handleDislike} disabled={(isLoadingAddOrUpdateCommentVote === true)}
                    className='btn btn-info btn-lg text-primary'
                ><FontAwesomeIcon icon={faThumbsDownReg} /></button>
            </div>;
        }
        content = <div className='bg-info'>
            <div hidden={(clientID !== userID)}>
                <div className='text-end'>
                    <div>
                        <button type='button' title='Comment Options' onClick={handleOptions} className='btn btn-info btn-sm
                            text-primary'>...</button>
                    </div>
                    <div hidden={(showOptions !== commentID)}>
                        <div>
                            <button type='button' title='Edit Comment' onClick={handleEdit} className='btn btn-info btn-sm
                                text-primary'><FontAwesomeIcon icon={faPen} /></button>
                        </div>
                        <div>
                            <button
                                type='button' title='Delete Comment' onClick={handleDelete} disabled={(isLoadingDeleteComment === true)}
                                className='btn btn-info btn-sm text-primary'
                            ><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-3 px-2'>
                <div className='d-flex justify-content-between'>
                    <span>
                        <span className='me-3 fw-bold text-break'>{username}</span>
                        <span className={`${teamRoleColor}`}>{teamRole}</span>
                    </span>
                    <span className='text-secondary'>{date}</span>
                </div>
                <div className='py-3 px-1 text-break'>
                    {commentBody}
                </div>
                <div className='text-primary mb-2'>
                    <span className='me-2'>
                        <span className='me-1'><FontAwesomeIcon icon={faThumbsUp} /></span>
                        <span>{likes}</span>
                    </span>
                    <span>
                        <span className='me-1'><FontAwesomeIcon icon={faThumbsDown} /></span>
                        <span>{dislikes}</span>
                    </span>
                </div>
                <div>
                    {buttonSection}
                </div>
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