import { JSX } from 'react/jsx-runtime';
import Home from './Home';

export default {
  title: 'Home',
  component: Home,
};

export const Docs = (args: JSX.IntrinsicAttributes) => <Home {...args} />;

Docs.args = {
  size: 'md',
};

Docs.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};
