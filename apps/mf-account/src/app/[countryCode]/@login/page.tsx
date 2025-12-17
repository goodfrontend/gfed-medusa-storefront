import { Metadata } from 'next';

// TODO: Update sf-lib-account so that login-template is exported in index.tsx
// Requires major version update for sf-lib-account
import LoginTemplate from '@/modules/account/templates/login-template';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Medusa Store account.',
};

export default function Login() {
  return <LoginTemplate />;
}
