import { Outlet } from 'react-router-dom';
import { useGetCookieQuery } from './../../features/cookieChecker/cookieCheckerApiSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const GetCookie = () => {
    const { data, isLoading, error } = useGetCookieQuery();
    let content = <></>;
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(
        (typeof data?.message === 'string')
        && (data.message === 'cookie found' || data.message === 'cookie not found')
    ){
        content = <Outlet />;
    }else{
        console.log('test')
        content = <DefaultError />
    }
    return content;
}
export default GetCookie;