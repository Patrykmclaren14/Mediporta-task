import Footer from './Footer';
import { InferProps, Requireable } from 'prop-types';
import { JSX } from 'react/jsx-runtime';
  
export default {
  title: 'Footer',
  component: Footer,
};

export const Docs = (args: JSX.IntrinsicAttributes & Pick<unknown, never> & Pick<InferProps<{ label: Requireable<string>; size: Requireable<string>; link: Requireable<string>; }>, "label" | "size" | "link">) => <Footer {...args} />;

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
