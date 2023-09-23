import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetCommentQuery } from './../../features/comments/commentApiSlice';
import EditCommentForm from './EditCommentForm';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
import AlertMessage from './../alerts/AlertMessage';
const EditComment = () => {
    const { commentID } = useParams();
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const { data, isLoading, error } = useGetCommentQuery({commentID});
    let content = <></>;
    useTitle('edit-comment', 'Edit Comment');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data?.message == 'string' && data.message === 'comment found'){
        content = <div>
            {(message.length > 0)?
                <AlertMessage message={message} messageColor={messageColor} messageFunc={(input)=>setMessage(input)} />
                :''}
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <div>
                    <h1 className='text-center text-primary fw-bold mb-3'>Edit Comment</h1>
                    <EditCommentForm commentData={data.comment} messageFunc={(input)=>setMessage(input)}
                        messageColorFunc={(input)=>setMessageColor(input)} />
                </div>
            </div>
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditComment;