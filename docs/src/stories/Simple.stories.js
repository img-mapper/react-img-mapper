import React from 'react';
import Mapper from './components/Mapper';
import simple from './codes/simple';

const SimpleApp = {
  title: 'Examples/Simple',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const TopComponent = () => (
  <div className="top_container">
    <h1 className="title">Simple Example</h1>
    <div className="top_content">
      <p>Simple Example with default properties and required properties</p>
    </div>
  </div>
);

export const Simple = () => <Mapper TopComponent={TopComponent} />;

Simple.parameters = {
  code: simple,
};

export default SimpleApp;
