import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import AuthLayout from "../component/auth/AuthLayout";
import { FatLink } from "../component/shared";
import Input from "../component/auth/Input";
import Button from "../component/auth/Button";
import Separator from "../component/auth/Separator";
import FormBox from "../component/auth/FormBox";
import BottomBox from "../component/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../component/PageTitle";
import FormError from "../component/auth/FormError";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin: 10px 0px 10px 0px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $userName: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName 
            userName: $userName
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;

const Signup = () => {
    const history = useHistory();
    const onCompleted = (data) => {
        const { userName, password } = getValues();
        const { createAccount: { ok } } = data;
        if (!ok) {
            return;
        }
        history.push(routes.home, {
            message: "Account created. Please log in.",
            userName,
            password
        });
    }
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
    const { register, handleSubmit, formState, getValues } = useForm({ mode: "onChange" });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: { ...data }
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                    <Subtitle>Sign up to see photos and videos from your friends.</Subtitle>
                </HeaderContainer>
                <Button
                    type="button"
                    onclick="window.location.href='https://www.facebook.com/login';"
                    value="Log in with Facebook"
                />

                <Separator />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("firstName", { required: "First Name is required." })}
                        type='text'
                        placeholder="Firstname"
                        hasError={Boolean(formState.errors?.firstName?.message)}
                    />
                    <FormError message={formState.errors?.firstName?.message} />
                    <Input type='text' name="lastName" placeholder="Lastname (Option)" />
                    <Input
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "Invalid email format."
                            }
                        })}
                        type='email'
                        placeholder="Email"
                        hasError={Boolean(formState.errors?.email?.message)}
                    />
                    <FormError message={formState.errors?.email?.message} />
                    <Input
                        {...register("userName", {
                            required: "User Name is required.",
                            minLength: {
                                value: 3,
                                message: "Username should be longer than 3 chars."
                            },
                            maxLength: {
                                value: 24,
                                message: "Username should be shorter than 24 chars."
                            }
                        })}
                        type='text'
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.userName?.message)}
                    />
                    <FormError message={formState.errors?.userName?.message} />
                    <Input
                        {...register("password", {
                            required: "Password is required.",
                            pattern: {
                                value: /^[a-z0-9]{8,20}$/i,
                                message: "숫자와 영소문자 조합으로 8~20자리를 사용해야 합니다."
                            }
                        })}
                        type='password'
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <Button
                        type='submit'
                        value={loading ? "Loading.." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />
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