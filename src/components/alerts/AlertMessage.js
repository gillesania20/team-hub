const AlertMessage = ({message, messageColor, messageFunc}) => {
    return (
        <div className={`alert ${messageColor} alert-dismissable d-flex justify-content-between text-break`}>
            <span>{message}</span>
            <button type='button' className='btn-close' onClick={()=>messageFunc('')}></button>
        </div>
    );
}
export default AlertMessage;