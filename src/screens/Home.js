import { gql, useQuery } from '@apollo/client';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Avatar from '../component/Avatar';
import { FatText } from '../component/shared';

const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            photos {
                id
                user {
                    userName
                    avatar
                }
                file
                caption
                likes
                comments
                createdAt
                isMine
                isLiked
            }
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
`;

const Likes = styled(FatText)`
    margin-top: 15px;
    display: block;
`;

const Home = () => {
    const { data } = useQuery(FEED_QUERY);
    console.log(data);
    return (
        <div>
            {data?.seeFeed?.photos?.map((photo) => (
                <PhotoContainer key={photo.id}>
                    <PhotoHeader>
                        <Avatar lg url={photo.user.avatar} />
                        <UserName>{photo.user.userName}</UserName>
                    </PhotoHeader>
                    <PhotoFile src={photo.file} />
                    <PhotoData>
                        <PhotoActions>
                            <div>
                                <PhotoAction>
                                    <FontAwesomeIcon
                                        style={{ color: photo.isLiked ? 'tomato' : 'inherit' }}
                                        icon={photo.isLiked ? SolidHeart : faHeart}
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
                        <Likes>{photo.likes === 1 ? '1 likes' : `${photo.likes} likes`}</Likes>
                    </PhotoData>
                </PhotoContainer>
            ))}
        </div>
    );
};

export default Home;
