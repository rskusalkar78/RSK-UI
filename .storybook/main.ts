import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  options: {
    storySort: {
      order: [
        'Documentation',
        'Guides',
        'Playground',
        'Components',
        'Form Components',
        'Layout',
        'Theme Engine',
        'Examples',
      ],
      method: 'alphabetical',
    },
  },
};

export default config;
