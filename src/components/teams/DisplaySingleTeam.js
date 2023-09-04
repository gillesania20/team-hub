import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
    if(isLoading === true || isLoadingMembership === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data !== 'undefined'){
        dateArray = new Date(data.created_at).toDateString().split(' ');
        dateCreated = `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
        if(typeof errorMembership?.data?.message === 'string' && errorMembership.data.message === 'membership not found'){
            hiddenControl = false;
            control = <>
                <button
                    type='button' onClick={handleJoinTeam} disabled={(isLoadingAddMembership === true)}
                >Join team</button>
            </>;
        }else if(typeof dataMembership?.message === 'string' && dataMembership.message === 'membership found'){
            hiddenControl = false;
            if(typeof data?.leader?._id === 'string' && data.leader._id !== clientID){
                control = <>
                    <button type='button'>Visit team</button>
                    <button
                        type='button' onClick={()=>handleLeaveTeam(dataMembership.membership._id)}
                        disabled={(isLoadingDeleteMembership)}
                    >Leave team</button>
                </>;
            }else if(typeof data?.leader?._id === 'string' && data.leader._id === clientID){
                control = <>
                    <button type='button'>Visit team</button>
                    <button type='button' onClick={handleEditTeam}>Edit team</button>
                    <button
                        type='button' onClick={handleDeleteTeam} disabled={(isLoadingDeleteTeam === true)}
                    >Delete team</button>
                </>;
            }else{
                hiddenControl = true;
                control = <></>;
            }
        }
        content = <div>
            <h1>Team Info</h1>
            <div>
                <label>Name: </label>
                <span>{data.name}</span>
            </div>
            <div>
                <label>leader: </label>
                <span>{data.leader.username}</span>
            </div>
            <div>
                <label>Date created: </label>
                <span>{dateCreated}</span>
            </div>
            <div hidden={(hiddenControl === true)}>
                {control}
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default DisplaySingleTeam;