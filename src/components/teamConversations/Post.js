import { useParams } from 'react-router-dom';
import { MEMBER, NOT_MEMBER } from './../../constants';
import { useGetCheckMembershipQuery } from './../../features/memberships/membershipApiSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const Post = ({userID, created_at, username, postBody, likes, dislikes}) => {
    const { teamID } = useParams();
    const { data, isLoading, error } = useGetCheckMembershipQuery({userID, teamID});
    let content = <></>;
    let teamRole = null;
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
                <button type='button'>like</button>
                <button type='button'>dislike</button>
                <button type='button'>comment</button>
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
export default Post;