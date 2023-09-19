import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import decodeToken from './../../functions/decodeToken';
import { selectToken, selectUserID, selectCurrentPage } from './../../features/auth/authSlice';
import { useLogoutMutation } from './../../features/auth/authApiSlice';
const HeaderSection = () => {
    const token = useSelector(selectToken);
    const userID = useSelector(selectUserID);
    const currentPage = useSelector(selectCurrentPage);
    const [username, setUsername] = useState('unknown');
    const [searchTeamActiveOrNot, setSearchTeamActiveOrNot] = useState('');
    const [showTeamsActiveOrNot, setShowTeamsActiveOrNot] = useState('');
    const [createTeamActiveOrNot, setCreateTeamActiveOrNot] = useState('');
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
    useEffect(() => {
        if(currentPage === 'search-team'){
            setSearchTeamActiveOrNot('active');
            setShowTeamsActiveOrNot('');
            setCreateTeamActiveOrNot('');
        }else if(currentPage === 'show-teams'){
            setSearchTeamActiveOrNot('');
            setShowTeamsActiveOrNot('active');
            setCreateTeamActiveOrNot('');
        }else if(currentPage === 'create-team'){
            setSearchTeamActiveOrNot('');
            setShowTeamsActiveOrNot('');
            setCreateTeamActiveOrNot('active');
        }else{
            setSearchTeamActiveOrNot('');
            setShowTeamsActiveOrNot('');
            setCreateTeamActiveOrNot('');
        }
    }, [currentPage]);
    return(
        <header>
            <div className='bg-dark'>
                <div className='container'>
                    <div className='text-light d-flex justify-content-end py-2'>
                        <span className='me-1 lh-lg'>
                            Welcome <Link to={`/dash/users/display-user/${userID}`}
                                className='text-decoration-none text-danger'>{username}
                            </Link>
                        </span>
                        <button type='button' onClick={handleLogout} disabled={(isLoading === true)}
                            className='btn btn-outline-danger btn-sm'>Logout</button>
                    </div>
                </div>
            </div>
            <nav className='navbar bg-body-tertiary'>
                <div className='container'>
                    <span className='navbar-brand text-primary fw-bold'>TeamHub</span>
                    <button type='button' className='navbar-toggler' data-bs-toggle='offcanvas' data-bs-target='#offcanvasNavbar'
                        aria-controls='offcanvasNavbar' aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div id='offcanvasNavbar' className='offcanvas offcanvas-end' tabIndex='-1' aria-labelledby='offcanvasNavbarLabel'>
                        <div className='offcanvas-header'>
                            <h5 id='offcanvasNavbarLabel' className='offcanvas-title'>Menu</h5>
                            <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
                        </div>
                        <div className='offcanvas-body'>
                            <ul className='navbar-nav justify-content-end'>
                                <li className='nav-item'>
                                    <Link to='/dash/teams/search-team' className={`nav-link ${searchTeamActiveOrNot}`}>Search Team</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/dash/teams/show-teams' className={`nav-link ${showTeamsActiveOrNot}`}>Show Teams</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/dash/teams/create-team' className={`nav-link ${createTeamActiveOrNot}`}>Create Team</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default HeaderSection;