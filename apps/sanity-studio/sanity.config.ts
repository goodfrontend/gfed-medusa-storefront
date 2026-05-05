import 'dotenv';
import { PluginOptions, defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';

import { fieldLevelExperiments } from '@sanity/personalization-plugin';
import { visionTool } from '@sanity/vision';

import { audiences } from './config/audiences';
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
    fieldLevelExperiments({
      fields: ['string', 'text', 'image'],
      experiments: audiences,
      experimentNameOverride: 'audience',
      variantNameOverride: 'segment',
    }),
  ] as PluginOptions[],

  schema: {
    types: schemaTypes,
  },
});
