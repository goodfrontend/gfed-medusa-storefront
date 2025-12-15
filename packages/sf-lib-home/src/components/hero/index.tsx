import { Github } from '@medusajs/icons';
import { Button, Heading } from '@medusajs/ui';

export function Hero() {
  return (
    <div className="border-ui-border-base bg-ui-bg-subtle relative h-[75vh] w-full border-b">
      <div className="small:p-32 absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center">
        <span>
          <Heading
            level="h1"
            className="text-ui-fg-base text-3xl font-normal leading-10"
          >
            Ecommerce Starter Template
          </Heading>
          <Heading
            level="h2"
            className="text-ui-fg-subtle text-3xl font-normal leading-10"
          >
            Powered by Medusa and Next.js
          </Heading>
        </span>
        <a
          href="https://github.com/medusajs/nextjs-starter-medusa"
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="secondary">
            View on GitHub
            <Github />
          </Button>
        </a>
      </div>
    </div>
  );
}
