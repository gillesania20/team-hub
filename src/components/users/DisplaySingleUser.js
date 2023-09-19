import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const DisplaySingleUser = () => {
    const clientID = useSelector(selectUserID);
    const { userID } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userID})
    let date = null;
    let dateArray = null;
    let birthday = null;
    let content = <></>;
    useTitle('user-info', 'User Info');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        date = new Date(data.birthday);
        dateArray = date.toDateString().split(" ");
        birthday = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        content = <div>
            <h1>User Info</h1>
            <div>
                <label>Username: </label>
                <span>{data.username}</span>
            </div>
            <div>
                <label>Status: </label>
                <span>{(data.active === true)?'Active':'Not Active'}</span>
            </div>
            <div>
                <label>Birthday: </label>
                <span>{birthday}</span>
            </div>
            <div hidden={(clientID !== userID)}>
                <Link to={`/dash/users/edit-user/${userID}`}>Edit User</Link>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplaySingleUser;