import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddPostMutation } from './../../features/posts/postApiSlice';
const AddPostForm = () => {
    const { teamID } = useParams();
    const [body, setBody] = useState('');
    const [addPost, {isLoading}] = useAddPostMutation();
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
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'post created'){
                //successfully created post
            }else{
                //unknown error
            }
        }
        return null;
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <textarea name='body' value={body} onChange={handleOnChange}></textarea>
            </div>
            <div>
                <button type='submit' disabled={(isLoading === true)}>Post</button>
            </div>
        </form>
    );
}
export default AddPostForm;