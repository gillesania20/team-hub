import useTitle from './../../hooks/useTitle';
import CreateTeamForm from './CreateTeamForm';
const CreateTeam = () => {
    useTitle('create-team', 'Create Team');
    return (
        <div>
            <h1>Create Team</h1>
            <CreateTeamForm />
        </div>
    );
}
export default CreateTeam;