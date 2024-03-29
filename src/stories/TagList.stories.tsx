import { InferProps, Requireable } from 'prop-types';
import { JSX } from 'react/jsx-runtime';
import TagList from './TagList';

export default {
  title: 'TagList',
  component: TagList,
  parameters: {
    notes: 'Ten komponent wyświetla listę tagów w tabeli z możliwością sortowania i paginacji.',
  },
};

export const Docs = (args: JSX.IntrinsicAttributes & Pick<{ state: string; orderType: string; sortType: string; }, "state" | "orderType" | "sortType"> & Pick<InferProps<{ state: Requireable<string>; orderType: Requireable<string>; sortType: Requireable<string>; }>, never> & Pick<{ state: string; orderType: string; sortType: string; }, never>) => <TagList {...args} />;

Docs.args = {
  state: 'tags',
  orderType: 'desc',
  sortType: 'popular',
};

Docs.argTypes = {
  state: {
    control: {
      type: 'radio',
      options: ['error', 'isLoading', 'tags'],
    },
  },
  orderType: {
    control: {
      type: 'radio',
      options: ['desc', 'asc'],
    },
  },
  sortType: {
    control: {
      type: 'radio',
      options: ['popular', 'name'],
    },
  },
};