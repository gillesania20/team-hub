import { useState } from 'react';
import { useAddTeamMutation } from './../../features/teams/teamApiSlice';
const CreateTeamForm = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [addTeam, {isLoading}] = useAddTeamMutation();
    const handleOnChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if(name.length <= 0){
            setMessage('please fill up all required fields');
        }else{
            response = await addTeam({name});
            if(typeof response?.error?.data?.message === 'string'){
                setMessage(response.error.data.message);
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'team created'){
                setMessage(response.data.message);
                setName('');
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
                <label>Name: </label>
                <input type='text' name='name' value={name} onChange={handleOnChange} />
            </div>
            <div>
                <button type='submit' disabled={(isLoading === true)}>Create</button>
            </div>
        </form>
    );
}
export default CreateTeamForm;