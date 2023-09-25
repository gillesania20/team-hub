import { useState } from 'react';
import useTitle from './../../hooks/useTitle';
import SearchTeamForm from './SearchTeamForm';
import AlertMessage from './../alerts/AlertMessage';
const SearchTeam = () => {
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    useTitle('search-team', 'Search Team');
    return (
        <div>
            {(message.length > 0)?
            <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
            :''}
            <div className='page-min-height d-flex justify-content-center align-items-center'>
                <div className='width-when-600-screen'>
                    <h1 className='text-center mb-3 text-primary fw-bold'>Search Team</h1>
                    <SearchTeamForm messageFunc={(input)=>setMessage(input)} messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>
    );
}
export default SearchTeam;