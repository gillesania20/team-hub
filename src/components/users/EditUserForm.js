const EditUserForm = () => {
    return (
        <form>
            <div>
                <label>Username: </label>
                <input type="text" />
            </div>
            <div>
                <label>Birthday: </label>
                <input type="date" />
            </div>
            <div>
                <label>Password: </label>
                <input type="password" />
            </div>
            <div>
                <label>Retype-password: </label>
                <input type="password" />
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
            </div>
        </form>
    );
}
export default EditUserForm;