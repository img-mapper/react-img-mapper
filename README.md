# React Img Mapper

React Component to highlight interactive zones in images

> This repository is based on react-image-mapper but with some enhancements

```
1. Decreased size of bundled
2. Added Natural Dimentions options ( For Network Image )
3. Added image highlight stay feature
4. Promise to be maintained this repository
```

## Installation

```
npm install react-img-mapper --save
```

## Demo & Examples

Live demo: [demo](https://nishargshah.github.io/react-img-mapper)

To build the example locally, run:

```
npm install
npm start
```

Then open [`localhost:3000`](http://localhost:3000) in a browser.

If you want to change something and want to make a compiled file, you just need to run `npx webpack`

## Usage

Import the component as you normally do, and add it wherever you like in your JSX views as below:

```javascript
// ES5 require
var ImageMapper = require('react-img-mapper');

// ES6 import
import ImageMapper from 'react-img-mapper';

<ImageMapper src={IMAGE_URL} map={AREAS_MAP}/>
```

### Properties

|Props|type|Description|default|
|---|---|---|---|
|**src**|*string*|Image source url| **required**|
|**map**|*string*|Mapping description| `{ name: generated, areas: [ ] }`<br/>(see below) |
|**fillColor**|*string*|Fill color of the highlighted zone|`rgba(255, 255, 255, 0.5)`|
|**strokeColor**|*string*|Border color of the highlighted zone|`rgba(0, 0, 0, 0.5)`|
|**lineWidth**|*number*|Border thickness of the highlighted zone|`1`|
|**width**|*number*|Image width|`Displayed width`|
|**height**|*number*|Image height|`Displayed height`|
|**active**|*bool*|Enable/Disable highlighting|`true`|
|**imgWidth**|*number*|Original image width|`null`|
|**natural**|*bool*|Give the original dimensions ( height & width ) to canvas and image wrapper|`false`|

&nbsp;

|Props callbacks|Called on|signature|
|---|---|---|
|**onLoad**|Image loading and canvas initialization completed|`(): void`|
|**onMouseEnter**|Hovering a zone in image|`(area: obj, index: num, event): void`|
|**onMouseLeave**|Leaving a zone in image|`(area: obj, index: num, event): void`|
|**onMouseMove**|Moving mouse on a zone in image|`(area: obj, index: num, event): void`|
|**onClick**|Click on a zone in image|`(area: obj, index: num, event): void`|
|**onImageClick**|Click outside of a zone in image|`(event): void`|
|**onImageMouseMove**|Moving mouse on the image itself|`(event): void`|

&nbsp;

Map is an object describing highlighted areas in the image.

Its structure is similar to the HTML syntax of mapping:

- **map**: (*object*) Object to describe highlighted zones
	- **name**: (*string*) Name of the map, used to bind to the image.
	- **areas**: (*array*) Array of **area objects**
		- **area**: (*object*) Shaped like below :

|Property| type|Description|
|---|:---:|---|
|**_id**|*string*|Uniquely identify an area. Index in array is used if this value is not provided.|
|**shape**|*string*|Either `rect`, `circle` or `poly`|
|**coords**|*array of number*|Coordinates delimiting the zone according to the specified shape: <ul><li>**rect**: `top-left-X`,`top-left-Y`,`bottom-right-X`,`bottom-right-Y`</li><li>**circle**: `center-X`,`center-Y`,`radius`</li><li>**poly**: Every point in the polygon path as `point-X`,`point-Y`,...</li></ul>|
|**href**|*string*|Target link for a click in the zone (note that if you provide a onClick prop, `href` will be prevented)|

&nbsp;

When received from an event handler, an area is extended with the following properties:

|Property| type|Description|
|---|:---:|---|
|**scaledCoords**|*array of number*|Scaled coordinates (see [Dynamic Scaling](#dynamic-scaling) below)|
|**center**|*array of number*|Coordinates positionning the center or centroid of the area: `[X, Y]`|

## Dynamic scaling
When a parent component updates the **width** prop on `<ImageMapper>`, the area coordinates also have to be scaled. This can be accomplied by specifying both the new **width** and a constant **imgWidth**. **imgWidth** is the width of the original image. `<ImageMapper>` will calculate the new coordinates for each area. For example:
```javascript
/* assume that image is actually 1500px wide */

// this will be a 1:1 scale, areas will be 3x bigger than they should be
<ImageMapper width={500} />

// this will be the same 1:1 scale, same problem with areas being too big
<ImageMapper width={500} imgWidth={500} />

// this will scale the areas to 1/3rd, they will now fit the 500px image on the screen
<ImageMapper width={500} imgWidth={1500} />
```


## License

Distributed with an MIT License. See LICENSE.txt for more details!

Copyright (c) 2021 Nisharg Shah
