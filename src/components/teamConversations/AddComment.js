import AddCommentForm from './AddCommentForm';
const AddComment = ({postID}) => {
    return (
        <div>
            <AddCommentForm postID={postID}/>
        </div>
    );
}
export default AddComment;