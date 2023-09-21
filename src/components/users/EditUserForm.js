import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from './../../features/users/userApiSlice';
const EditUserForm = ({userData, messageFunc, messageColorFunc}) => {
    const trimmedBirthday = userData.birthday.split('T')[0];
    const [birthday, setBirthday] = useState(trimmedBirthday);
    const [username, setUsername] = useState(userData.username);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [changeUsername, setChangeUsername] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [updateUser, {isLoading}] = useUpdateUserMutation();
    const navigate = useNavigate();
    const maxDate = new Date().toISOString().split('T')[0];
    const handleOnChange = (e) => {
        if(e.target.name === 'bday'){
            setBirthday(e.target.value);
        }else if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }else if(e.target.name === 'rpass'){
            setRetypePassword(e.target.value);
        }else if(e.target.name === 'changeUname'){
            setChangeUsername(!changeUsername);
        }else if(e.target.name === 'changePass'){
            setChangePassword(!changePassword);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if(changePassword === true && password.length <= 0){
            messageFunc('please fill-up the password field');
            messageColorFunc('alert-danger');
        }else if(changePassword === true && password.length > 0 && password !== retypePassword){
            messageFunc('please make sure password and retype-password are the same');
            messageColorFunc('alert-danger');
        }else{
            if(changeUsername === true && changePassword === true){
                response = await updateUser({userID: userData._id, username, password, birthday});
            }else if(changeUsername === true && changePassword === false){
                response = await updateUser({userID: userData._id, username, birthday});
            }else if(changeUsername === false && changePassword === true){
                response = await updateUser({userID: userData._id, password, birthday});
            }else{
                response = await updateUser({userID: userData._id, birthday});
            }
            if(typeof response?.error?.data?.message === 'string'){
                messageFunc(response.error.data.message);
                messageColorFunc('alert-danger');
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated user data'){
                messageFunc(response.data.message);
                messageColorFunc('alert-success');
                setBirthday('');
                setUsername('');
                setPassword('');
                setRetypePassword('');
                setChangeUsername(false);
                setChangePassword(false);
                if(changeUsername === true || changePassword === true){
                    navigate('/login');
                }else{
                    navigate(`/dash/users/display-user/${userData._id}`);
                }
            }else{
                messageFunc('unknown error');
                messageColorFunc('alert-danger');
            }
        }
        return null;
    }
    const handleCancel = () => {
        navigate(`/dash/users/display-user/${userData._id}`);
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='form-min-width'>
            <div className='mb-2'>
                <label htmlFor='bday' className='form-label text-secondary cursor-pointer'>Birthday: </label>
                <input type='date' name='bday' value={birthday} onChange={handleOnChange} min='1900-01-01' max={maxDate}
                    id='bday' className='form-control border border-primary' />
            </div>
            <div className='mb-2'>
                <div className='form-check'>
                    <input type='checkbox' name='changeUname' value={changeUsername} onChange={handleOnChange}
                        id='changeUname' className='form-check-input border border-primary' />
                    <label htmlFor='changeUname' className='form-check-label text-secondary cursor-pointer'>Change Username: </label>
                </div>
                <div hidden={(changeUsername === false)}>
                    <label htmlFor='uname' className='form-label text-secondary cursor-pointer'>Username: </label>
                    <input type='text' name='uname' value={username} onChange={handleOnChange}
                        id='uname' className='form-control border border-primary' />
                </div>
            </div>
            <div className='mb-3'>
                <div className='form-check'>
                    <input type='checkbox' name='changePass' value={changePassword} onChange={handleOnChange}
                        id='changePass' className='form-check-input border border-primary' />
                    <label htmlFor='changePass' className='form-check-label text-secondary cursor-pointer'>Change Password: </label>
                </div>
                <div hidden={(changePassword === false)}>
                    <div className='mb-2'>
                        <label htmlFor='pass' className='form-label text-secondary cursor-pointer'>Password: </label>
                        <input type='password' name='pass' value={password} onChange={handleOnChange} 
                            id='pass' className='form-control border border-primary' />
                    </div>
                    <div>
                        <label htmlFor='rpass' className='form-label text-secondary cursor-pointer'>Retype-password: </label>
                        <input type='password' name='rpass' value={retypePassword} onChange={handleOnChange}
                            disabled={(password.length <= 0)} id='rpass' className='form-control border border-primary' />
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <div className='btn-group'>
                    <button type='submit' disabled={(isLoading === true)} className='btn btn-outline-primary'>Update</button>
                    <button type='button' onClick={handleCancel} disabled={(isLoading === true)} className='btn btn-outline-secondary'>Cancel</button>
                </div>
            </div>
        </form>
    );
}
export default EditUserForm;