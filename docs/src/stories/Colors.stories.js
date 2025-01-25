import React from 'react';
import Mapper from './components/Mapper';
import { TopComponent } from './codes/common';
import {
  fillColor,
  inArrayFillColor,
  dynamicFillColor,
  dynamicMixArrayFillColor,
  strokeColor,
  inArrayStrokeColor,
  dynamicStrokeColor,
  dynamicMixArrayStrokeColor,
} from './codes/colors';

const Colors = {
  title: 'Examples/Colors',
  component: Mapper,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

// 1 => FillColor
export const FillColor = () => (
  <Mapper
    customType="fill"
    customJSON={0}
    TopComponent={() =>
      TopComponent(
        'Default Fill Color Example',
        <p>
          In this example, the <span className="tag">fillColor</span> property is not available in{' '}
          <span className="tag">areas</span> JSON, that's why it's giving the default behavior of
          mapper by applying default <span className="tag">fillColor</span>.
        </p>
      )
    }
  />
);

FillColor.parameters = {
  code: fillColor,
};

// 2 => InArrayFillColor
export const InArrayFillColor = () => (
  <Mapper
    customType="fill"
    TopComponent={() =>
      TopComponent(
        'Fill Color based on Area JSON Example',
        <p>
          In this example, the <span className="tag">fillColor</span> property is available in{' '}
          <span className="tag">areas</span> JSON, that's why it's applying{' '}
          <span className="tag">fillColor</span> from JSON and we can see different{' '}
          <span className="tag">fillColor</span> for different <span className="tag">areas</span>.
        </p>
      )
    }
  />
);

InArrayFillColor.parameters = {
  code: inArrayFillColor,
};

// 3 => DynamicFillColor
export const DynamicFillColor = args => (
  <Mapper
    customType="fill"
    customJSON={0}
    fillColor={args.fillColor}
    TopComponent={() =>
      TopComponent(
        'Dynamic Fill Color Example',
        <p>
          In this example, you can access the storybook <span className="tag">control tab</span> to
          dynamically select <span className="tag">fillColor</span> property and change it according
          to your preference.
          <br />
          <br />
          <span className="block">
            Note: For better results you can decrease the opacity of the fillColor.
          </span>
        </p>
      )
    }
  />
);

DynamicFillColor.parameters = {
  code: dynamicFillColor,
};

DynamicFillColor.args = {
  fillColor: 'rgba(255, 255, 255, 0.5)',
};

DynamicFillColor.argTypes = {
  fillColor: { control: 'color' },
};

// 4 => DynamicMixArrayFillColor
export const DynamicMixArrayFillColor = args => (
  <Mapper
    customType="fill"
    customJSON={1}
    fillColor={args.fillColor}
    TopComponent={() =>
      TopComponent(
        'Dynamic Mix Array Fill Color Example',
        <p>
          in case, if we want to <span className="tag">exclude</span> an area of an image from the{' '}
          <span className="tag">whole</span> image. For example, here we have excluded the{' '}
          <span className="tag">wall area</span>
          and any changes to the <span className="tag">fillcolor</span> property from the{' '}
          <span className="tag">control tab</span> would be only applied to the{' '}
          <span className="tag">wall area</span>.
          <br />
          <br />
          <span className="block">
            Note: <span className="tag">fillColor</span> property for the remaining area is already
            available in the JSON area
          </span>
        </p>
      )
    }
  />
);

DynamicMixArrayFillColor.parameters = {
  code: dynamicMixArrayFillColor,
};

DynamicMixArrayFillColor.args = {
  fillColor: 'rgba(255, 255, 255, 0.5)',
};

DynamicMixArrayFillColor.argTypes = {
  fillColor: { control: 'color' },
};

// 5 => StrokeColor
export const StrokeColor = () => (
  <Mapper
    customType="stroke"
    customJSON={0}
    lineWidth={2}
    TopComponent={() =>
      TopComponent(
        'Default Stroke Color Example',
        <p>
          In this example, the <span className="tag">strokeColor</span> property is not available in{' '}
          <span className="tag">areas</span> JSON, that's why it's giving the default behavior of
          mapper by applying default <span className="tag">strokeColor</span>.
        </p>
      )
    }
  />
);

StrokeColor.parameters = {
  code: strokeColor,
};

// 6 => InArrayStrokeColor
export const InArrayStrokeColor = () => (
  <Mapper
    customType="stroke"
    lineWidth={2}
    TopComponent={() =>
      TopComponent(
        'Stroke Color based on Area JSON Example',
        <p>
          In this example, the <span className="tag">strokeColor</span> property is available in{' '}
          <span className="tag">areas</span> JSON, that's why it's applying{' '}
          <span className="tag">strokeColor</span> from JSON.
        </p>
      )
    }
  />
);

InArrayStrokeColor.parameters = {
  code: inArrayStrokeColor,
};

// 7 => DynamicStrokeColor
export const DynamicStrokeColor = args => (
  <Mapper
    customType="stroke"
    customJSON={0}
    lineWidth={args.lineWidth}
    strokeColor={args.strokeColor}
    TopComponent={() =>
      TopComponent(
        'Dynamic Stroke Color Example',
        <p>
          <p>
            In this example, you can access the storybook <span className="tag">control tab</span>{' '}
            to dynamically select <span className="tag">strokeColor</span>,{' '}
            <span className="tag">lineWidth</span> properties and change it according to your
            preference.
          </p>
        </p>
      )
    }
  />
);

DynamicStrokeColor.parameters = {
  code: dynamicStrokeColor,
};

DynamicStrokeColor.args = {
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
};

DynamicStrokeColor.argTypes = {
  strokeColor: { control: 'color' },
  lineWidth: { control: 'number' },
};

// 8 => DynamicMixArrayStrokeColor
export const DynamicMixArrayStrokeColor = args => (
  <Mapper
    customType="stroke"
    customJSON={1}
    lineWidth={args.lineWidth}
    strokeColor={args.strokeColor}
    TopComponent={() =>
      TopComponent(
        'Dynamic Mix Array Stroke Color Example',
        <p>
          in case, if we want to <span className="tag">exclude</span> an area of an image from the{' '}
          <span className="tag">whole</span> image. For example, here we have excluded the{' '}
          <span className="tag">wall area</span>
          and any changes to the <span className="tag">strokeColor</span> property from the{' '}
          <span className="tag">control tab</span> would be only applied to the{' '}
          <span className="tag">wall area</span>. Here, if you did any changes to the{' '}
          <span className="tag">lineWidth</span> property from the{' '}
          <span className="tag">control tab</span> would be applied to every area.
          <br />
          <br />
          <span className="block">
            Note: <span className="tag">strokeColor</span> property for the remaining area is
            already available in the JSON area
          </span>
        </p>
      )
    }
  />
);

DynamicMixArrayStrokeColor.parameters = {
  code: dynamicMixArrayStrokeColor,
};

DynamicMixArrayStrokeColor.args = {
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
};

DynamicMixArrayStrokeColor.argTypes = {
  strokeColor: { control: 'color' },
  lineWidth: { control: 'number' },
};

export default Colors;
