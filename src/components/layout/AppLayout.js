import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectAcceptsCookies } from './../../features/auth/authSlice';
const AppLayout = () => {
    const acceptsCookies = useSelector(selectAcceptsCookies);
    return (
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
export default AppLayout;