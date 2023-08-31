import { useParams, Link } from 'react-router-dom';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const DisplaySingleUser = () => {
    const { userID } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userID})
    let date = null;
    let dateArray = null;
    let birthday = null;
    let content = <></>;
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
            <div>
                <Link to={`/dash/users/edit-user/${userID}`}>Edit User</Link>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplaySingleUser;