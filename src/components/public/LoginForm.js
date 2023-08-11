import { Link } from 'react-router-dom';
const LoginForm = () => {
    return (
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
                <button type="submit">sign-in</button>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
        </form>
    );
}
export default LoginForm;