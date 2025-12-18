import 'dotenv';
import { PluginOptions, defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';

import { visionTool } from '@sanity/vision';

import { schemaTypes } from './schemas';
import structure from './structure';

export default defineConfig({
  name: 'Medusa_Dummy_Store',
  title: 'Medusa Dummy Store',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2023-05-03',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
  ] as PluginOptions[],

  schema: {
    types: schemaTypes,
  },
});
