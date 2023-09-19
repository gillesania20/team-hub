import useTitle from './../../hooks/useTitle';
import SearchTeamForm from './SearchTeamForm';
const SearchTeam = () => {
    useTitle('search-team', 'Search Team');
    return (
        <div>
            <h1>Search Team</h1>
            <SearchTeamForm />
        </div>
    );
}
export default SearchTeam;