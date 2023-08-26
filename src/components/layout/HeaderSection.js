const HeaderSection = () => {
    return(
        <header>
            <div>
                <span>Welcome user1</span>
                <button type="button">Logout</button>
            </div>
            <div>
                <ul>
                    <li>
                        <a href="">Search Team</a>
                    </li>
                    <li>
                        <a href="">Show Teams</a>
                    </li>
                    <li>
                        <a href="">Create Team</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
export default HeaderSection;