import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { MEMBER, NOT_MEMBER } from './../../constants';
import { useGetCheckMembershipQuery } from './../../features/memberships/membershipApiSlice';
import { useDeletePostMutation } from './../../features/posts/postApiSlice';
import {
    useAddOrUpdatePostVoteMutation, useGetPostVoteQuery, useDeletePostVoteMutation
} from './../../features/postVotes/postVoteApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpReg, faThumbsDown as faThumbsDownReg } from '@fortawesome/free-regular-svg-icons';
const Post = ({showOptions, showOptionsFunc, postID, userID, created_at, username, postBody, likes, dislikes}) => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetCheckMembershipQuery({userID, teamID});
    const { data: dataPostVote, isLoading: isLoadingPostVote, error: errorPostVote } = useGetPostVoteQuery({postID});
    const [deletePost, {isLoading: isLoadingDeletePost}] = useDeletePostMutation();
    const [addOrUpdatePostVote, {isLoading: isLoadingAddOrUpdatePostVote}] = useAddOrUpdatePostVoteMutation();
    const [deletePostVote, {isLoading: isLoadingDeletePostVote}] = useDeletePostVoteMutation();
    const navigate = useNavigate();
    let content = <></>;
    let teamRole = null;
    let teamRoleColor = '';
    let postVoteID = null;
    let buttonSection = <></>;
    let dateArray = null;
    let date = null;
    const handleOptions = () =>{
        if(showOptions === postID){
            showOptionsFunc('');
        }else{
            showOptionsFunc(postID);
        }
        return null;
    }
    const handleEdit = () => {
        navigate(`/dash/posts/edit-post/${teamID}/${postID}`);
        return null;
    }
    const handleDelete = async () => {
        await deletePost({postID});
        return null;
    }
    const handleLike = async () => {
        await addOrUpdatePostVote({teamID, postID, vote: 1});
        return null;
    }
    const handleDislike = async () => {
        await addOrUpdatePostVote({teamID, postID, vote: -1});
        return null;
    }
    const handleUndoLike = async (postVoteID) => {
        await deletePostVote({postVoteID, postID});
        return null;
    }
    const handleUndoDislike = async (postVoteID) => {
        await deletePostVote({postVoteID, postID});
        return null;
    }
    if(isLoading === true || isLoadingPostVote === true){
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
            (typeof dataPostVote?.message === 'string' && dataPostVote.message === 'post-vote found')
            && (typeof dataPostVote?.postVote?.vote !== 'undefined' && dataPostVote.postVote.vote !== null)
        ){
            if(dataPostVote.postVote.vote === 1){
                postVoteID = dataPostVote.postVote._id;
                buttonSection = <div className='btn-group w-100'>
                    <button
                        type='button' title='Unlike Post' onClick={()=>handleUndoLike(postVoteID)}
                        disabled={(isLoadingDeletePostVote === true)} className='btn btn-light btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsUp} /></button>
                    <button
                        type='button' title='Dislike Post' onClick={handleDislike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                        className='btn btn-light btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsDownReg} /></button>
                </div>;
            }else if(dataPostVote.postVote.vote === -1){
                postVoteID = dataPostVote.postVote._id;
                buttonSection = <div className='btn-group w-100'>
                    <button
                        type='button' title='Like Post' onClick={handleLike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                        className='btn btn-light btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsUpReg} /></button>
                    <button
                        type='button' title='Undislike Post' onClick={()=>handleUndoDislike(postVoteID)}
                        disabled={(isLoadingDeletePostVote === true)} className='btn btn-light btn-lg text-primary'
                    ><FontAwesomeIcon icon={faThumbsDown} /></button>
                </div>;
            }else{
                buttonSection = <></>;
            }
        }else if(typeof dataPostVote?.message === 'string' && dataPostVote.message === 'post-vote not found'){
            buttonSection = <div className='btn-group w-100'>
                <button
                    type='button' title='Like Post' onClick={handleLike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                    className='btn btn-light btn-lg text-primary'
                ><FontAwesomeIcon icon={faThumbsUpReg} /></button>
                <button
                    type='button' title='Dislike Post' onClick={handleDislike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                    className='btn btn-light btn-lg text-primary'
                ><FontAwesomeIcon icon={faThumbsDownReg} /></button>
            </div>;
        }
        content = <div>
            <div hidden={(clientID !== userID)}>
                <div className='text-end'>
                    <div>
                        <button type='button' title='Post Options' onClick={handleOptions} className='btn btn-light
                            btn-sm text-primary'>...</button>
                    </div>
                    <div hidden={(showOptions !== postID)}>
                        <div>
                            <button type='button' title='Edit Post' onClick={handleEdit} className='btn btn-light
                                btn-sm text-primary'><FontAwesomeIcon icon={faPen} /></button>
                        </div>
                        <div>
                            <button
                                type='button' title='Delete Post' onClick={handleDelete} disabled={(isLoadingDeletePost === true)}
                                className='btn btn-light btn-sm text-primary'><FontAwesomeIcon icon={faTrash} /></button>
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
                    {postBody}
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
        }else if(typeof errorPostVote?.data?.message === 'string'){
            content = <ErrorWithMessage message={errorPostVote.data.message} />;
        }else{
            content = <DefaultError />;
        }
    }
    return content;
}
export default Post;