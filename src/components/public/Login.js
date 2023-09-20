import { useState } from 'react';
import useTitle from './../../hooks/useTitle';
import LoginForm from './LoginForm';
import AlertMessage from './../alerts/AlertMessage';
const Login = () => {
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    useTitle('login', 'Login');
    return (
        <div>
            {(message.length > 0)?
            <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)}/>
            :''}
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
                <div className='shadow-lg py-5 px-3 rounded'>
                    <h1 className='text-primary text-center mb-3 fw-bold'>Login</h1>
                    <LoginForm messageFunc={(input)=>setMessage(input)} messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>
    );
}
export default Login;