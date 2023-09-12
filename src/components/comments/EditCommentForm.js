import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateCommentMutation } from './../../features/comments/commentApiSlice';
const EditCommentForm = ({commentData}) => {
    const { teamID } = useParams();
    const [message, setMessage] = useState('');
    const [body, setBody] = useState(commentData.body);
    const [updateComment, {isLoading}] = useUpdateCommentMutation();
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        if(e.target.name === 'body'){
            setBody(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await updateComment({commentID: commentData._id, body});
        if(typeof response?.error?.data?.message === 'string'){
            setMessage(response.error.data.message);
        }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated comment data'){
            setMessage(response.data.message);
            setBody('');
            navigate(`/dash/team-conversations/${teamID}`);
        }else{
            setMessage('unknown error');
        }
        return null;
    }
    const handleCancel = () => {
        navigate(`/dash/team-conversations/${teamID}`);
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit}>
            {(message.length > 0)?<div>{message}</div>:''}
            <div>
                <label>Body: </label>
                <textarea name='body' value={body} onChange={handleOnChange}></textarea>
            </div>
            <div>
                <button type='submit'>Update</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}
export default EditCommentForm;