# Sanity CMS for Medusa Dummy Store

A Sanity Studio instance for managing content in the Medusa Dummy Store project. This application provides a headless CMS interface for managing website content.

## Overview

This Sanity studio is configured to manage content for the Medusa e-commerce store, providing a user-friendly interface for content editors to update website elements without requiring code changes.

## Project Structure

```
apps/sanity/
├── schemas/            # Content type definitions
│   ├── partials/       # partial Content type definitions
│   └── index.ts        # Schema exports
├── structure/          # Studio structure configuration
│   └── index.ts        # Custom studio navigation
├── .env.template       # Environment variable template
├── package.json        # Environment variables template
├── sanity.config.ts    # Main Sanity configuration
└── tsconfig.json       # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Sanity account and project
- Environment variables configured

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

2. Configure your environment variables:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_API_VERSION=2023-05-03
   ```

### Installation

From the project root:
```bash
# Install dependencies
pnpm install

# Navigate to sanity app
cd apps/sanity
```

### Development

Start the development server:
```bash
pnpm dev
```

The studio will be available at `http://localhost:3333`

### Available Scripts

- `pnpm dev` - Start development server on port 3333
- `pnpm start` - Start production server on port 3333
- `pnpm build` - Build the studio for production
- `pnpm deploy` - Deploy studio to Sanity's hosting
- `pnpm deploy-graphql` - Deploy GraphQL API
- `pnpm lint` - Run ESLint to check code quality
- `pnpm lint:fix` - Run ESLint and automatically fix issues

## Configuration

### Main Configuration (`sanity.config.ts`)

The studio is configured with:
- **Project Name**: "Medusa Dummy Store"
- **Plugins**:
  - `structureTool` - Custom studio structure
  - `visionTool` - GROQ query testing
  - `media` - Enhanced media management
- **Custom Structure**: Organized navigation for content types

### Content Schemas

#### Footer Schema (`schemas/footer.ts`)

Manages footer content with the following fields:

- **Store Name** (required): Display name for the store
- **Social Media Links**: Array of social media links
  - Text: Display text for the link
  - URL: Social media URL
- **Copyright Text** (required): Copyright notice
- **Call to Action**: Optional CTA section
  - Text: CTA button text
  - URL: CTA destination
  - Icon: Optional CTA icon image

### Studio Structure (`structure/index.ts`)

Custom navigation structure organizing content into logical sections:
- **Navigation**: Contains footer content management

## Content Management

### Footer Content

The footer content is managed as a singleton document, meaning there's only one footer configuration that applies site-wide. Content editors can:

1. Update the store name
2. Manage social media links (add/remove/edit)
3. Modify copyright text
4. Configure call-to-action elements

### Adding New Content Types

To add new schemas:

1. Create a new schema file in `schemas/`
2. Export it from `schemas/index.ts`
3. Update the structure in `structure/index.ts` if needed

Example:
```typescript
// schemas/newContent.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newContent',
  title: 'New Content Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    })
  ]
})
```

**Running Linting**:
```bash
# Check for linting issues
pnpm lint

# Auto-fix issues where possible
pnpm lint:fix
```

**Ignored Files** (`.eslintignore`):
- `.sanity/` - Generated Sanity studio files
- `dist/` - Build outputs
- `node_modules/` - Dependencies

