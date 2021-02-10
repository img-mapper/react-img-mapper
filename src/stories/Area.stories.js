import React, { Fragment, useRef } from 'react';
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

export const StaySelectedHighlightedArea = args => (
  <Mapper stayHighlighted={args.stayHighlighted} />
);

StaySelectedHighlightedArea.args = {
  stayHighlighted: true,
};

StaySelectedHighlightedArea.argTypes = {
  stayHighlighted: { control: 'boolean' },
};

export const StayMultipleSelectedHighlightedArea = args => {
  const myRef = useRef(null);

  const callingMe = () => {
    myRef.current.clearHighlightedArea();
  };

  return (
    <Mapper
      containerRef={myRef}
      stayMultiHighlighted={args.stayMultiHighlighted}
      TopComponent={() => (
        <Fragment>
          <p>For Clear Multiple Selected Highlight</p>
          <button type="button" onClick={callingMe}>
            Clear
          </button>
        </Fragment>
      )}
    />
  );
};

StayMultipleSelectedHighlightedArea.args = {
  stayMultiHighlighted: true,
};

StayMultipleSelectedHighlightedArea.argTypes = {
  stayMultiHighlighted: { control: 'boolean' },
};

export const ToggleStayHighlightedArea = args => (
  <Mapper
    stayHighlighted={args.stayHighlighted}
    stayMultiHighlighted={args.stayMultiHighlighted}
    toggleHighlighted={args.toggleHighlighted}
  />
);

ToggleStayHighlightedArea.args = {
  stayHighlighted: true,
  stayMultiHighlighted: false,
  toggleHighlighted: true,
};

ToggleStayHighlightedArea.argTypes = {
  stayHighlighted: { control: 'boolean' },
  stayMultiHighlighted: { control: 'boolean' },
  toggleHighlighted: { control: 'boolean' },
};

export default Area;
