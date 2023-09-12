import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdatePostMutation } from './../../features/posts/postApiSlice';
const EditPostForm = ({postData}) => {
    const { teamID } = useParams();
    const [message, setMessage] = useState('');
    const [body, setBody] = useState(postData.body)
    const [updatePost, {isLoading}] = useUpdatePostMutation();
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        if(e.target.name === 'body'){
            setBody(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let response = await updatePost({postID: postData._id, body});
        if(typeof response?.error?.data?.message === 'string'){
            setMessage(response.error.data.message);
        }else if(typeof response?.data?.message === 'string' && response.data.message === 'updated post data'){
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
                <button type='submit' disabled={(isLoading === true)}>Update</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}
export default EditPostForm;