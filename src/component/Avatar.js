import styled from 'styled-components';

const SAvatar = styled.div`
    width: ${(props) => (props.lg ? '30px' : '25px')};
    height: ${(props) => (props.lg ? '30px' : '25px')};
    border-radius: 50%;
    background-color: black;
    overflow: hidden;
`;

const Img = styled.img`
    max-width: 100%;
`;

function Avatar({ url, lg = false }) {
    return (
        <SAvatar lg={lg}>
            <Img src={url} />
        </SAvatar>
    );
}

export default Avatar;
