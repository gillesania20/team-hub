import { useState } from 'react';
import useTitle from './../../hooks/useTitle';
import RegisterForm from './RegisterForm';
import AlertMessage from './../alerts/AlertMessage';
const Register = () => {
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    useTitle('register', 'Register');
    return (
        <div>
            {(message.length > 0)?
                <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
                :''}
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
                <div className='shadow-lg py-5 px-3 rounded'>
                    <h1 className='text-primary text-center mb-3'>Register</h1>
                    <RegisterForm messageFunc={(input)=>setMessage(input)} messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>
    );
}
export default Register;