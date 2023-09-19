import useTitle from './../../hooks/useTitle';
import SearchTeamForm from './SearchTeamForm';
const SearchTeam = () => {
    useTitle('search-team', 'Search Team');
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className=''>
                <h1 className='text-center mb-4 text-primary fw-bold'>Search Team</h1>
                <SearchTeamForm />
            </div>
        </div>
    );
}
export default SearchTeam;