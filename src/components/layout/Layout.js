import { Outlet } from 'react-router-dom';
import HeaderSection from './HeaderSection';
import FooterSection from './FooterSection';
const Layout = () => {
    return (
        <div>
            <HeaderSection />
            <Outlet />
            <FooterSection />
        </div>
    );
}
export default Layout;