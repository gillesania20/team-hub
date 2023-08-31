import { Link } from 'react-router-dom';
const LoginFirst = () => {
    return (
        <div>
            <div>
                Please login first.
            </div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
        </div>
    );
}
export default LoginFirst;