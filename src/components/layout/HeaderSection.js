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