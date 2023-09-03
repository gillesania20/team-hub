import { Link } from 'react-router-dom';
const NotAuthorized = () => {
    return (
        <div>
            <div>
                Not Authorized.
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
export default NotAuthorized;