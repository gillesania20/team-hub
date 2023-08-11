import { Link } from 'react-router-dom';
const RegisterForm = () => {
    return (
        <div>
            <form>
                <div>
                    <label>Username: </label>
                    <input type="text" />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" />
                </div>
                <div>
                    <label>Retype password: </label>
                    <input type="password" />
                </div>
                <div>
                    <button type="submit">Sign-up</button>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}
export default RegisterForm;