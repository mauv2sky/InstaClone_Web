import { gql, useMutation } from '@apollo/client';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { FatText } from '../shared';
import propTypes from 'prop-types';
import Comments from './Comments';

const LIKE_PHOTO_MUTATION = gql`
    mutation likePhoto($id: Int!) {
        likePhoto(id: $id) {
            ok
            error
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: white;
    border: solid 1px ${(props) => props.theme.borderColor};
    border-radius: 4px;
    margin-bottom: 60px;
    max-width: 750px;
`;

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
`;

const UserName = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;

const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
        align-items: center;
    }

    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

function Photo({ id, user, file, isLiked, likes, caption, commentNumber, comments }) {
    const updateLikePhoto = (cache, result) => {
        const {
            data: {
                likePhoto: { ok },
            },
        } = result;
        if (ok) {
            const photoId = `Photo:${id}`;
            cache.modify({
                id: photoId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        }
                        return prev + 1;
                    },
                },
            });
        }
    };
    const [likePhotoMutation] = useMutation(LIKE_PHOTO_MUTATION, {
        variables: {
            id,
        },
        update: updateLikePhoto,
    });
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Avatar lg url={user.avatar} />
                <UserName>{user.userName}</UserName>
            </PhotoHeader>
            <PhotoFile src={file} />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={likePhotoMutation}>
                            <FontAwesomeIcon
                                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                                icon={isLiked ? SolidHeart : faHeart}
                            />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faComment} />
                        </PhotoAction>
                        <PhotoAction>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </PhotoAction>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                </PhotoActions>
                <Likes>{likes === 1 ? '1 likes' : `${likes} likes`}</Likes>
                <Comments
                    photoId={id}
                    author={user.userName}
                    caption={caption}
                    commentNumber={commentNumber}
                    comments={comments}
                />
            </PhotoData>
        </PhotoContainer>
    );
}

Photo.propTypes = {
    id: propTypes.number.isRequired,
    user: propTypes.shape({
        avatar: propTypes.string,
        userName: propTypes.string.isRequired,
    }),
    file: propTypes.string.isRequired,
    isLiked: propTypes.bool.isRequired,
    likes: propTypes.number.isRequired,
    commentNumber: propTypes.number.isRequired,
    comments: propTypes.arrayOf(propTypes.shape({})),
};

export default Photo;
