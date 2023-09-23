import ClipLoader from 'react-spinners/ClipLoader';
const Loader = () => {
    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <span><ClipLoader /></span>
        </div>
    );
}
export default Loader;