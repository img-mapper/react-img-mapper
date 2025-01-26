import React from 'react';
import DynamicMapper from './components/DynamicMapper';
import { dynamicAllProperties } from './codes/dynamic';

const Dynamic = {
  title: 'Examples/Dynamic All Properties',
  component: DynamicMapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const DynamicAllProperties = args => <DynamicMapper {...args} />;

DynamicAllProperties.argTypes = {
  isMulti: { control: 'boolean' },
  toggle: { control: 'boolean' },
  active: { control: 'boolean' },
  disabled: { control: 'boolean' },
  fillColor: { control: 'color' },
  strokeColor: { control: 'color' },
  lineWidth: { control: 'number' },
  imgWidth: { control: 'number' },
  width: { control: 'number' },
  height: { control: 'number' },
  natural: { control: 'boolean' },
  responsive: { control: 'boolean' },
  parentWidth: { control: 'number' },
};

DynamicAllProperties.args = {
  isMulti: true,
  toggle: false,
  active: true,
  disabled: false,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
  imgWidth: 0,
  width: 0,
  height: 0,
  natural: false,
  responsive: false,
  parentWidth: 0,
};

DynamicAllProperties.parameters = {
  code: dynamicAllProperties,
};

export default Dynamic;
