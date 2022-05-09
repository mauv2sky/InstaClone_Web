import { gql, useQuery } from '@apollo/client';
import Photo from '../component/feed/Photo';

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

const Home = () => {
    const { data } = useQuery(FEED_QUERY);
    return (
        <div>
            {data?.seeFeed?.photos?.map((photo) => (
                <Photo key={photo.id} {...photo} />
            ))}
        </div>
    );
};

export default Home;
