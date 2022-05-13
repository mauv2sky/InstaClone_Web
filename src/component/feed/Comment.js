import React from 'react';
import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id) {
            ok
        }
    }
`;

const CommentContainer = styled.div`
    margin-bottom: 5px;
`;

const PhotoCaption = styled.span`
    margin-left: 10px;
    a {
        background-color: inherit;
        color: ${(props) => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const DeleteButton = styled.p`
    float: right;
    background-color: inherit;
    border: 0;
    outline: 0;
    font-size: 10px;
    cursor: pointer;
    &:hover {
        font-size: 12px;
    }
`;

function Comment({ id, photoId, isMine, author, payload }) {
    const updateDeleteComment = (cache, result) => {
        const {
            data: {
                deleteComment: { ok },
            },
        } = result;
        if (ok) {
            cache.evict({
                id: `Comment:${id}`,
            });
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentNumber(prev) {
                        return prev - 1;
                    },
                },
            });
        }
    };
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id,
        },
        update: updateDeleteComment,
    });

    const onDeleteClick = () => {
        deleteCommentMutation();
    };
    return (
        <CommentContainer>
            <Link to={`/users/${author}`}>
                <FatText>{author}</FatText>
            </Link>
            <PhotoCaption>
                {payload.split(' ').map((word, index) =>
                    /#[\w]+/.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>{word} </React.Fragment>
                    )
                )}
            </PhotoCaption>
            {isMine ? <DeleteButton onClick={onDeleteClick}>❌</DeleteButton> : null}
        </CommentContainer>
    );
}

Comment.propTypes = {
    id: PropTypes.number,
    isMine: PropTypes.bool,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
};

export default Comment;
