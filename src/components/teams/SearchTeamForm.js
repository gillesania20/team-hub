import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchTeamMutation } from './../../features/teams/teamApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const SearchTeamForm = () => {
    const [teamName, setTeamName] = useState('');
    const [teamsFound, setTeamsFound] = useState([]);
    const [searchTeam, {isLoading}] = useSearchTeamMutation();
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        if(e.target.name === 'tname'){
            setTeamName(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await searchTeam({teamName});
        if(
            typeof response?.data?.message === 'string' && response.data.message === 'teams found'
            && typeof response?.data?.teams !== 'undefined' && response.data.teams !== null
        ){
            setTeamsFound(response.data.teams);
        }else{
            setTeamsFound([]);
        }
        return null;
    }
    const handleOnClick = (teamID) => {
        navigate(`/dash/teams/display-team/${teamID}`);
        return null;
    }
    const searchForm = <form onSubmit={handleOnSubmit} className='mb-3'>
        <div className='mb-3'>
            <div className='input-group'>
                <span className='input-group-text rounded-start-pill border border-primary'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-primary' />
                </span>
                <input type='text' name='tname' value={teamName} onChange={handleOnChange} autoComplete='off'
                    className='form-control shadow-sm rounded-end-pill border border-primary' />
            </div>
        </div>
        <div className='text-center'>
            <button type='submit' disabled={(isLoading === true)}
                className='btn btn-outline-primary shadow-sm'>Search Team</button>
        </div>
    </form>;
    return (
        <div>
            {searchForm}
            <div className=''>
                {teamsFound.map((team) => {
                    return <div key={team._id} onClick={()=>handleOnClick(team._id)}
                        className='bg-primary p-3 mb-1 rounded text-light my-item cursor-pointer'>{team.name} {team.leader.username}</div>
                })}
            </div>
        </div>
    );
}
export default SearchTeamForm;