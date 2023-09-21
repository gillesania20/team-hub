import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
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
    let teamNotFound = null;
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
    useTitle('show-teams', 'Show Teams');
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
            return <div key={membership._id} onClick={()=>handleOnClick(membership.team._id)} className='bg-primary p-3 mb-1 rounded
                text-light my-item cursor-pointer'>
                <div className='row'>
                    <span className='col fw-bold'>Name: </span>
                    <span className='col text-break'>{membership.team.name}</span>
                    <span className='col fw-bold'>Role: </span>
                    <span className='col text-break'>{(membership.team.leader._id === clientID)?'Leader':'Member'}</span>
                </div>
                <div className='row'>
                    <span className='col fw-bold'>Leader: </span>
                    <span className='col text-break'>{membership.team.leader.username}</span>
                    <span className='col'></span>
                    <span className='col'></span>
                </div>
            </div>
        }));
        teamNotFound = <div>You're not a member of a team yet.</div>;
        content = <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div>
                <h1 className='text-center text-primary mb-4 fw-bold'>Show Teams</h1>
                <div>
                    {(data.memberships.length > 0)?
                        listOfTeams
                        :teamNotFound}
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default ShowTeams;