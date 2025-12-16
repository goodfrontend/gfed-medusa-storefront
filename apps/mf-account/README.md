# GFED Medusa Account Microfrontend

## Storefront Development Server Setup Instructions

1. Set up the environment variables. Copy the `.env.template` to a local `.env` and update the values as needed.

   ```bash
   cp .env.template .env
   ```

2. Copy the Publishable API key obtained from the medusa server by going to [Settings > Publishable API Keys](http://localhost:9000/app/settings/publishable-api-keys). Paste it as the value of the `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` env variable in your .env file.

3. Start the development server:

   ```bash
   pnpm run dev
   ```

   This will open the storefront app in [http://localhost:8000](http://localhost:8000).
