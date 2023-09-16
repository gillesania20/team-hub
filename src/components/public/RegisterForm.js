import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from './../../features/users/userApiSlice';
const RegisterForm = () => {
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [register, {isLoading}] = useAddUserMutation();
    const navigate = useNavigate();
    const maxDate = new Date().toISOString().split("T")[0];
    let response = null;
    const handleOnChange = (e) => {
        if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'bday'){
            setBirthday(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }else if(e.target.name === 'rpass'){
            setRetypePassword(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(username.length <= 0 || birthday.length <= 0 || password.length <= 0 || retypePassword.length <= 0){
            setMessage('please fill up all required fields');
            setMessageColor('text-danger');
        }else if(password !== retypePassword){
            setMessage('please make sure the password is the same with retype-password');
            setMessageColor('text-danger');
        }else{
            response = await register({username, password, birthday});
            if(typeof response?.error?.data?.message === 'string'){
                setMessage(response.error.data.message);
                setMessageColor('text-danger');
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'user created'){
                setMessage(response.data.message);
                setMessageColor('text-success');
                setUsername('');
                setPassword('');
                setRetypePassword('');
                navigate('/login');
            }else{
                setMessage('unknown error');
                setMessageColor('text-danger');
            }
        }
        return null;
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit} className='form-min-width'>
                {(message.length > 0)?<div className={`message-max-width text-center text-uppercase ${messageColor}`}
                    >{message}</div>:''}
                <div>
                    <label htmlFor='uname' className='form-label cursor-pointer'>Username: </label>
                    <input type="text" name='uname' value={username} onChange={handleOnChange} id='uname' className='form-control'
                        autoComplete='off' />
                </div>
                <div>
                    <label htmlFor='bday' className='form-labe cursor-pointer'>Birthday:</label>
                    <input type="date" name='bday' value={birthday} onChange={handleOnChange} min="1900-01-01" max={maxDate} 
                        id='bday' className='form-control' />
                </div>
                <div>
                    <label htmlFor='pass' className='form-label cursor-pointer'>Password: </label>
                    <input type="password" name='pass' value={password} onChange={handleOnChange} id='pass' className='form-control' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='rpass' className='form-label cursor-pointer'>Retype password: </label>
                    <input type="password" name='rpass' value={retypePassword} onChange={handleOnChange}
                        disabled={(password.length <= 0)} id='rpass' className='form-control' />
                </div>
                <div className='mb-3'>
                    <button type="submit" disabled={(isLoading === true)} className='btn btn-primary w-100'>Sign-up</button>
                </div>
                <div className='text-center'>
                    <Link to="/login" className='text-decoration-none'>Login</Link>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;