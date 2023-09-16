import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRefreshMutation } from './../../features/auth/authApiSlice';
const LoginForm = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, {isLoading}] = useLoginMutation();
    const [refresh, {isLoading: isLoadingRefresh}] = useRefreshMutation();
    const navigate = useNavigate();
    let response = null;
    let responseForRefresh = null;
    const handleOnChange = (e) => {
        if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(username.length <= 0 || password.length <= 0){
            setMessage('please fill up all required fields');
        }else{
            response = await login({username, password});
            if(typeof response?.error?.data?.message === 'string'){
                setMessage(response.error.data.message);
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'successful login'){
                responseForRefresh = await refresh();
                if(typeof responseForRefresh?.error?.data?.message === 'string'){
                    setMessage(responseForRefresh.error.data.message);
                }else if(
                    typeof responseForRefresh?.data?.message === 'string'
                    && responseForRefresh.data.message === 'refresh successful'
                ){
                    setMessage(responseForRefresh.data.message);
                    setUsername('');
                    setPassword('');
                    navigate('/dash/teams/search-team');
                }else{
                    setMessage('unknown error');
                }
            }else{
                setMessage('unknown error');
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div>
                <label>Username: </label>
                <input type="text" name="uname" value={username} onChange={handleOnChange} />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" name="pass" value={password} onChange={handleOnChange} />
            </div>
            <div>
                <button type="submit" disabled={(isLoading === true || isLoadingRefresh === true)}>sign-in</button>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
        </form>
    );
}
export default LoginForm;