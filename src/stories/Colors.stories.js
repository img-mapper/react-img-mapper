import React from 'react';
import Mapper from './components/Mapper';

const Colors = {
  title: 'Examples/Colors',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const FillColor = () => <Mapper customType="fill" customJSON={0} />;

export const InArrayFillColor = () => <Mapper customType="fill" />;

export const DynamicFillColor = args => (
  <Mapper customType="fill" customJSON={0} fillColor={args.fillColor} />
);

DynamicFillColor.args = {
  fillColor: 'rgba(255, 255, 255, 0.5)',
};

DynamicFillColor.argTypes = {
  fillColor: { control: 'color' },
};

export const DynamicMixArrayFillColor = args => (
  <Mapper customType="fill" customJSON={1} fillColor={args.fillColor} />
);

DynamicMixArrayFillColor.args = {
  fillColor: 'rgba(255, 255, 255, 0.5)',
};

DynamicMixArrayFillColor.argTypes = {
  fillColor: { control: 'color' },
};

export const StrokeColor = () => <Mapper customType="stroke" customJSON={0} lineWidth={4} />;

export const InArrayStrokeColor = () => <Mapper customType="stroke" lineWidth={2} />;

export const DynamicStrokeColor = args => (
  <Mapper
    customType="stroke"
    customJSON={0}
    lineWidth={args.lineWidth}
    strokeColor={args.strokeColor}
  />
);

DynamicStrokeColor.args = {
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
};

DynamicStrokeColor.argTypes = {
  strokeColor: { control: 'color' },
  lineWidth: { control: 'number' },
};

export const DynamicMixArrayStrokeColor = args => (
  <Mapper
    customType="stroke"
    customJSON={1}
    lineWidth={args.lineWidth}
    strokeColor={args.strokeColor}
  />
);

DynamicMixArrayStrokeColor.args = {
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
};

DynamicMixArrayStrokeColor.argTypes = {
  strokeColor: { control: 'color' },
  lineWidth: { control: 'number' },
};

export default Colors;
