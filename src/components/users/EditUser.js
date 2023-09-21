import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import EditUserForm from './EditUserForm';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import NotAuthorized from './../errors/NotAuthorized';
import AlertMessage from './../alerts/AlertMessage';
const EditUser = () => {
    const clientID = useSelector(selectUserID);
    const { userID } = useParams();
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const { data, isLoading, error } = useGetUserQuery({userID});
    let content = <></>;
    useTitle('edit-user', 'Edit User');
    if(isLoading === true){
        content = <Loader />;
    }else if(clientID !== userID){
        content = <NotAuthorized />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        content = <div>
            {(message.length > 0)?
                <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
                :''}
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='text-center text-primary fw-bold mb-3'>Edit User</h1>
                    <EditUserForm userData={data} messageFunc={(input)=>setMessage(input)}
                        messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditUser;