import Playground from '../components/playground/Playground';

export default {
  title: 'Playground/Interactive',
  component: Playground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Live playground for experimenting with component props and previewing generated JSX.',
      },
    },
  },
  tags: ['autodocs'],
};

export const Interactive = () => <Playground />;
