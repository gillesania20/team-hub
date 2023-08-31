import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAcceptsCookies } from './../../features/auth/authSlice';
import { useCheckCookieMutation } from './../../features/cookieChecker/cookieCheckerApiSlice';
import Loader from './../loader/Loader';
const AppLayout = () => {
    const acceptsCookies = useSelector(selectAcceptsCookies);
    const [checkCookie, {isLoading}] = useCheckCookieMutation();
    let content = <></>;
    useEffect(() => {
        checkCookie();
    }, [checkCookie]);
    if(isLoading === true){
        content = <Loader />;
    }else{
        content = (
            <div>
                {
                    (acceptsCookies === false)?
                        <div>Please allow 3rd-party cookies to login properly. This app uses 3rd party cookies for authentication.</div>
                        :''
                    }
                <Outlet />
            </div>
        );
    }
    return content;
}
export default AppLayout;