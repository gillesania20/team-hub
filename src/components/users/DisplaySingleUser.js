import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetUserQuery } from './../../features/users/userApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const DisplaySingleUser = () => {
    const clientID = useSelector(selectUserID);
    const { userID } = useParams();
    const { data, isLoading, error } = useGetUserQuery({userID});
    const navigate = useNavigate();
    let date = null;
    let dateArray = null;
    let birthday = null;
    let content = <></>;
    useTitle('user-info', 'User Info');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        if(error.data.message === 'jwt expired'){
            navigate('/login');
        }else{
            content = <ErrorWithMessage message={error.data.message} />;
        }
    }else if(typeof data !== 'undefined'){
        date = new Date(data.birthday);
        dateArray = date.toDateString().split(" ");
        birthday = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        content = <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='width-when-400-screen'>
                <h1 className='text-center text-primary fw-bold mb-3'>User Info</h1>
                <div className='form-min-width'>
                    <div className='row mb-2'>
                        <span className='col fw-bold text-primary'>Username: </span>
                        <span className='col text-break'>{data.username}</span>
                    </div>
                    <div className='row mb-2'>
                        <span className='col fw-bold text-primary'>Status: </span>
                        <span className='col text-break'>{(data.active === true)?'Active':'Not Active'}</span>
                    </div>
                    <div className='row mb-3'>
                        <span className='col fw-bold text-primary'>Birthday: </span>
                        <span className='col text-break'>{birthday}</span>
                    </div>
                    <div hidden={(clientID !== userID)} className='row'>
                        <Link to={`/dash/users/edit-user/${userID}`} className='btn btn-outline-primary'>Edit User</Link>
                    </div>
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplaySingleUser;