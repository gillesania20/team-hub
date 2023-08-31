import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from './../../features/auth/authApiSlice';
import Loader from './../loader/Loader';
import LoginFirst from './../errors/LoginFirst';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import NotAuthorized from './../errors/NotAuthorized';
const VerifyUser = () => {
    const [refresh, {isLoading, data, error}] = useRefreshMutation();
    let content = <></>;
    useEffect(() => {
        refresh();
    }, [refresh]);
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        if(error.data.message === 'no refreshToken cookie'){
            content = <LoginFirst />;
        }else if(error.data.message === 'user not found'){
            content = <NotAuthorized />;
        }else{
            content = <ErrorWithMessage message={error.data.message} />;
        }
    }else if(typeof data?.message === 'string' && data.message === 'refresh successful'){
        content = <Outlet />;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default VerifyUser;