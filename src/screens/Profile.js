import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName: $userName) {
            user {
                userName
                bio
                avatar
                photos {
                    id
                    file
                    likes
                    commentNumber
                    isLiked
                }
                totalFollowing
                totalFollower
                isMe
                isFollowing
            }
        }
    }
`;

function Profile() {
    const { userName } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            userName,
        },
    });
    return 'Profile';
}

export default Profile;
