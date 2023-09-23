import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAddPostMutation } from './../../features/posts/postApiSlice';
const AddPostForm = () => {
    const { teamID } = useParams();
    const [body, setBody] = useState('');
    const [addPost, {isLoading}] = useAddPostMutation();
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        if(e.target.name === 'body'){
            setBody(e.target.value);
        }
        return null;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let response = null;
        if(body.length > 0){
            response = await addPost({teamID, body});
            if(typeof response?.error?.data?.message === 'string'){
                //error with message
                if(response.error.data.message === 'jwt expired'){
                    navigate('/login');
                }
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'post created'){
                setBody('');
                //successfully created post
            }else{
                //unknown error
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit} className='p-1 rounded shadow mb-3'>
            <div className='mb-1'>
                <textarea name='body' value={body} onChange={handleOnChange} placeholder='Put your new post here...'
                    rows='5' className='form-control resize-none border border-primary'></textarea>
            </div>
            <div className='text-end'>
                <button type='submit' title='Add New Post' disabled={(isLoading === true)} className='btn 
                    btn-outline-primary'>Post</button>
            </div>
        </form>
    );
}
export default AddPostForm;