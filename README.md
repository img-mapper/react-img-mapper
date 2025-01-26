# React Img Mapper

React Component to highlight interactive zones in images

```
1. Promise to be maintained this repository
2. Built in TypeScript
3. Compatible with Next.js
4. Decreased size of bundled
5. Awesome Documentation
6. Selected area will stay highlighted ( Single & Multiple ) with toggle and reset feature
7. Image Reference in Width, Height and onLoad function to access image properties
8. Responsive Image Mapper
```

## Installation

Package: [react-img-mapper](https://www.npmjs.com/package/react-img-mapper)

```
# via npm
npm install react-img-mapper

# via yarn
yarn add react-img-mapper

# via pnpm
pnpm install react-img-mapper
```

## Demo & Examples

Live Demo: [Demo](https://img-mapper.github.io/react-img-mapper)

To run the example locally, please install `pnpm` and follow below steps

```
git clone https://github.com/img-mapper/react-img-mapper.git
pnpm playground:install
pnpm playground:dev
```

Then open [`localhost:3000`](http://localhost:3000) in a browser.

If you want to change something and want to make a build file, you just need to run `npm run build`

## Usage

Import the component as you normally do, and add it wherever you like in your JSX views as below:

```javascript
import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const URL =
    'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/playground/public/assets/example.jpg';
  const MAP = {
    name: 'my-map',
    // GET JSON FROM BELOW URL AS AN EXAMPLE AND PUT IT HERE
    areas: 'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/playground/src/data/areas.json',
  };

  return <ImageMapper src={URL} map={MAP} />;
};

export default Mapper;
```

## Properties

| Props           | Type                       | Description                                                                        | Default                  |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------- | ------------------------ |
| **src**         | _string_                   | Image source url                                                                   | **required**             |
| **map**         | _object_                   | Mapping object                                                                     | **required**             |
| **areaKeyName** | _string_                   | unique key name of the json                                                        | id                       |
| **isMulti**     | _bool_                     | Enable/Disable multiple highlight areas by clicking on the specific area           | true                     |
| **toggle**      | _bool_                     | Enable/Disable toggle selected highlighted area                                    | false                    |
| **active**      | _bool_                     | Enable/Disable listeners and highlighting                                          | true                     |
| **disabled**    | _bool_                     | Enable/Disable listeners, highlighting and add/remove area tag from the UI         | false                    |
| **fillColor**   | _string_                   | Fill color of the highlighted zone                                                 | rgba(255, 255, 255, 0.5) |
| **strokeColor** | _string_                   | Border color of the highlighted zone                                               | rgba(0, 0, 0, 0.5)       |
| **lineWidth**   | _number_                   | Border thickness of the highlighted zone                                           | 1                        |
| **imgWidth**    | _number_                   | Original image width                                                               | 0                        |
| **width**       | number \| func => number   | Image width, in function you will get image reference object                       | 0                        |
| **height**      | _number \| func => number_ | Image height, in function you will get image reference object                      | 0                        |
| **natural**     | _bool_                     | Give the original dimensions ( height & width ) to canvas and image wrapper        | false                    |
| **responsive**  | _bool_                     | responsive map in all resolution ( for enable it you need to specify parentWidth ) | false                    |
| **parentWidth** | _number_                   | parent max width for responsive                                                    | 0                        |

## Properties Callback

| Props callbacks      | Called on                                           | signature                                                  |
| -------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| **onChange**         | Area click listener                                 | (selectedArea: MapArea, areas: MapArea[]) => void          |
| **onImageClick**     | Click outside of a zone in image                    | (event: ImageEvent) => void                                |
| **onImageMouseMove** | Moving mouse on the image itself                    | (event: ImageEvent) => void                                |
| **onClick**          | Click on a zone in image                            | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onMouseDown**      | Clicks any button of the mouse on a zone in image   | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onMouseUp**        | Releases left click of the mouse on a zone in image | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onTouchStart**     | Start to touch the zone in image                    | (area: MapArea, index: number, event: TouchEvent) => void  |
| **onTouchEnd**       | Releases touch from the zone in image               | (area: MapArea, index: number, event: TouchEvent) => void  |
| **onMouseMove**      | Moving mouse on a zone in image                     | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onMouseEnter**     | Hovering a zone in image                            | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onMouseLeave**     | Leaving a zone in image                             | (area: MapArea, index: number, event: AreaEvent) => void   |
| **onLoad**           | Image loading and canvas initialization completed   | (event: HTMLImageElement, dimensions: WidthHeight) => void |

## Methods

| Method      | Description                          |
| ----------- | ------------------------------------ |
| **getRefs** | Get container, canvas and image refs |

## Map Properties

A map is an object describing highlighted areas in the image.

Its structure is similar to the HTML syntax of mapping:

- **map**: (_object_) Object to describe highlighted zones
  - **name**: (_string_) Name of the map, used to bind to the image.
  - **areas**: (_array_) Array of **area objects** - **area**: (_object_) Shaped like below

| Property         | Type              | Description                                                                                                                                                                                                                                                                               | Default                  |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **id**           | _string_          | Uniquely identify an area. An index in an array is used if this value is not provided. You can set it with `areaKeyName` property                                                                                                                                                         | based on `areaKeyName`   |
| **shape**        | _string_          | Either `rect`, `circle` or `poly`                                                                                                                                                                                                                                                         | required                 |
| **coords**       | _array of number_ | Coordinates delimiting the zone according to the specified shape: <ul><li>**rect**: `top-left-X`,`top-left-Y`,`bottom-right-X`,`bottom-right-Y`</li><li>**circle**: `center-X`,`center-Y`,`radius`</li><li>**poly**: Every point in the polygon path as `point-X`,`point-Y`,...</li></ul> | required                 |
| **active**       | _string_          | Enable/Disable area listeners and highlighting                                                                                                                                                                                                                                            | true                     |
| **disabled**     | _string_          | Enable/Disable area listeners, highlighting and add/remove area tag from the UI                                                                                                                                                                                                           | false                    |
| **href**         | _string_          | Target link for a click in the zone (note that if you provide an onClick prop, `href` will be prevented)                                                                                                                                                                                  | undefined                |
| **fillColor**    | _string_          | Fill color of the highlighted zone                                                                                                                                                                                                                                                        | rgba(255, 255, 255, 0.5) |
| **strokeColor**  | _string_          | Border color of the highlighted zone                                                                                                                                                                                                                                                      | rgba(0, 0, 0, 0.5)       |
| **lineWidth**    | _string_          | Border thickness of the highlighted zone                                                                                                                                                                                                                                                  | 1                        |
| **preFillColor** | _string_          | Pre filled color of the highlighted zone                                                                                                                                                                                                                                                  | undefined                |

When received from an event handler, an area is extended with the following properties:

| Property         |       type        | Description                                                          |
| ---------------- | :---------------: | -------------------------------------------------------------------- |
| **scaledCoords** | _array of number_ | Scaled coordinates                                                   |
| **center**       | _array of number_ | Coordinates positioning the center or centroid of the area: `[X, Y]` |

## License

Distributed with an MIT License. See LICENSE.txt for more details!

Copyright (c) 2025 Nisharg Shah
