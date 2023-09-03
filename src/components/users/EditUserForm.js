import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from './../../features/users/userApiSlice';
const EditUserForm = ({userData}) => {
    const trimmedBirthday = userData.birthday.split('T')[0];
    const [message, setMessage] = useState('');
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
            setMessage('please fill-up the password field');
        }else if(changePassword === true && password.length > 0 && password !== retypePassword){
            setMessage('please make sure password and retype-password are the same');
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
                setMessage(response.error.data.message);
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated user data'){
                setMessage(response.data.message);
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
                setMessage('unknown error');
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div>
                <label>Birthday: </label>
                <input type='date' name='bday' value={birthday} onChange={handleOnChange} min='1900-01-01' max={maxDate} />
            </div>
            <div>
                <input type='checkbox' name='changeUname' value={changeUsername} onChange={handleOnChange} />
                <label>Change Username: </label>
            </div>
            <div hidden={(changeUsername === false)}>
                <label>Username: </label>
                <input type='text' name='uname' value={username} onChange={handleOnChange} />
            </div>
            <div>
                <input type='checkbox' name='changePass' value={changePassword} onChange={handleOnChange} />
                <label>Change Password: </label>
            </div>
            <div hidden={(changePassword === false)}>
                <div>
                    <label>Password: </label>
                    <input type='password' name='pass' value={password} onChange={handleOnChange} />
                </div>
                <div>
                    <label>Retype-password: </label>
                    <input type='password' name='rpass' value={retypePassword} onChange={handleOnChange}
                        disabled={(password.length <= 0)}/>
                </div>
            </div>
            <div>
                <button type='submit' disabled={(isLoading === true)}>Update</button>
                <button type='button' disabled={(isLoading === true)}>Cancel</button>
            </div>
        </form>
    );
}
export default EditUserForm;