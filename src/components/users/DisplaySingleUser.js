const DisplaySingleUser = () => {
    return (
        <div>
            <h1>User Info</h1>
            <div>
                <label>username: </label>
                <span>user1</span>
            </div>
            <div>
                <label>Status: </label>
                <span>Active</span>
            </div>
            <div>
                <label>Birthday: </label>
                <span>January 20, 1998</span>
            </div>
            <div>
                <button type="button">Edit User</button>
            </div>
        </div>
    );
}
export default DisplaySingleUser;