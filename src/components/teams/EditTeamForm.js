import { useNavigate } from 'react-router-dom';
import { useUpdateTeamMutation } from './../../features/teams/teamApiSlice';
import { useState } from 'react';
const EditTeamForm = ({teamData, messageFunc, messageColorFunc}) => {
    const [name, setName] = useState(teamData.name);
    const [updateTeam, {isLoading}] = useUpdateTeamMutation();
    const navigate = useNavigate();
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
            messageFunc('please fill-up all required fields');
            messageColorFunc('alert-danger');
        }else{
            response = await updateTeam({teamID: teamData._id, name});
            if(typeof response?.error?.data?.message === 'string'){
                if(response.error.data.message === 'jwt expired'){
                    navigate('/login');
                }else{
                    messageFunc(response.error.data.message);
                    messageColorFunc('alert-danger');
                }
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated team data'){
                messageFunc(response.data.message);
                messageColorFunc('alert-success');
                setName('');
                navigate(`/dash/teams/display-team/${teamData._id}`);
            }else{
                messageFunc('unknown error');
                messageColorFunc('alert-danger');
            }
        }
        return null;
    }
    const handleCancel = () => {
        navigate(`/dash/teams/display-team/${teamData._id}`);
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='form-min-width'>
            <div className='mb-3'>
                <label className='form-label text-secondary'>Name: </label>
                <input type='text' name='name' value={name} onChange={handleOnChange}
                    className='form-control border border-primary' />
            </div>
            <div className='text-center'>
                <div className='btn-group'>
                    <button type='submit' disabled={(isLoading === true)} className='btn btn-outline-primary me-1'>Update</button>
                    <button type='button' disabled={(isLoading === true)} onClick={handleCancel} className='btn btn-outline-secondary'
                        >Cancel</button>
                </div>
            </div>
        </form>
    );
}
export default EditTeamForm;