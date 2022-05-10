import styled from 'styled-components';
import { FatText } from '../shared';
import PropTypes from 'prop-types';

const CommentContainer = styled.div``;

const PhotoCaption = styled.span`
    margin-left: 10px;
`;

function Comment({ author, payload }) {
    return (
        <CommentContainer>
            <FatText>{author}</FatText>
            <PhotoCaption>{payload}</PhotoCaption>
        </CommentContainer>
    );
}

Comment.propTypes = {
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
};

export default Comment;
