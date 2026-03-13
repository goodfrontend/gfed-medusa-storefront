'use client';

import { Button } from '@medusajs/ui';

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

const LoginTemplate = ({ bffBaseUrl }: { bffBaseUrl: string }) => {
  const goToLogin = () => {
    window.location.href = `${bffBaseUrl}/auth/login`;
  };

  return (
    <div className="flex w-full justify-start px-8 py-8">
      <div className="flex w-full max-w-sm flex-col items-center">
        <Button onClick={goToLogin} type="button">
          Register or Login to View Your Account
        </Button>
      </div>
    </div>
  );
};

export default LoginTemplate;
