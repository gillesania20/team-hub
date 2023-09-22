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
        <form onSubmit={handleOnSubmit} className='p-1 bg-info rounded-bottom'>
            <div className='mb-1'>
                <textarea name='body' value={body} onChange={handleOnChange} placeholder='Put your new comment here...'
                    rows='5' className='form-control resize-none border border-primary'></textarea>
            </div>
            <div className='text-end'>
                <button type='submit' title='Add New Comment' disabled={(isLoading === true)} className='btn
                    btn-outline-primary'>Comment</button>
            </div>
        </form>
    );
}
export default AddCommentForm;