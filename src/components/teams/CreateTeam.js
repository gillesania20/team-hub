import { useState } from 'react';
import useTitle from './../../hooks/useTitle';
import CreateTeamForm from './CreateTeamForm';
import AlertMessage from './../alerts/AlertMessage';
const CreateTeam = () => {
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    useTitle('create-team', 'Create Team');
    return (
        <div>
            {(message.length > 0)?
            <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
            :''}
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <div className='width-when-400-screen'>
                    <h1 className='text-center text-primary fw-bold mb-3'>Create Team</h1>
                    <CreateTeamForm messageFunc={(input)=>setMessage(input)} messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>
    );
}
export default CreateTeam;