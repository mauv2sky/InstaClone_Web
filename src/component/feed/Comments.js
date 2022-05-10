import styled from 'styled-components';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsContainer = styled.div`
    margin-top: 15px;
`;

const CommentCount = styled.span`
    margin: 10px 0px;
    font-size: 11px;
    display: block;
    opacity: 70%;
    font-weight: 600;
`;

function Comments({ author, caption, commentNumber, comments }) {
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>{commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}</CommentCount>
            {comments?.map((comment) => (
                <Comment key={comment.id} author={comment.user.userName} payload={comment.payload} />
            ))}
        </CommentsContainer>
    );
}

Comments.propTypes = {
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
    commentNumber: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            user: PropTypes.shape({
                userName: PropTypes.string.isRequired,
                avatar: PropTypes.string,
            }),
            payload: PropTypes.string,
            isMine: PropTypes.bool.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ),
};

export default Comments;
