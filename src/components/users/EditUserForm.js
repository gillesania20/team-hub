import { useState } from 'react';
import { useUpdateUserMutation } from './../../features/users/userApiSlice';
const EditUserForm = ({userData}) => {
    const trimmedBirthday = userData.birthday.split('T')[0];
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(userData.username);
    const [birthday, setBirthday] = useState(trimmedBirthday);
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [changePassword, setChangePassword] = useState(false);
    const [updateUser, {isLoading}] = useUpdateUserMutation();
    const maxDate = new Date().toISOString().split('T')[0];
    const handleOnChange = (e) => {
        if(e.target.name === 'uname'){
            setUsername(e.target.value);
        }else if(e.target.name === 'bday'){
            setBirthday(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }else if(e.target.name === 'rpass'){
            setRetypePassword(e.target.value);
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
            if(changePassword === true){
                response = await updateUser({userID: userData._id, username, password, birthday});
            }else{
                response = await updateUser({userID: userData._id, username, birthday});
            }
            if(typeof response?.error?.data?.message === 'string'){
                setMessage(response.error.data.message);
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated user data'){
                setMessage(response.data.message);
                setUsername('');
                setBirthday('');
                setPassword('');
                setRetypePassword('');
                setChangePassword(false);
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
                <input type='text' name='uname' value={username} onChange={handleOnChange} />
            </div>
            <div>
                <label>Birthday: </label>
                <input type='date' name='bday' value={birthday} onChange={handleOnChange} min='1900-01-01' max={maxDate} />
            </div>
            <div>
                <label>Change Password: </label>
                <input type='checkbox' name='changePass' value={changePassword} onChange={handleOnChange} />
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
                <button type='submit' disabled={(isLoading === true)}>Submit</button>
                <button type='button' disabled={(isLoading === true)}>Cancel</button>
            </div>
        </form>
    );
}
export default EditUserForm;