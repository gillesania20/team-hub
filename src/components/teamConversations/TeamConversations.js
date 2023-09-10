import { useParams } from 'react-router-dom';
import { useGetMembershipQuery } from './../../features/memberships/membershipApiSlice';
import DisplayTeamInfo from './DisplayTeamInfo';
import AddPost from './AddPost';
import ShowPosts from './ShowPosts';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import NotAuthorized from './../errors/NotAuthorized';
const TeamConversations = () => {
    const { teamID } = useParams();
    const { data, isLoading, error } = useGetMembershipQuery({teamID});
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof data?.message === 'string' && data.message === 'membership found'){
        content = <div>
            <h1>Team Conversations</h1>
            <DisplayTeamInfo />
            <AddPost />
            <ShowPosts />
        </div>;
    }else{
        if(typeof error?.data?.message === 'string'){
            if(error.data.message === 'membership not found'){
                content = <NotAuthorized />;
            }else{
                content = <ErrorWithMessage message={error.data.message} />;
            }
        }else{
            content = <DefaultError />;
        }
    }
    return content;
}
export default TeamConversations;