import { Link } from 'react-router-dom';
const NotAuthorized = () => {
    return (
        <div className='py-5 d-flex justify-content-center'>
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