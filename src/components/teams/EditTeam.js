import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetTeamQuery } from './../../features/teams/teamApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import EditTeamForm from './EditTeamForm';
import Loader from './../loader/Loader';
import NotAuthorized from './../errors/NotAuthorized';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const EditTeam = () => {
    const clientID = useSelector(selectUserID);
    const { teamID } = useParams();
    const { data, isLoading, error } = useGetTeamQuery({teamID});
    let content = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        if(data.leader._id !== clientID){
            content = <NotAuthorized />;
        }else{
            content = <div>
                <h1>Edit Team</h1>
                <EditTeamForm teamData={data} />
            </div>;
        }
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditTeam;