import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your JustGood Store account.',
};

export default function Login() {
  const bffBaseUrl = process.env.NEXT_PUBLIC_BFF_BASE_URL ?? '';
  redirect(`${bffBaseUrl}/auth/login`);
}
