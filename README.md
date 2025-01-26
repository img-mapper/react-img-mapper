# React Img Mapper

**React Component to Highlight Interactive Zones in Images**

### Key Features:

1. Actively maintained repository.
2. Built with TypeScript.
3. Fully compatible with Next.js.
4. Optimized for smaller bundle size.
5. Comprehensive documentation.
6. Toggle and reset functionality for single and multiple highlighted areas.
7. Access image properties (width, height, etc.) using the `onLoad` callback.
8. Fully responsive image mapper.

---

## Installation

Install the package via your preferred package manager:

```bash
# npm
npm install react-img-mapper

# yarn
yarn add react-img-mapper

# pnpm
pnpm install react-img-mapper
```

---

## Demo & Examples

**Live Demo:** [View Demo](https://img-mapper.github.io/react-img-mapper)

To run the example locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/img-mapper/react-img-mapper.git
   ```
2. Install dependencies and start the dev server:
   ```bash
   pnpm playground:install
   pnpm playground:dev
   ```
3. Open [`localhost:3000`](http://localhost:3000) in your browser.

To build the project, run:

```bash
pnpm build
```

---

## Usage

Here’s how to integrate `react-img-mapper` into your project:

```javascript
import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = () => {
  const url =
    'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/resources/example.jpg';
  const name = 'my-map';
  // GET JSON FROM BELOW URL AS AN EXAMPLE AND PUT IT HERE
  const areas =
    'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/resources/areas.json';

  return <ImageMapper src={url} name={name} areas={areas} />;
};

export default Mapper;
```

---

## Properties

| **Prop**         | **Type**                   | **Description**                                                   | **Default**                |
| ---------------- | -------------------------- | ----------------------------------------------------------------- | -------------------------- |
| `src`            | _string_                   | URL of the image to display                                       | **required**               |
| `name`           | _string_                   | The name of the map, used to associate it with the image.         | **required**               |
| `areas`          | _array_                    | Array of **area objects**, please check **Area Properties** below | **required**               |
| `areaKeyName`    | _string_                   | Key name used to uniquely identify areas                          | `id`                       |
| `isMulti`        | _bool_                     | Allows multiple areas to be highlighted                           | `true`                     |
| `toggle`         | _bool_                     | Enables toggling highlights for selected areas                    | `false`                    |
| `active`         | _bool_                     | Enables area listeners and highlighting                           | `true`                     |
| `disabled`       | _bool_                     | Disable highlighting, listeners, and removes area tag             | `false`                    |
| `fillColor`      | _string_                   | Fill color of highlighted zones                                   | `rgba(255, 255, 255, 0.5)` |
| `strokeColor`    | _string_                   | Border color of highlighted zones                                 | `rgba(0, 0, 0, 0.5)`       |
| `lineWidth`      | _number_                   | Border thickness of highlighted zones                             | `1`                        |
| `imgWidth`       | _number_                   | Original width of the image                                       | `0`                        |
| `width`          | _number \| func => number_ | Image width (can use a function for dynamic sizing)               | `0`                        |
| `height`         | _number \| func => number_ | Image height (can use a function for dynamic sizing)              | `0`                        |
| `natural`        | _bool_                     | Use original dimensions for canvas and wrapper                    | `false`                    |
| `responsive`     | _bool_                     | Enable responsiveness (requires `parentWidth`)                    | `false`                    |
| `parentWidth`    | _number_                   | Maximum width of the parent container for responsiveness          | `0`                        |
| `containerProps` | _object_                   | Props for the container `<div>` element                           | `null`                     |
| `imgProps`       | _object_                   | Props for the `<img>` element                                     | `null`                     |
| `canvasProps`    | _object_                   | Props for the `<canvas>` element                                  | `null`                     |
| `mapProps`       | _object_                   | Props for the `<map>` element                                     | `null`                     |
| `areaProps`      | _object_                   | Props for the `<area>` elements                                   | `null`                     |

---

## Callbacks

| **Callback**       | **Triggered On**                    | **Signature**                   |
| ------------------ | ----------------------------------- | ------------------------------- |
| `onChange`         | Clicking an area                    | `(selectedArea, areas) => void` |
| `onImageClick`     | Clicking outside of mapped zones    | `(event) => void`               |
| `onImageMouseMove` | Moving the mouse over the image     | `(event) => void`               |
| `onClick`          | Clicking a mapped zone              | `(area, index, event) => void`  |
| `onMouseDown`      | Mouse down on a mapped zone         | `(area, index, event) => void`  |
| `onMouseUp`        | Mouse up on a mapped zone           | `(area, index, event) => void`  |
| `onTouchStart`     | Touching a mapped zone              | `(area, index, event) => void`  |
| `onTouchEnd`       | Ending a touch on a mapped zone     | `(area, index, event) => void`  |
| `onMouseMove`      | Moving the mouse over a mapped zone | `(area, index, event) => void`  |
| `onMouseEnter`     | Hovering over a mapped zone         | `(area, index, event) => void`  |
| `onMouseLeave`     | Leaving a mapped zone               | `(area, index, event) => void`  |
| `onLoad`           | Image loaded and canvas initialized | `(event, dimensions) => void`   |

---

## Methods

| **Method** | **Description**                                              |
| ---------- | ------------------------------------------------------------ |
| `getRefs`  | Retrieves refs for the container, canvas, and image elements |

---

## Areas Properties

| **Property**   | **Type**          | **Description**                                                                                                                                                                                                                                                          | **Default**                |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `id`           | _string_          | A unique identifier for the area. If not provided, an index from the array is used. This can be customized using the `areaKeyName` property.                                                                                                                             | based on `areaKeyName`     |
| `shape`        | _string_          | Specifies the shape of the area: `rect`, `circle`, or `poly`.                                                                                                                                                                                                            | **required**               |
| `coords`       | _array of number_ | Coordinates defining the area based on its shape: <ul><li>**rect**: `top-left-X, top-left-Y, bottom-right-X, bottom-right-Y`</li><li>**circle**: `center-X, center-Y, radius`</li><li>**poly**: List of points defining the polygon as `point-X, point-Y, ...`</li></ul> | **required**               |
| `active`       | _bool_            | Enables or disables event listeners and highlighting for the area.                                                                                                                                                                                                       | `true`                     |
| `disabled`     | _bool_            | Disables all interactions, highlighting, and tag additions/removals for the area.                                                                                                                                                                                        | `false`                    |
| `href`         | _string_          | A target link for clicks on the area. If an `onClick` handler is provided, the `href` will not be triggered.                                                                                                                                                             | `undefined`                |
| `fillColor`    | _string_          | Fill color of the highlighted zone                                                                                                                                                                                                                                       | `rgba(255, 255, 255, 0.5)` |
| `strokeColor`  | _string_          | Border color of the highlighted zone                                                                                                                                                                                                                                     | `rgba(0, 0, 0, 0.5)`       |
| `lineWidth`    | _number_          | Border thickness of the highlighted zone                                                                                                                                                                                                                                 | `1`                        |
| `preFillColor` | _string_          | Pre filled color of the highlighted zone                                                                                                                                                                                                                                 | `undefined`                |

When triggered by an event handler, an area object includes the following additional properties:

| **Property**   | **Type**          | **Description**                                                          |
| -------------- | ----------------- | ------------------------------------------------------------------------ |
| `scaledCoords` | _array of number_ | Scaled coordinates adjusted based on the image's dimensions.             |
| `center`       | _array of number_ | The center or centroid coordinates of the area, represented as `[X, Y]`. |

---

## License

Distributed with an MIT License. See LICENSE.txt for more details!

Copyright (c) 2025 Nisharg Shah
