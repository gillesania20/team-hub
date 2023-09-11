import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddCommentMutation } from './../../features/comments/commentApiSlice';
const AddCommentForm = ({postID}) => {
    const { teamID } = useParams();
    const [body, setBody] = useState('');
    const [addComment, {isLoading}] = useAddCommentMutation();
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
            response = await addComment({teamID, postID, body});
            if(typeof response?.error?.data?.message === 'string'){
                //error with message
            }else if(typeof response?.data?.message === 'string' && response.data.message === 'comment created'){
                setBody('');
                //successfully created comment
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
                <button type='submit' disabled={(isLoading === true)}>submit comment</button>
            </div>
        </form>
    );
}
export default AddCommentForm;