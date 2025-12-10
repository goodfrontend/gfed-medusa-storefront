import Medusa from '@medusajs/js-sdk';

const DEFAULT_MEDUSA_BACKEND_URL = 'http://localhost:9000';

const sdk = new Medusa({
  baseUrl:
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || DEFAULT_MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export { sdk };
