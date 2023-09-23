import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateCommentMutation } from './../../features/comments/commentApiSlice';
const EditCommentForm = ({commentData, messageFunc, messageColorFunc}) => {
    const { teamID } = useParams();
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
            messageFunc(response.error.data.message);
            messageColorFunc('alert-danger');
        }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated comment data'){
            messageFunc(response.data.message);
            messageColorFunc('alert-success');
            setBody('');
            navigate(`/dash/team-conversations/${teamID}`);
        }else{
            messageFunc('unknown error');
            messageColorFunc('alert-danger');
        }
        return null;
    }
    const handleCancel = () => {
        navigate(`/dash/team-conversations/${teamID}`);
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='my-list-width'>
            <div className='mb-3'>
                <label htmlFor='body' className='form-label text-secondary cursor-pointer'>Body: </label>
                <textarea name='body' value={body} onChange={handleOnChange} rows='5' id='body' className='form-control border
                    border-primary resize-none'></textarea>
            </div>
            <div className='text-center'>
                <div className='btn-group'>
                    <button type='submit' disabled={(isLoading === true)} className='btn btn-outline-primary me-1'>Update</button>
                    <button type='button' onClick={handleCancel} className='btn btn-outline-secondary'>Cancel</button>
                </div>
            </div>
        </form>
    );
}
export default EditCommentForm;