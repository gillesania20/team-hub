import { Outlet } from 'react-router-dom';
const AppLayout = () => {
    return (
        <div>
            <div>Please allow 3rd-party cookies to login properly. This app uses 3rd party cookies for authentication.</div>
            <Outlet />
        </div>
    );
}
export default AppLayout;