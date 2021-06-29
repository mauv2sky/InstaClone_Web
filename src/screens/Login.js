import styled from "styled-components";

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
    padding: 20px 0px;
    text-align: center;
`

const Separator = styled.div`

`

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <h1>Instagram</h1>
                    <form>
                        <input type='text' placeholder="Username" />
                        <input type='password' placeholder="Password" />
                        <input type='submit' value="Log in" />
                    </form>
                    <div>
                        OR
                    </div>
                    <div>
                        <span>Log in with Facebook</span>
                    </div>
                    <span>Forget password?</span>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span>
                    <span>Sign up</span>
                </BottomBox>
            </Wrapper>
            <div>
                <span>Get the app.</span>
                <button>App Store</button>
                <button>Google Play</button>
            </div>
        </Container>
    )
}
export default Login;