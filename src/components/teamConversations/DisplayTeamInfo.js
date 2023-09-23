import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTeamQuery } from './../../features/teams/teamApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/smallLoader/Loader';
import ErrorWithMessage from './../errors/smallErrors/ErrorWithMessage';
import DefaultError from './../errors/smallErrors/DefaultError';
const DisplayTeamInfo = () => {
    const { teamID } = useParams();
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetTeamQuery({teamID});
    const navigate = useNavigate();
    let content = <></>;
    let role = null;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        if(error.data.message === 'jwt expired'){
            navigate('/login');
        }else{
            content = <ErrorWithMessage message={error.data.message} />;
        }
    }else if(typeof data !== 'undefined'){
        if(typeof data?.leader?._id !== 'undefined' && data.leader._id === clientID){
            role = 'leader'
        }else{
            role = 'member'
        }
        content = <div className='mb-3 shadow py-3 px-1 rounded'>
            <div className='row'>
                <span className='col text-primary fw-bold'>team name:</span>
                <span className='col text-break'>{data.name}</span>
                <span className='col text-primary fw-bold'>role:</span>
                <span className='col text-break'>{role}</span>
            </div>
            <div className='row'>
                <span className='col text-primary fw-bold'>leader:</span>
                <span className='col text-break'>{data?.leader?.username}</span>
                <span className='col'></span>
                <span className='col'></span>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplayTeamInfo;