import React from 'react';
import DynamicMapper from './components/DynamicMapper';
import { dynamicAllProperties } from './codes/dynamic';

const Dynamic = {
  title: 'Examples/Dynamic All Properties',
  component: DynamicMapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    fillColor: { control: 'color' },
    strokeColor: { control: 'color' },
    lineWidth: { control: 'number' },
  },
};

export const DynamicAllProperties = args => <DynamicMapper {...args} />;

DynamicAllProperties.parameters = {
  code: dynamicAllProperties,
};

export default Dynamic;
