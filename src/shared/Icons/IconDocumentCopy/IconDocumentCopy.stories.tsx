import type { Meta, StoryFn as Story } from '@storybook/react';

import { IconDocumentCopy } from '..';
import { IconProps } from '../types';

import { iconStorySettings } from '../constants';

export default {
  title: 'Icons/IconDocumentCopy',
  component: IconDocumentCopy,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconDocumentCopy {...args} />
);

export const Default = Template.bind({});
