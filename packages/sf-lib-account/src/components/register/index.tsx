'use client';

import { useActionState } from 'react';

import { ErrorMessage } from '@gfed-medusa/sf-lib-common/components/error-message';
import { LocalizedClientLink } from '@gfed-medusa/sf-lib-common/components/localized-client-link';
import { SubmitButton } from '@gfed-medusa/sf-lib-common/components/submit-button';
import { MedusaInput } from '@gfed-medusa/sf-lib-ui/components/medusa-input';

import { signup } from '@/lib/data/customer';

import { LOGIN_VIEW } from '../login-template/login-template';

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void;
};

const Register = ({ setCurrentView }: Props) => {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <div
      className="flex max-w-sm flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi mb-6 uppercase">
        Become a Medusa Store Member
      </h1>
      <p className="text-base-regular text-ui-fg-base mb-4 text-center">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form className="flex w-full flex-col" action={formAction}>
        <div className="flex w-full flex-col gap-y-2">
          <MedusaInput
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <MedusaInput
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <MedusaInput
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <MedusaInput
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <MedusaInput
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        {state?.status === 'error' && (
          <ErrorMessage error={state?.message} data-testid="register-error" />
        )}
        {state?.status === 'success' && (
          <div className="text-small-regular pt-2 text-green-700">
            {state?.message}
          </div>
        )}
        <span className="text-small-regular text-ui-fg-base mt-6 text-center">
          By creating an account, you agree to Medusa Store&apos;s{' '}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{' '}
          and{' '}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton
          className="mt-6 w-full"
          data-testid="register-button"
          isLoading={isPending}
        >
          Join
        </SubmitButton>
      </form>
      <span className="text-small-regular text-ui-fg-base mt-6 text-center">
        Already a member?{' '}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  );
};

export { Register };
