import styled from 'styled-components';
import PropTypes from 'prop-types';
import Comment from './Comment';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import useUser from '../../hooks/useUser';

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId: $photoId, payload: $payload) {
            ok
            error
            id
        }
    }
`;

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

const PostCommentContainer = styled.div`
    margin-top: 10px;
    padding-top: 15px;
    padding-bottom: 10px;
    border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
    width: 100%;
    &::placeholder {
        font-size: 12px;
    }
`;

function Comments({ photoId, author, caption, commentNumber, comments }) {
    const { data: userData } = useUser();
    const { register, handleSubmit, setValue, getValues } = useForm();
    const createCommentUpdate = (cache, result) => {
        const { payload } = getValues();
        setValue('payload', '');
        const {
            data: {
                createComment: { ok, id },
            },
        } = result;
        if (ok && userData?.me) {
            const newComment = {
                __typename: 'Comment',
                createdAt: Date.now() + '',
                id,
                isMine: true,
                payload,
                user: {
                    ...userData.me,
                },
            };
            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment BSName on Comment {
                        id
                        createdAt
                        isMine
                        payload
                        user {
                            userName
                            avatar
                        }
                    }
                `,
            });
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    comments(prev) {
                        return [...prev, newCacheComment];
                    },
                    commentNumber(prev) {
                        return prev + 1;
                    },
                },
            });
        }
    };
    const [createCommentMutation, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
        update: createCommentUpdate,
    });
    const onValid = (data) => {
        const { payload } = data;
        if (loading) return;
        createCommentMutation({
            variables: {
                photoId,
                payload,
            },
        });
    };
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>{commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}</CommentCount>
            {comments?.map((comment) => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    photoId={photoId}
                    isMine={comment.isMine}
                    author={comment.user.userName}
                    payload={comment.payload}
                />
            ))}
            <PostCommentContainer>
                <form onSubmit={handleSubmit(onValid)}>
                    <PostCommentInput
                        name="payload"
                        {...register('payload', { required: true })}
                        type="text"
                        placeholder="Write a comment..."
                    />
                </form>
            </PostCommentContainer>
        </CommentsContainer>
    );
}

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
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
