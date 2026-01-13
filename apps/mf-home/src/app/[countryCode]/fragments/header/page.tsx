import { Metadata } from 'next';

import { Nav } from '@gfed-medusa/sf-lib-common/components/nav';

export const metadata: Metadata = {
  title: 'Web Fragments: reframed',
};

export default function HeaderFragment() {
  return <Nav />;
}
