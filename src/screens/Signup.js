import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import AuthLayout from "../component/auth/AuthLayout";
import { FatLink } from "../component/shared";
import Input from "../component/auth/Input";
import Button from "../component/auth/Button";
import Separator from "../component/auth/Separator";
import FormBox from "../component/auth/FormBox";
import BottomBox from "../component/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../component/PageTitle";

const FacebookSignup = styled.div`
    color: #385285;
    padding-top: 30px;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const Signup = () => {
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
                </HeaderContainer>
                <FacebookSignup>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Sign up with Facebook</span>
                </FacebookSignup>
                <Separator />
                <form>
                    <Input type='text' name="firstName" placeholder="Firstname" />
                    <Input type='text' name="lastName" placeholder="Lastname" />
                    <Input type='text' name="email" placeholder="Email" />
                    <Input type='text' name="userName" placeholder="Username" />
                    <Input type='password' name="password" placeholder="Password" />
                    <Button type='submit' value="Sign up" />
                </form>
            </FormBox>
            <BottomBox
                cta="Have an account?"
                linkText="Log in"
                link={routes.home}
            />
        </AuthLayout>
    );
}
export default Signup;