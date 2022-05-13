import { gql, useQuery } from '@apollo/client';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FatText } from '../component/shared';

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

function Profile() {
    const { userName } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            userName,
        },
    });
    return (
        <div>
            <Header>
                <Avatar src={data?.seeProfile?.user.avatar} />
                <Column>
                    <Row>
                        <UserName>{data?.seeProfile?.user.userName}</UserName>
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
                    <Photo bg={photo.file}>
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
