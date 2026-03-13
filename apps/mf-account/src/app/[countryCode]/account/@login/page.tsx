import { Metadata } from 'next';

import LoginTemplate from '@/modules/account/templates';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Medusa Store account.',
};

export default function Login() {
  const bffBaseUrl = process.env.NEXT_PUBLIC_BFF_BASE_URL ?? '';

  return <LoginTemplate bffBaseUrl={bffBaseUrl} />;
}
