import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetTeamQuery } from './../../features/teams/teamApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import EditTeamForm from './EditTeamForm';
import Loader from './../loader/Loader';
import NotAuthorized from './../errors/NotAuthorized';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import AlertMessage from './../alerts/AlertMessage';
const EditTeam = () => {
    const clientID = useSelector(selectUserID);
    const { teamID } = useParams();
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const { data, isLoading, error } = useGetTeamQuery({teamID});
    let content = null;
    useTitle('edit-team', 'Edit Team');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        if(data.leader._id !== clientID){
            content = <NotAuthorized />;
        }else{
            content = <div>
                {(message.length > 0)?
                    <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
                    :''}
                <div className='vh-100 d-flex justify-content-center align-items-center'>
                    <div>
                        <h1 className='text-center text-primary fw-bold mb-3'>Edit Team</h1>
                        <EditTeamForm teamData={data} messageFunc={(input)=>setMessage(input)}
                            messageColorFunc={(input)=>setMessageColor(input)} />
                    </div>
                </div>
            </div>;
        }
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditTeam;