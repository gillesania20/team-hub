const ErrorWithMessage = ({message}) => {
    return (
        <div>
            <div>
                oops something went wrong.
            </div>
            <div>
                {message}.
            </div>
        </div>
    )
}
export default ErrorWithMessage;