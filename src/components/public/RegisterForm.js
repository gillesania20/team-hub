import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddUserMutation } from './../../features/users/userApiSlice';
const RegisterForm = ({messageFunc, messageColorFunc}) => {
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
            messageFunc('please fill up all required fields');
            messageColorFunc('alert-danger');
        }else if(password !== retypePassword){
            messageFunc('please make sure the password is the same with retype-password');
            messageColorFunc('alert-danger');
        }else{
            response = await register({username, password, birthday});
            if(typeof response?.error?.data?.message === 'string'){
                messageFunc(response.error.data.message);
                messageColorFunc('alert-danger');
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'user created'){
                messageFunc(response.data.message);
                messageColorFunc('alert-success');
                setUsername('');
                setBirthday('');
                setPassword('');
                setRetypePassword('');
                navigate('/login');
            }else{
                messageFunc('unknown error');
                messageColorFunc('alert-danger');
            }
        }
        return null;
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit} className='form-min-width'>
                <div className='mb-2'>
                    <label htmlFor='uname' className='form-label cursor-pointer text-secondary'>Username: </label>
                    <input type="text" name='uname' value={username} onChange={handleOnChange} id='uname'
                        className='form-control border border-primary' autoComplete='off' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='bday' className='form-label cursor-pointer text-secondary'>Birthday:</label>
                    <input type="date" name='bday' value={birthday} onChange={handleOnChange} min="1900-01-01" max={maxDate} 
                        id='bday' className='form-control border border-primary' />
                </div>
                <div className='mb-2'>
                    <label htmlFor='pass' className='form-label cursor-pointer text-secondary'>Password: </label>
                    <input type="password" name='pass' value={password} onChange={handleOnChange} id='pass'
                        className='form-control border border-primary' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='rpass' className='form-label cursor-pointer text-secondary'>Retype password: </label>
                    <input type="password" name='rpass' value={retypePassword} onChange={handleOnChange}
                        disabled={(password.length <= 0)} id='rpass' className='form-control border border-primary' />
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