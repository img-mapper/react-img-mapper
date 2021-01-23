import React from 'react';
import Mapper from './components/Mapper';

const Map = {
  title: 'Examples/Responsive Map',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const NonResponsiveDimensions = args => (
  <Mapper
    width={args.width}
    height={args.height}
    imgWidth={args.imageWidth}
    natural={args.natural}
  />
);

NonResponsiveDimensions.args = {
  width: 640,
  height: 480,
  imageWidth: 0,
  natural: false,
};

NonResponsiveDimensions.argTypes = {
  width: { control: 'number' },
  height: { control: 'number' },
  imageWidth: { control: 'number' },
  natural: { control: 'boolean' },
};

export const ResponsiveDimensions = args => (
  <Mapper responsive={args.responsive} parentWidth={args.parentWidth} />
);

ResponsiveDimensions.args = {
  responsive: false,
  parentWidth: 640,
};

ResponsiveDimensions.argTypes = {
  responsive: { control: 'boolean' },
  parentWidth: { control: 'number' },
};

export const AllDimensions = args => (
  <Mapper
    width={args.width}
    height={args.height}
    imgWidth={args.imageWidth}
    natural={args.natural}
    responsive={args.responsive}
    parentWidth={args.parentWidth}
  />
);

AllDimensions.args = {
  width: 640,
  height: 480,
  imageWidth: 0,
  natural: false,
  responsive: false,
  parentWidth: 640,
};

AllDimensions.argTypes = {
  width: { control: 'number' },
  height: { control: 'number' },
  imageWidth: { control: 'number' },
  natural: { control: 'boolean' },
  responsive: { control: 'boolean' },
  parentWidth: { control: 'number' },
};

export default Map;
