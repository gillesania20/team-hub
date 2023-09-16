import RegisterForm from './RegisterForm';
const Register = () => {
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='shadow-lg py-5 px-3 rounded'>
                <h1 className='text-primary text-center mb-3'>Register</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
export default Register;