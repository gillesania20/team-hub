import { useState } from 'react';
import { useAddTeamMutation } from './../../features/teams/teamApiSlice';
const CreateTeamForm = ({messageFunc, messageColorFunc}) => {
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
            messageFunc('please fill up all required fields');
            messageColorFunc('alert-danger');
        }else{
            response = await addTeam({name});
            if(typeof response?.error?.data?.message === 'string'){
                messageFunc(response.error.data.message);
                messageColorFunc('alert-danger');
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'team created'){
                messageFunc(response.data.message);
                messageColorFunc('alert-success');
                setName('');
            }else{
                messageFunc('unknown error');
                messageColorFunc('alert-danger');
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='form-min-width'>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label text-secondary cursor-pointer'>Name: </label>
                <input type='text' name='name' value={name} onChange={handleOnChange} id='name' className='form-control border
                    border-primary' />
            </div>
            <div className='text-center'>
                <button type='submit' disabled={(isLoading === true)} className='btn btn-outline-primary'>Create</button>
            </div>
        </form>
    );
}
export default CreateTeamForm;