import path from 'path';
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    "builder": "@storybook/builder-vite"
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {
        alias: { '@': path.resolve(__dirname, '../src') },
      },
    });
  },
};
export default config;
