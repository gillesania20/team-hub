import { useParams } from 'react-router-dom';
import useTitle from './../../hooks/useTitle';
import { useGetCommentQuery } from './../../features/comments/commentApiSlice';
import EditCommentForm from './EditCommentForm';
import Loader from './../loader/Loader';
import ErrorWithMessage from './../errors/ErrorWithMessage';
import DefaultError from './../errors/DefaultError';
const EditComment = () => {
    const { commentID } = useParams();
    const { data, isLoading, error } = useGetCommentQuery({commentID});
    let content = <></>;
    useTitle('edit-comment', 'Edit Comment');
    if(isLoading === true){
        content = <Loader />;
    }else if(typeof error?.data?.message === 'string'){
        content = <ErrorWithMessage message={error.data.message} />;
    }else if(typeof data?.message == 'string' && data.message === 'comment found'){
        content = <div>
            <h1>Edit Comment</h1>
            <EditCommentForm commentData={data.comment} />
        </div>;
    }else{
        content = <DefaultError />;
    }
    return content;
}
export default EditComment;