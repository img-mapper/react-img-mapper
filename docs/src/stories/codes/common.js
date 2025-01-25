import React from 'react';

const URL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg';
const MAP = `{
    name: 'my-map',
    // GET JSON FROM BELOW URL AS AN EXAMPLE
    areas: 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.json',
  }`;

const common = code =>
  `import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const URL = '${URL}';
  const MAP = ${MAP};
  
  return ${code}
}

export default Mapper;`;

export const clearButtonTemplate = `import React, { Fragment, useRef } from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = () => {
  const myRef = useRef(null);

  const URL = '${URL}';
  const MAP = ${MAP};
  
  const handleClear = () => {
    myRef.current.clearHighlightedArea();
  };
  
  return (
    <Fragment>
      <ImageMapper
        containerRef={myRef} 
        src={URL} 
        map={MAP}
        stayMultiHighlighted
       />
       <button onClick={handleClear}>Clear</button>
    </Fragment>
  )
}

export default Mapper;`;

export const zoomTemplate = `import React, { Fragment, useState } from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const minWidth = 400;
  const [zoom, setZoom] = useState(640);

  const URL = '${URL}';
  const MAP = ${MAP};

  const handleZoom = type => {
    setZoom(prev => {
      if (prev <= minWidth && type === 'out') return prev;
      return type === 'in' ? prev + props.zoomWidth : prev - props.zoomWidth;
    });
  };
  
  return (
    <Fragment>
      <ImageMapper
        src={URL} 
        map={MAP}
        responsive
        parentWidth={zoom}
       />
       <button style={{ marginRight: 8 }} onClick={() => handleZoom('in')}>Zoom In</button>
       <button onClick={() => handleZoom('out')}>Zoom Out</button>
    </Fragment>
  )
}

export default Mapper;`;

export const TopComponent = (title, Content) => (
  <div className="top_container">
    <h1 className="title">{title}</h1>
    <div className="top_content">{Content}</div>
  </div>
);

export default common;
