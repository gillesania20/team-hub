import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchTeamMutation } from './../../features/teams/teamApiSlice';
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
    const searchForm = <form onSubmit={handleOnSubmit}>
        <input type='text' name='tname' value={teamName} onChange={handleOnChange} />
        <button type='submit' disabled={(isLoading === true)}>Search Team</button>
    </form>;
    return (
        <div>
            {searchForm}
            {teamsFound.map((team) => {
                return <div key={team._id} onClick={()=>handleOnClick(team._id)}>{team.name} {team.leader.username}</div>
            })}
        </div>
    );
}
export default SearchTeamForm;