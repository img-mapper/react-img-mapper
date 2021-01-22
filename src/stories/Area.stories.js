import React from 'react';
import Mapper from './components/Mapper';

const Area = {
  title: 'Examples/Area',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const ShowHighlightedArea = args => <Mapper active={args.active} />;

ShowHighlightedArea.args = {
  active: true,
};

ShowHighlightedArea.argTypes = {
  active: { control: 'boolean' },
};

export const StaySelectedHighlightedArea = args => <Mapper stayHighlighted={args.stayHighlighted} />;

StaySelectedHighlightedArea.args = {
  stayHighlighted: true,
};

StaySelectedHighlightedArea.argTypes = {
  stayHighlighted: { control: 'boolean' },
};

export default Area;
