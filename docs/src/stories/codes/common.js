import React from 'react';

const url =
  'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/resources/example.jpg';

const name = 'my-map';
const areas =
  'https://raw.githubusercontent.com/img-mapper/react-img-mapper/refs/heads/master/resources/areas.json';

const variables = `const url = '${url}';
  const name = '${name}';
  // GET JSON FROM BELOW URL AS AN EXAMPLE
  const areas = '${areas}';`;

const common = code =>
  `import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  ${variables}
  
  return ${code}
}

export default Mapper;`;

export const commonWithState = code =>
  `import React from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const url = '${url}';
  const name = '${name}';
  
  // GET JSON FROM BELOW URL AND PUT IT INTO THE USESTATE HOOK
  // URL: ${areas}
  const [areas, setAreas] = useState([]);
  
  return ${code}
}

export default Mapper;`;

export const clearButtonTemplate = `import React, { Fragment } from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = () => {
  const url = '${url}';
  const name = '${name}';
  
  // GET JSON FROM BELOW URL AND PUT IT INTO THE USESTATE HOOK
  // URL: ${areas}
  const initialAreas = [];
  const [areas, setAreas] = useState(initialAreas);
  
  return (
    <Fragment>
      <ImageMapper
        src={url} 
        name={name}
        areas={areas}
        onChange={(_, newAreas) => setAreas(newAreas)}
        isMulti
       />
       <button onClick={() => setAreas(initialAreas)}>Clear</button>
    </Fragment>
  )
}

export default Mapper;`;

export const zoomTemplate = `import React, { Fragment, useState } from 'react';
import ImageMapper from 'react-img-mapper';

const Mapper = props => {
  const minWidth = 400;
  const [zoom, setZoom] = useState(640);

  ${variables}

  const handleZoom = type => {
    setZoom(prev => {
      if (prev <= minWidth && type === 'out') return prev;
      return type === 'in' ? prev + props.zoomWidth : prev - props.zoomWidth;
    });
  };
  
  return (
    <Fragment>
      <ImageMapper
        src={url} 
        name={name}
        areas={areas}
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
