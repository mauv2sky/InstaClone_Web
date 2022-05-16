import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FatText } from '../component/shared';
import Button from '../component/auth/Button';
import PageTitle from '../component/PageTitle';
import useUser from '../hooks/useUser';

const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName: $userName) {
            user {
                firstName
                lastName
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

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($userName: String!) {
        followUser(userName: $userName) {
            ok
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unFollowUser($userName: String!) {
        unFollowUser(userName: $userName) {
            ok
        }
    }
`;

const Header = styled.div`
    display: flex;
`;
const Avatar = styled.img`
    margin-left: 50px;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-right: 150px;
    background-color: #2c2c2c;
`;
const Column = styled.div``;
const UserName = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;
const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 16px;
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 18px;
`;
const Name = styled(FatText)`
    font-size: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    position: relative;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const ProfileBtn = styled(Button).attrs({
    as: 'span',
})`
    margin-top: 0px;
    margin-left: 20px;
    font-size: 12px;
    padding: 5px 5px;
    cursor: pointer;
`;

function Profile() {
    const { userName } = useParams();
    const { data: userData } = useUser();
    const client = useApolloClient();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            userName,
        },
    });

    const unFollowUserUpdate = (cache, result) => {
        const {
            data: {
                unFollowUser: { ok },
            },
        } = result;
        if (!ok) return;
        cache.modify({
            id: `User:${userName}`,
            fields: {
                isFollowing(prev) {
                    return false;
                },
                totalFollower(prev) {
                    return prev - 1;
                },
            },
        });
        const { me } = userData;
        cache.modify({
            id: `User:${me.userName}`,
            fields: {
                totalFollowing(prev) {
                    return prev - 1;
                },
            },
        });
    };
    const [unFollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {
            userName,
        },
        update: unFollowUserUpdate,
    });

    const followUserUpdate = (data) => {
        const {
            followUser: { ok },
        } = data;
        if (!ok) return;
        const { cache } = client;
        cache.modify({
            id: `User:${userName}`,
            fields: {
                isFollowing(prev) {
                    return true;
                },
                totalFollower(prev) {
                    return prev + 1;
                },
            },
        });
        const { me } = userData;
        cache.modify({
            id: `User:${me.userName}`,
            fields: {
                totalFollowing(prev) {
                    return prev + 1;
                },
            },
        });
    };
    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            userName,
        },
        onCompleted: followUserUpdate,
    });
    const getButton = (user) => {
        const { isMe, isFollowing } = user;
        if (isMe) {
            return <ProfileBtn>Edit Profile</ProfileBtn>;
        }
        if (isFollowing) {
            return <ProfileBtn onClick={unFollowUser}>UnFollow</ProfileBtn>;
        } else {
            return <ProfileBtn onClick={followUser}>Follow</ProfileBtn>;
        }
    };
    return (
        <div>
            <PageTitle title={loading ? 'Loading...' : `${data?.seeProfile?.user.userName}'s Profile`} />
            <Header>
                <Avatar src={data?.seeProfile?.user.avatar} />
                <Column>
                    <Row>
                        <UserName>{data?.seeProfile?.user.userName}</UserName>
                        {data?.seeProfile ? getButton(data.seeProfile.user) : null}
                    </Row>
                    <Row>
                        <List>
                            <Item>
                                <span>
                                    <Value>{data?.seeProfile?.user.totalFollower}</Value> followers
                                </span>
                            </Item>
                            <Item>
                                <span>
                                    <Value>{data?.seeProfile?.user.totalFollowing}</Value> following
                                </span>
                            </Item>
                        </List>
                    </Row>
                    <Row>
                        <Name>
                            {data?.seeProfile?.firstName} {data?.seeProfile?.user.lastName}
                        </Name>
                    </Row>
                    <Row>{data?.seeProfile?.user.bio}</Row>
                </Column>
            </Header>
            <Grid>
                {data?.seeProfile?.user.photos.map((photo) => (
                    <Photo key={photo.id} bg={photo.file}>
                        <Icons>
                            <Icon>
                                <FontAwesomeIcon icon={faHeart} />
                                {photo.likes}
                            </Icon>
                            <Icon>
                                <FontAwesomeIcon icon={faComment} />
                                {photo.commentNumber}
                            </Icon>
                        </Icons>
                    </Photo>
                ))}
            </Grid>
        </div>
    );
}

export default Profile;
