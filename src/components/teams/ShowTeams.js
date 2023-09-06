import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetAllMembershipsQuery } from './../../features/memberships/membershipApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const ShowTeams = () => {
    const clientID = useSelector(selectUserID);
    const { data, isLoading, error } = useGetAllMembershipsQuery();
    const navigate = useNavigate();
    let content = null;
    let listOfTeams = null;
    let copiedArray = null;
    const compareFn = (a, b) => {
        let output = null;
        if(a.team.name < b.team.name){
            output = -1;
        }else if(a.team.name > b.team.name){
            output = 1;
        }else{
            output = 0
        }
        return output;
    }
    const handleOnClick = (teamID) => {
        navigate(`/dash/teams/display-team/${teamID}`);
        return null;
    }
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(
        (typeof data?.message === 'string' && data.message === 'memberships found')
        && (typeof data?.memberships !== 'undefined' && data.memberships !== null)
    ){
        copiedArray = data.memberships.map((membership)=>membership);
        copiedArray.sort(compareFn);
        listOfTeams = (copiedArray.map((membership) => {
            return <div key={membership._id} onClick={()=>handleOnClick(membership.team._id)}>
                <div>
                    <span>Name: <span>{membership.team.name}</span></span>
                    <span>Role: <span>{(membership.team.leader._id === clientID)?'Leader':'Member'}</span></span>
                </div>
                <div>
                    <span>Leader: <span>{membership.team.leader.username}</span></span>
                </div>
            </div>
        }));
        content = <div>
            <h1>Show Teams</h1>
            <div>
                {listOfTeams}
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default ShowTeams;