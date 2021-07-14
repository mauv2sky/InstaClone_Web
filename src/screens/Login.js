import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom";


const Container = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Wrapper = styled.div`
    max-width: 350px;
    width: 100%;
`

const WhiteBox = styled.div`
    background-color: white;
    border: 1px solid ${(props) => props.theme.borderColor};
    width: 100%;
`

const TopBox = styled(WhiteBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        width: 100%;
    }
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    background-color: #fafafa;
    border-radius: 3px;
    border: 0.5px solid ${(props) => props.theme.borderColor};
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
`

const Button = styled.input`
    border: none;
    border-radius: 3px;
    margin-top: 12px;
    background-color: ${(props) => props.theme.accent};
    color: white;
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
    width: 100%;
`

const BottomBox = styled(WhiteBox)`
    padding: 20px 40px;
    text-align: center;
    a {
        font-weight: 600;
        color: ${(props) => props.theme.accent};
        margin-left: 5px;
    }
`

const Separator = styled.div`
    margin: 20px 0px 30px 0px;
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    div {
        width: 100%;
        height: 1px;
        background-color: ${(props) => props.theme.borderColor};
    }
    span {
        margin: 0px 10px;
        font-weight: 600;
        font-size: 12px;
        color: #8e8e8e;
    }
`

const FacebookLogin = styled.div`
    color: #385285;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <form>
                        <Input type='text' placeholder="Username" />
                        <Input type='password' placeholder="Password" />
                        <Button type='submit' value="Log in" />
                    </form>
                    <Separator>
                        <div></div>
                        <span>OR</span>
                        <div></div>
                    </Separator>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare} />
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span>
                    <Link to="/sign-up">Sign up</Link>
                </BottomBox>
            </Wrapper>
        </Container>
    )
}
export default Login;