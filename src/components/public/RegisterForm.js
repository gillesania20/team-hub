import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddUserMutation } from './../../features/users/userApiSlice';
const RegisterForm = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [register, {isLoading}] = useAddUserMutation();
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
        }else if(password !== retypePassword){
            setMessage('please make sure the password is the same with retype-password');
        }else{
            response = await register({username, password, birthday});
            if(typeof response?.error?.data?.message === 'string'){
                setMessage(response.error.data.message);
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'user created'){
                setMessage(response.data.message);
                setUsername('');
                setPassword('');
                setRetypePassword('');
            }else{
                setMessage('unknown error');
            }
        }
        return null;
    }
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                {(message.length > 0)?<div>{message}</div>:''}
                <div>
                    <label>Username: </label>
                    <input type="text" name='uname' value={username} onChange={handleOnChange} />
                </div>
                <div>
                    <label>Birthday:</label>
                    <input type="date" name='bday' value={birthday} onChange={handleOnChange} min="1900-01-01" max={maxDate} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name='pass' value={password} onChange={handleOnChange} />
                </div>
                <div>
                    <label>Retype password: </label>
                    <input type="password" name='rpass' value={retypePassword} onChange={handleOnChange}
                        disabled={(password.length <= 0)} />
                </div>
                <div>
                    <button type="submit" disabled={(isLoading === true)}>Sign-up</button>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;