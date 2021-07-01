import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"

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
    border: 1px solid rgb(219, 219, 219);
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
        justify-content: center;
        flex-direction: column;
        width: 100%;
        input {
            width: 100%;
            padding: 10px;
            background-color: #fafafa;
            border-radius: 3px;
            border: 0.5px solid rgb(219, 219, 219);
            margin-top: 5px;
            box-sizing: border-box;
            &::placeholder {
                font-size: 12px;
            }
            &:last-child {
                border: none;
                margin-top: 12px;
                background-color: #0095f6;
                color: white;
                text-align: center;
                padding: 8px 0px;
                font-weight: 600;
            }
        }
    }
`

const BottomBox = styled(WhiteBox)`
    padding: 20px 40px;
    text-align: center;
    a {
        font-weight: 600;
        color: #0095f6;
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
        background-color: rgb(219, 219, 219);
    }
    span {
        margin: 0px 10px;
        font-weight: 600;
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

const ForgotPassword = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 12px;
        color: #00376b;
    }
`

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <form>
                        <input type='text' placeholder="Username" />
                        <input type='password' placeholder="Password" />
                        <input type='submit' value="Log in" />
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
                    <ForgotPassword>
                        <span>Forgot password?</span>
                    </ForgotPassword>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span>
                    <a href="#">Sign up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    )
}
export default Login;