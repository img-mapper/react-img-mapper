import React from 'react';
import Mapper from './components/Mapper';
import { TopComponent } from './codes/common';
import { nonResponsiveDimensions, responsiveDimensions, allDimensions } from './codes/map';

const Map = {
  title: 'Examples/Responsive Map',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

// 1 => NonResponsiveDimensions
export const NonResponsiveDimensions = args => (
  <Mapper
    width={args.width}
    height={args.height}
    imgWidth={args.imgWidth}
    natural={args.natural}
    TopComponent={() =>
      TopComponent(
        'Non Responsive Dimensions Example',
        <p>
          In this example, <span className="tag">width</span>, <span className="tag">height</span>,{' '}
          <span className="tag">imgWidth</span>, and <span className="tag">natural</span> properties
          are available in the storybook <span className="tag">controls tab</span>, you can change
          it and see the <span className="tag">live</span> results in the image mapper.
          <br />
          <br />
          By applying different values in different fields, you will notice that making the img
          mapper <span className="tag">responsive</span> is difficult.
          <br />
          <br />
          <span className="block">
            Note: All the properties description and what it does it's available in{' '}
            <span className="tag">react img mapper</span> Github repo.
          </span>
        </p>
      )
    }
  />
);

NonResponsiveDimensions.parameters = {
  code: nonResponsiveDimensions,
};

NonResponsiveDimensions.args = {
  width: 640,
  height: 480,
  imgWidth: 0,
  natural: false,
};

NonResponsiveDimensions.argTypes = {
  width: { control: 'number' },
  height: { control: 'number' },
  imgWidth: { control: 'number' },
  natural: { control: 'boolean' },
};

// 2 => ResponsiveDimensions
export const ResponsiveDimensions = args => (
  <Mapper
    responsive
    parentWidth={args.parentWidth}
    TopComponent={() =>
      TopComponent(
        'Responsive Dimensions Example',
        <p>
          In this example, <span className="tag">responsive</span> and{' '}
          <span className="tag">parentWidth</span>
          property is available in the storybook <span className="tag">controls tab</span>, you can
          change it and see the <span className="tag">live</span> results in the image mapper
          <br />
          <br />
          By applying different values in <span className="tag">parentWidth</span> field, you will
          think, it's already responsive, lets copy the code and see the results, kudos!!
          <br />
          <br />
          <span className="block">
            Note: All the properties description and what it does it's available in{' '}
            <span className="tag">react img mapper</span> Github repo.
          </span>
        </p>
      )
    }
  />
);

ResponsiveDimensions.parameters = {
  code: responsiveDimensions,
};

ResponsiveDimensions.args = {
  parentWidth: 640,
};

ResponsiveDimensions.argTypes = {
  parentWidth: { control: 'number' },
};

// 3 => AllDimensions
export const AllDimensions = args => (
  <Mapper
    width={args.width}
    height={args.height}
    imgWidth={args.imgWidth}
    natural={args.natural}
    responsive={args.responsive}
    parentWidth={args.parentWidth}
    TopComponent={() =>
      TopComponent(
        'All Dimensions Example',
        <p>
          All the fields description and what they do it's available in the{' '}
          <span className="tag">react img mapper</span> GitHub repository.
          <br />
          <br />
          In this example, <span className="tag">width</span>, <span className="tag">height</span>,{' '}
          <span className="tag">imgWidth</span>, <span className="tag">natural</span>,{' '}
          <span className="tag">responsive</span>, and <span className="tag">parentWidth</span>
          field is available in the storybook <span className="tag">controls tab</span>, you can
          change it and see the <span className="tag">live</span> results in the image mapper
          <br />
          <br />
          It's is a mixture of all responsive & non-responsive properties, have fun.
        </p>
      )
    }
  />
);

AllDimensions.parameters = {
  code: allDimensions,
};

AllDimensions.args = {
  width: 640,
  height: 480,
  imgWidth: 0,
  natural: false,
  responsive: false,
  parentWidth: 640,
};

AllDimensions.argTypes = {
  width: { control: 'number' },
  height: { control: 'number' },
  imgWidth: { control: 'number' },
  natural: { control: 'boolean' },
  responsive: { control: 'boolean' },
  parentWidth: { control: 'number' },
};

export default Map;
