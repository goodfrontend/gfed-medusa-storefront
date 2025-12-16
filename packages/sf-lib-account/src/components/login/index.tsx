import { FormEvent } from 'react';

import { useMutation } from '@apollo/client/react';
import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { SubmitButton } from '@gfed-medusa/sf-lib-common/components/submit-button';
import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';

import { postLogin } from '@/lib/data/customer';
import { LOGIN_MUTATION } from '@/lib/gql/mutations/customer';
import { LoginMutation } from '@/types/graphql';

import { LOGIN_VIEW } from '../login-template/login-template';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({ setCurrentView }: Props) => {
  const [login, { error, loading, data }] =
    useMutation<LoginMutation>(LOGIN_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });

      const token = data?.login?.token;

      await postLogin(token);
    } catch (err) {
      console.error('An error occurred during logging in', err);
    }
  };

  return (
    <div
      className="flex w-full max-w-sm flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">Welcome back</h1>
      <p className="text-base-regular text-ui-fg-base mb-8 text-center">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <MedusaInput
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <MedusaInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        {error && (
          <ErrorMessage
            error={error.message}
            data-testid="login-error-message"
          />
        )}
        {data && (
          <div className="text-small-regular pt-2 text-green-700">
            Login successful
          </div>
        )}
        <SubmitButton
          data-testid="sign-in-button"
          className="mt-6 w-full"
          isLoading={loading}
        >
          Sign in
        </SubmitButton>
      </form>
      <span className="text-small-regular text-ui-fg-base mt-6 text-center">
        Not a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  );
};

export { Login };
