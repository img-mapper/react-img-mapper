import React from 'react';
import Mapper from './components/Mapper';

const SimpleApp = {
  title: 'Examples/Simple',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Simple = () => <Mapper />;

export default SimpleApp;
