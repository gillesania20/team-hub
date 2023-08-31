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
                <button type="button">Logout</button>
            </div>
            <div>
                <ul>
                    <li>
                        <a href="http://localhost:3000/">Search Team</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/">Show Teams</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/">Create Team</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default HeaderSection;