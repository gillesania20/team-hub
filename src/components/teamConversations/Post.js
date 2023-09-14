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
const Post = ({showOptions, showOptionsFunc, postID, userID, created_at, username, postBody, likes, dislikes}) => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetCheckMembershipQuery({userID, teamID});
    const { data: dataPostVote, isLoading: isLoadingPostVote, error: errorPostVote, refetch } = useGetPostVoteQuery({postID});
    const [deletePost, {isLoading: isLoadingDeletePost}] = useDeletePostMutation();
    const [addOrUpdatePostVote, {isLoading: isLoadingAddOrUpdatePostVote}] = useAddOrUpdatePostVoteMutation();
    const [deletePostVote, {isLoading: isLoadingDeletePostVote}] = useDeletePostVoteMutation();
    const navigate = useNavigate();
    let content = <></>;
    let teamRole = null;
    let postVoteID = null;
    let buttonSection = <></>;
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
        refetch();
        return null;
    }
    const handleDislike = async () => {
        await addOrUpdatePostVote({teamID, postID, vote: -1});
        refetch();
        return null;
    }
    const handleUndoLike = async (postVoteID) => {
        await deletePostVote({postVoteID, postID});
        await refetch();
        return null;
    }
    const handleUndoDislike = async (postVoteID) => {
        await deletePostVote({postVoteID, postID});
        refetch();
        return null;
    }
    if(isLoading === true || isLoadingPostVote){
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
            (typeof dataPostVote?.message === 'string' && dataPostVote.message === 'post-vote found')
            && (typeof dataPostVote?.postVote?.vote !== 'undefined' && dataPostVote.postVote.vote !== null)
        ){
            if(dataPostVote.postVote.vote === 1){
                postVoteID = dataPostVote.postVote._id;
                buttonSection = <>
                    <button
                        type='button' onClick={()=>handleUndoLike(postVoteID)} disabled={(isLoadingDeletePostVote === true)}
                    >undo like</button>
                    <button
                        type='button' onClick={handleDislike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                    >dislike</button>
                </>;
            }else if(dataPostVote.postVote.vote === -1){
                postVoteID = dataPostVote.postVote._id;
                buttonSection = <>
                    <button
                        type='button' onClick={handleLike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                    >like</button>
                    <button
                        type='button' onClick={()=>handleUndoDislike(postVoteID)} disabled={(isLoadingDeletePostVote === true)}
                    >undo dislike</button>
                </>;
            }else{
                buttonSection = <></>;
            }
        }else if(typeof dataPostVote?.message === 'string' && dataPostVote.message === 'post-vote not found'){
            buttonSection = <>
                <button
                    type='button' onClick={handleLike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                >like</button>
                <button
                    type='button' onClick={handleDislike} disabled={(isLoadingAddOrUpdatePostVote === true)}
                >dislike</button>
            </>;
        }
        content = <div>
            <div hidden={(clientID !== userID)}>
                <div>
                    <button type='button' onClick={handleOptions}>...</button>
                </div>
                <div hidden={(showOptions !== postID)}>
                    <div>
                        <button type='button' onClick={handleEdit}>Edit</button>
                    </div>
                    <div>
                        <button
                            type='button' onClick={handleDelete} disabled={(isLoadingDeletePost === true)}
                        >Delete</button>
                    </div>
                </div>
            </div>
            <div>
                <span>
                    <span>{username}</span><span>{teamRole}</span>
                </span>
                <span>{created_at}</span>
            </div>
            <div>
                {postBody}
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
        }else if(typeof errorPostVote?.data?.message === 'string'){
            content = <ErrorWithMessage message={errorPostVote.data.message} />;
        }else{
            content = <DefaultError />;
        }
    }
    return content;
}
export default Post;