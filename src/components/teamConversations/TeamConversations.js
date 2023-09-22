import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
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
    useTitle('team-conversations', 'Team Conversations');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof data?.message === 'string' && data.message === 'membership found'){
        content = <div className='page-min-height d-flex justify-content-center align-items-center'>
            <div>
                <h1 className='text-center text-primary fw-bold mt-5 mb-3'>Team Conversations</h1>
                <div className='my-list-width'>
                    <DisplayTeamInfo />
                    <AddPost />
                    <ShowPosts />
                </div>
            </div>
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