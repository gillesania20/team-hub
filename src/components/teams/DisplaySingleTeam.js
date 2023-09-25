import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetTeamQuery, useDeleteTeamMutation } from './../../features/teams/teamApiSlice';
import {
    useGetMembershipQuery, useAddMembershipMutation, useDeleteMembershipMutation
} from './../../features/memberships/membershipApiSlice';
import { selectUserID } from './../../features/auth/authSlice';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const DisplaySingleTeam = () => {
    const clientID = useSelector(selectUserID);
    const { teamID } = useParams();
    const { data, isLoading, error, refetch } = useGetTeamQuery({teamID});
    const {
        data: dataMembership, isLoading: isLoadingMembership, error: errorMembership, refetch: refetchMembership
    } = useGetMembershipQuery({teamID});
    const [addMembership, {isLoading: isLoadingAddMembership}] = useAddMembershipMutation();
    const [deleteMembership, {isLoading: isLoadingDeleteMembership}] = useDeleteMembershipMutation();
    const [deleteTeam, {isLoading: isLoadingDeleteTeam}] = useDeleteTeamMutation();
    const navigate = useNavigate();
    let dateArray = null;
    let dateCreated = null;
    let content = <></>;
    let control = <></>;
    let hiddenControl = true;
    const handleJoinTeam = async () => {
        await addMembership({teamID});
        refetchMembership();
        return null;
    }
    const handleVisitTeam = () => {
        navigate(`/dash/team-conversations/${teamID}`);
        return null;
    }
    const handleLeaveTeam = async (membershipID) => {
        await deleteMembership({membershipID});
        refetchMembership();
        return null;
    }
    const handleEditTeam = () => {
        navigate(`/dash/teams/edit-team/${teamID}`);
        return null;
    }
    const handleDeleteTeam = async () => {
        await deleteTeam({teamID});
        refetch();
        return null;
    }
    useTitle('team-info', 'Team Info');
    if(isLoading === true || isLoadingMembership === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        if(error.data.message === 'jwt expired'){
            navigate('/login');
        }else{
            content = <ErrorWithMessage message={error.data.message} />;
        }
    }else if(typeof data !== 'undefined'){
        dateArray = new Date(data.created_at).toDateString().split(' ');
        dateCreated = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        if(typeof errorMembership?.data?.message === 'string' && errorMembership.data.message === 'jwt expired'){
            navigate('/login');
        }else if(typeof errorMembership?.data?.message === 'string' && errorMembership.data.message === 'membership not found'){
            hiddenControl = false;
            control = <div>
                <button
                    type='button' onClick={handleJoinTeam} disabled={(isLoadingAddMembership === true)}
                    className='btn btn-primary'
                >Join team</button>
            </div>;
        }else if(typeof dataMembership?.message === 'string' && dataMembership.message === 'membership found'){
            hiddenControl = false;
            if(typeof data?.leader?._id === 'string' && data.leader._id !== clientID){
                control = <div className='btn-group'>
                    <button type='button' onClick={handleVisitTeam} className='btn btn-outline-primary me-1'>Visit team</button>
                    <button
                        type='button' onClick={()=>handleLeaveTeam(dataMembership.membership._id)}
                        disabled={(isLoadingDeleteMembership)} className='btn btn-outline-danger'
                    >Leave team</button>
                </div>;
            }else if(typeof data?.leader?._id === 'string' && data.leader._id === clientID){
                control = <div className='btn-group'>
                    <button type='button' onClick={handleVisitTeam} className='btn btn-outline-primary me-1'>Visit team</button>
                    <button type='button' onClick={handleEditTeam} className='btn btn-outline-primary me-1'>Edit team</button>
                    <button
                        type='button' onClick={handleDeleteTeam} disabled={(isLoadingDeleteTeam === true)}
                        className='btn btn-outline-danger'>Delete team</button>
                </div>;
            }else{
                hiddenControl = true;
                control = <></>;
            }
        }
        content = <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='width-when-400-screen'>
                <h1 className='text-center text-primary fw-bold mb-3'>Team Info</h1>
                <div className='form-min-width'>
                    <div className='row mb-2 w-100'>
                        <span className='col text-primary fw-bold'>Name: </span>
                        <span className='col text-break'>{data.name}</span>
                    </div>
                    <div className='row mb-2 w-100'>
                        <span className='col text-primary fw-bold'>Leader: </span>
                        <span className='col text-break'>{data.leader.username}</span>
                    </div>
                    <div className='row mb-3 w-100'>
                        <span className='col text-primary fw-bold'>Date created: </span>
                        <span className='col text-break'>{dateCreated}</span>
                    </div>
                    <div hidden={(hiddenControl === true)} className='text-center'>
                        {control}
                    </div>
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplaySingleTeam;