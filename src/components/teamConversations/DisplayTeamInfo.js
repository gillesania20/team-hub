import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetTeamQuery } from './../../features/teams/teamApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const DisplayTeamInfo = () => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetTeamQuery({teamID});
    let content = <></>;
    let role = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        if(typeof data?.leader?._id !== 'undefined' && data.leader._id === clientID){
            role = 'leader'
        }else{
            role = 'member'
        }
        content = <div>
            <div>
                <span>team name: {data.name}</span>
                <span>role: {role}</span>
            </div>
            <div>
                <span>leader: {data?.leader?.username}</span>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplayTeamInfo;