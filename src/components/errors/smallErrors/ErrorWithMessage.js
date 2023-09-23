const ErrorWithMessage = ({message}) => {
    return (
        <div className='py-5 d-flex justify-content-center'>
            <div className='fw-bold text-center'>
                <div className='mb-2'>
                    <span>Oops something went wrong.</span>
                </div>
                <div>
                    <span className='text-uppercase'>{message}.</span>
                </div>
            </div>
        </div>
    )
}
export default ErrorWithMessage;