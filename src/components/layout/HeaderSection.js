import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import decodeToken from './../../functions/decodeToken';
import { selectToken, selectUserID } from './../../features/auth/authSlice';
import { useLogoutMutation } from './../../features/auth/authApiSlice';
const HeaderSection = () => {
    const token = useSelector(selectToken);
    const userID = useSelector(selectUserID);
    const [username, setUsername] = useState('unknown');
    const [logout, {isLoading}] = useLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
        return null;
    }
    useEffect(() => {
        const decoded = decodeToken(token);
        if(typeof decoded?.username === 'string'){
            setUsername(decoded.username);
        }else{
            setUsername('unknown');
        }
    }, [token]);
    return(
        <header>
            <div>
                <span>
                    Welcome <Link to={`/dash/users/display-user/${userID}`}>{username}
                    </Link>
                </span>
                <button type='button' onClick={handleLogout} disabled={(isLoading === true)}>Logout</button>
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
                        <Link to='/dash/teams/create-team'>Create Team</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default HeaderSection;