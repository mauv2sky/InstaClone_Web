import styled from 'styled-components';

const SAvatar = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 20px;
    background-color: black;
    overflow: hidden;
`;

const Img = styled.img`
    max-width: 100%;
`;

function Avatar({ url }) {
    return (
        <SAvatar>
            <Img src={url} />
        </SAvatar>
    );
}

export default Avatar;
