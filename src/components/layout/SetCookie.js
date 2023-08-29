import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAcceptsCookies } from './../../features/auth/authSlice';
import { useSetCookieMutation } from './../../features/cookieChecker/cookieCheckerApiSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const SetCookie = () => {
    const acceptsCookies = useSelector(selectAcceptsCookies);
    const [setCookie, {isLoading, data, error}] = useSetCookieMutation();
    let content = null;
    useEffect(() => {
        if(acceptsCookies === false){
            setCookie()
        }
    }, [setCookie, acceptsCookies]);
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(
        acceptsCookies === true
        || (typeof data?.message === 'string' && data.message === 'cookie created')
    ){
        content = <Outlet />;
    }else{
        content = <DefaultError />
    }
    return content;
}
export default SetCookie;