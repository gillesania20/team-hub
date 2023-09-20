import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useRefreshMutation } from './../../features/auth/authApiSlice';
const LoginForm = ({messageFunc, messageColorFunc}) => {
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
            messageFunc('please fill up all required fields');
            messageColorFunc('alert-danger');
        }else{
            response = await login({username, password});
            if(typeof response?.error?.data?.message === 'string'){
                messageFunc(response.error.data.message);
                messageColorFunc('alert-danger');
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'successful login'){
                responseForRefresh = await refresh();
                if(typeof responseForRefresh?.error?.data?.message === 'string'){
                    messageFunc(responseForRefresh.error.data.message);
                    messageColorFunc('alert-danger');
                }else if(
                    typeof responseForRefresh?.data?.message === 'string'
                    && responseForRefresh.data.message === 'refresh successful'
                ){
                    messageFunc(response.data.message);
                    messageColorFunc('alert-success');
                    setUsername('');
                    setPassword('');
                    navigate('/dash/teams/search-team');
                }else{
                    messageFunc('unknown error');
                    messageColorFunc('alert-danger');
                }
            }else{
                messageFunc('unknown error');
                messageColorFunc('alert-danger');
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='form-min-width'>
            <div>
                <label htmlFor='uname' className='form-label text-secondary cursor-pointer'>Username: </label>
                <input type="text" name="uname" value={username} onChange={handleOnChange} id='uname' className='form-control'
                    autoComplete='off' />
            </div>
            <div className='mb-3'>
                <label htmlFor='pass' className='form-label text-secondary cursor-pointer'>Password: </label>
                <input type="password" name="pass" value={password} onChange={handleOnChange}
                    id='pass' className='form-control' />
            </div>
            <div className='mb-3'>
                <button type="submit" disabled={(isLoading === true || isLoadingRefresh === true)}
                    className='btn btn-primary w-100'>Sign-in</button>
            </div>
            <div className='text-center'>
                <Link to="/register" className='text-decoration-none'>Register</Link>
            </div>
        </form>
    );
}
export default LoginForm;