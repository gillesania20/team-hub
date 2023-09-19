import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetPostQuery } from './../../features/posts/postApiSlice';
import EditPostForm from './EditPostForm';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const EditPost = () => {
    const { postID } = useParams();
    const { data, isLoading, error } = useGetPostQuery({postID});
    let content = <></>;
    useTitle('edit-post', 'Edit Post');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(
        (typeof data?.message === 'string' && data.message === 'post found')
        &&(typeof data?.post !== 'undefined' && data.post !== null)
    ){
        content = <div>
            <h1>Edit Post</h1>
            <EditPostForm postData={data.post} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditPost;