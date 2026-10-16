import React from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { UploadDropZone, UploadDropZoneProps, useDropZoneState } from '.';

export default {
  title: 'ui/Input/UploadDropZone',
  component: UploadDropZone,
  argTypes: {},
} as Meta;

export const UploadDropZoneExample = () => {
  const dropZoneState = useDropZoneState();
  return (
    <div>
      <h3>Uploader des fichier JPG & PNG : </h3>
      <UploadDropZone {...dropZoneState} />
    </div>
  );
};

const Template: Story<UploadDropZoneProps> = () => <UploadDropZoneExample />;

export const Default = Template.bind({});
