import Header from './Header';
import { InferProps, Requireable } from 'prop-types';
import { JSX } from 'react/jsx-runtime';

export default {
  title: 'Header',
  component: Header,
};

export const Docs = (args: JSX.IntrinsicAttributes & Pick<unknown, never> & Pick<InferProps<{ label: Requireable<string>; size: Requireable<string>; link: Requireable<string>; }>, "label" | "size" | "link">) => <Header {...args} />;

Docs.args = {
  size: 'md',
  link: 'home',
};

Docs.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  link: {
    control: {
      type: 'radio',
      options: ['home', 'task'],
    },
  },
};
