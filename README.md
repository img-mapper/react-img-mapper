# React Img Mapper

React Component to highlight interactive zones in images

> This repository is based on react-image-mapper but with some enhancements

``` 
1. Promise to be maintained this repository        
2. Built in TypeScript
3. Decreased size of bundled
4. Awesome Documentation        
5. Selected area will stay highlighted ( Single & Multiple ) with toggle and reset feature
6. New Properties: Natural Dimensions, RerenderProps       
7. Image Reference in Width, Height and onLoad function to access image properties  
8. Responsive Image Mapper   
9. Compatible with Next.js        
```        

## Installation

Package: [react-img-mapper](https://www.npmjs.com/package/react-img-mapper)

**NPM**

```  
npm install react-img-mapper --save        
```  

**Yarn**

```  
yarn add react-img-mapper      
```    

## Demo & Examples

Live demo: [demo](https://img-mapper.github.io/react-docs)

To run the example locally

```        
git clone https://github.com/img-mapper/react-docs.git
npm install        
npm start        
```        

Then open [`localhost:3000`](http://localhost:3000) in a browser.

If you want to change something and want to make a build file, you just need to run `npm run build`

## Usage

Import the component as you normally do, and add it wherever you like in your JSX views as below:

```javascript           
import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';
  const MAP = {
    name: 'my-map',
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas: 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json',
  };
  
  return <ImageMapper src={URL} map={MAP} />
}

export default Mapper;
```        

## Properties

|Props|Type|Description|Default|        
|---|---|---|---|        
|**src**|*string*|Image source url| **required**|        
|**map**|*string*|Mapping description| { name: generated, areas: [ ] }| 
|**containerRef**|*ref*|help to reset selected highlighted area|null|  
|**areaKeyName**|*string*|default unique key name ( **required** for `stayHighlighted` )|id|            
|**fillColor**|*string*|Fill color of the highlighted zone|rgba(255, 255, 255, 0.5)|        
|**strokeColor**|*string*|Border color of the highlighted zone|rgba(0, 0, 0, 0.5)|        
|**lineWidth**|*number*|Border thickness of the highlighted zone|1|        
|**width**|*number \| func*|Image width, in function you will get image reference object|0|        
|**height**|*number \| func*|Image height, in function you will get image reference object|0|        
|**active**|*bool*|Enable/Disable highlighting|true|    
|**disabled**|*bool*|Enable/Disable area listeners and highlighting|false|    
|**imgWidth**|*number*|Original image width|0|        
|**natural**|*bool*|Give the original dimensions ( height & width ) to canvas and image wrapper|false|        
|**stayHighlighted**|*bool*|You can see the highlighted area after clicking on the particular area|false|
|**stayMultiHighlighted**|*bool*|You can see the multiple highlighted area after clicking on the particular area|false|
|**toggleHighlighted**|*bool*|You can toggle selected highlighted area|false|
|**rerenderProps**|*array*|specify rerenderProps property, if you want to rerender your map with different property|[]|       
|**responsive**|*bool*|responsive map in all resolution ( for enable it you need to specify parentWidth )|false|        
|**parentWidth**|*number*|parent max width for responsive|0|   

## Properties Callback

|Props callbacks|Called on|signature|        
|---|---|---|        
|**onLoad**|Image loading and canvas initialization completed|(imageRef: obj, parentDimensions: { width, height }): void|  
|**onClick**|Click on a zone in image|(area: obj, index: num, event): void|    
|**onMouseEnter**|Hovering a zone in image|(area: obj, index: num, event): void|        
|**onMouseLeave**|Leaving a zone in image|(area: obj, index: num, event): void|        
|**onMouseMove**|Moving mouse on a zone in image|(area: obj, index: num, event): void|      
|**onMouseDown**|Clicks any button of the mouse on a zone in image|(area: obj, index: num, event): void|   
|**onMouseUp**|Releases left click of the mouse on a zone in image|(area: obj, index: num, event): void|   
|**onTouchStart**|Start to touch the zone in image|(area: obj, index: num, event): void|   
|**onTouchEnd**|Releases touch from the zone in image|(area: obj, index: num, event): void|    
|**onImageClick**|Click outside of a zone in image|(event): void|        
|**onImageMouseMove**|Moving mouse on the image itself|(event): void|      

## Methods

|Method|Description|       
|---|---|
|**clearHighlightedArea**|Clear all selected highlighted area from your map|

## Map Properties

A map is an object describing highlighted areas in the image.

Its structure is similar to the HTML syntax of mapping:

- **map**: (*object*) Object to describe highlighted zones
    - **name**: (*string*) Name of the map, used to bind to the image.
    - **areas**: (*array*) Array of **area objects** - **area**: (*object*) Shaped like below :

|Property|Type|Description|Default|        
|---|---|---|---|    
|**id**|*string*|Uniquely identify an area. An index in an array is used if this value is not provided. You can set it with `areaKeyName` property|index|        
|**shape**|*string*|Either `rect`, `circle` or `poly`|required|        
|**coords**|*array of number*|Coordinates delimiting the zone according to the specified shape: <ul><li>**rect**: `top-left-X`,`top-left-Y`,`bottom-right-X`,`bottom-right-Y`</li><li>**circle**: `center-X`,`center-Y`,`radius`</li><li>**poly**: Every point in the polygon path as `point-X`,`point-Y`,...</li></ul>|required| |**active**|*string*|Enable/Disable highlighting|true|   
|**disabled**|*string*|Enable/Disable area listeners and highlighting|false|  
|**href**|*string*|Target link for a click in the zone (note that if you provide an onClick prop, `href` will be prevented)|undefined|   
|**fillColor**|*string*|Fill color of the highlighted zone|rgba(255, 255, 255, 0.5)|  
|**strokeColor**|*string*|Border color of the highlighted zone|rgba(0, 0, 0, 0.5)|  
|**lineWidth**|*string*|Border thickness of the highlighted zone|1|  
|**preFillColor**|*string*|Pre filled color of the highlighted zone|undefined|

When received from an event handler, an area is extended with the following properties:

|Property| type|Description|        
|---|:---:|---|        
|**scaledCoords**|*array of number*|Scaled coordinates|        
|**center**|*array of number*|Coordinates positioning the center or centroid of the area: `[X, Y]`|        

## License

Distributed with an MIT License. See LICENSE.txt for more details!

Copyright (c) 2021 Nisharg Shah
