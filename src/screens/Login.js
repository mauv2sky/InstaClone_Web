import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"
import { useForm } from "react-hook-form";
import routes from "../routes";
import AuthLayout from "../component/auth/AuthLayout";
import Input from "../component/auth/Input";
import Button from "../component/auth/Button";
import Separator from "../component/auth/Separator";
import FormBox from "../component/auth/FormBox";
import BottomBox from "../component/auth/BottomBox";
import PageTitle from "../component/PageTitle";
import FormError from "../component/auth/FormError";

const FacebookLogin = styled.div`
    color: #385285;
    margin-top: 20px;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`

const Login = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: "onChange"
    });
    const onSubmitValid = (data) => {
        console.log(data);
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <FormBox>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register("username", {
                            required: "Username is required.",
                            minLength: 5,
                            message: "Username should be longer than 5 chars."
                        })}
                        type='text'
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <FormError message={formState.errors?.username?.message} />
                    <Input
                        {...register("password", { required: "Password is required." })}
                        type='password'
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <FormError message={formState.errors?.password?.message} />
                    <Button type='submit' value="Log in" disabled={!formState.isValid} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signUp}
            />
        </AuthLayout>
    )
}
export default Login;