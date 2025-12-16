import { redirect } from 'next/navigation';

type Params = {
  params: Promise<{
    countryCode: string;
  }>;
};

export default async function CountryPage({ params }: Params) {
  const { countryCode } = await params;
  redirect(`/${countryCode}/store`);
}
