import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import decodeToken from './../../functions/decodeToken';
import { selectToken, selectUserID } from './../../features/auth/authSlice';
const HeaderSection = () => {
    const token = useSelector(selectToken);
    const userID = useSelector(selectUserID);
    const decoded = decodeToken(token);
    return(
        <header>
            <div>
                <span>
                    Welcome <Link to={`/dash/users/display-user/${userID}`}>{decoded.username}
                    </Link>
                </span>
                <button type='button'>Logout</button>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to='/dash/teams/search-team'>Search Team</Link>
                    </li>
                    <li>
                        <Link to='/dash/teams/show-teams'>Show Teams</Link>
                    </li>
                    <li>
                        <Link to='/dash/teams/create-team'>CreateTeam</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default HeaderSection;