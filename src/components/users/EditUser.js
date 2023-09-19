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
const EditUser = () => {
    const clientID = useSelector(selectUserID);
    const { userID } = useParams();
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
            <h1>Edit User</h1>
            <EditUserForm userData={data} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditUser;