'use client';

import * as React from 'react';

import { initializeWebFragments } from 'web-fragments';

if (typeof window !== 'undefined') initializeWebFragments();

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'web-fragment': React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }
// }

export function HeaderFragment() {
  return (
    <web-fragment
      fragment-id="header"
      src="/dk/fragments/header"
    ></web-fragment>
  );
}
