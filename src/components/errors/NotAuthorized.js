import { Link } from 'react-router-dom';
const NotAuthorized = () => {
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='text-center fw-bold'>
                <div className='mb-2'>
                    Not Authorized.
                </div>
                <div>
                    <Link to='/login' className='text-decoration-none'>Login</Link>
                </div>
            </div>
        </div>
    );
}
export default NotAuthorized;