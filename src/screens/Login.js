import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { logUserIn } from '../apollo';
import routes from '../routes';
import AuthLayout from '../component/auth/AuthLayout';
import Input from '../component/auth/Input';
import Button from '../component/auth/Button';
import Separator from '../component/auth/Separator';
import FormBox from '../component/auth/FormBox';
import BottomBox from '../component/auth/BottomBox';
import PageTitle from '../component/PageTitle';
import FormError from '../component/auth/FormError';

const Notification = styled.div`
    display: flex;
    justify-content: center;
    height: 10px;
    margin-bottom: 40px;
    font-weight: 700;
    color: #2ecc71;
`;

const FacebookLogin = styled.div`
    color: #385285;
    margin-top: 20px;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const LOGIN_MUTATION = gql`
    mutation login($userName: String!, $password: String!) {
        login(userName: $userName, password: $password) {
            ok
            token
            error
        }
    }
`;

const Login = () => {
    const location = useLocation();
    const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: 'onChange',
        defaultValues: {
            userName: location?.state?.userName || '',
            password: location?.state?.password || '',
        },
    });
    const onCompleted = (data) => {
        const {
            login: { ok, token, error },
        } = data;
        if (!ok) {
            return setError('result', { message: error });
        }
        if (token) {
            logUserIn(token);
        }
    };
    const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
    const onSubmitValid = () => {
        const { userName, password } = getValues();
        login({
            variables: { userName, password },
        });
    };
    const noti = (data) => {
        if (Boolean(data)) {
            return '🙂 ' + data;
        }
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <Notification>{noti(location?.state?.message)}</Notification>
            <FormBox>
                <FontAwesomeIcon icon={faInstagram} size="3x" />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input
                        {...register('userName', {
                            required: 'Username is required.',
                            minLength: 3,
                            message: 'Username should be longer than 5 chars.',
                        })}
                        onFocus={() => clearErrors()}
                        type="text"
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.userName?.message)}
                    />
                    <FormError message={formState.errors?.userName?.message} />
                    <Input {...register('password', { required: 'Password is required.' })} onFocus={() => clearErrors()} type="password" placeholder="Password" hasError={Boolean(formState.errors?.password?.message)} />
                    <FormError message={formState.errors?.password?.message} />
                    <Button type="submit" value={loading ? 'Loading..' : 'Log in'} disabled={!formState.isValid || loading} />
                    <FormError message={formState.errors?.result?.message} />
                </form>
                <Separator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
            </FormBox>
            <BottomBox cta="Don't have an account?" linkText="Sign up" link={routes.signUp} />
        </AuthLayout>
    );
};
export default Login;
