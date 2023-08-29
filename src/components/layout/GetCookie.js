import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useCheckCookieMutation } from './../../features/cookieChecker/cookieCheckerApiSlice';
import Loader from './../loader/Loader';
import DefaultError from './../errors/DefaultError';
const GetCookie = () => {
    const [checkCookie, {isLoading, data, error}] = useCheckCookieMutation();
    let content = <></>;
    useEffect(() => {
        checkCookie()
    }, [checkCookie]);
    if(isLoading === true){
        content = <Loader />;
    }else if(
        (typeof error?.data?.message !== 'undefined' && error.data.message === 'cookie not found')
        || (typeof data?.message !== 'undefined' && data.message === 'cookie found')
    ){
        content = <Outlet />;
    }else{
        content = <DefaultError />
    }
    return content;
}
export default GetCookie;