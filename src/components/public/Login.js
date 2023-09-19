import useTitle from './../../hooks/useTitle';
import LoginForm from './LoginForm';
const Login = () => {
    useTitle('login', 'Login');
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='shadow-lg py-5 px-3 rounded'>
                <h1 className='text-primary text-center mb-3'>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}
export default Login;