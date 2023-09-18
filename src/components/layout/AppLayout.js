import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAcceptsCookies } from './../../features/auth/authSlice';
import { useGetCookieQuery } from './../../features/cookieChecker/cookieCheckerApiSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const AppLayout = () => {
    const acceptsCookies = useSelector(selectAcceptsCookies);
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
        content = (
            <div>
                {
                    (acceptsCookies === false)?
                        <div
                            className='bg-danger text-light px-2 py-5 fw-bold text-center'
                        >Please allow 3rd-party cookies to login properly. This app uses 3rd party cookies for authentication.</div>
                        :''
                }
                <Outlet />
            </div>
        );
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default AppLayout;