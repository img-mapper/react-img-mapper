import React, { useState } from 'react';
import ImageMapper from '../lib/ImageMapper';
import './NewClaim.scss';

const MAP = {
  name: 'my-map',
  areas: [
    {
      name: '1',
      shape: 'poly',
      coords: [25, 33, 27, 300, 128, 240, 128, 94],
      preFillColor: 'green',
      fillColor: 'blue',
    },
    {
      name: '2',
      shape: 'poly',
      coords: [219, 118, 220, 210, 283, 210, 284, 119],
      preFillColor: 'pink',
    },
    {
      name: '3',
      shape: 'poly',
      coords: [381, 241, 383, 94, 462, 53, 457, 282],
      fillColor: 'yellow',
    },
    {
      name: '4',
      shape: 'poly',
      coords: [245, 285, 290, 285, 274, 239, 249, 238],
      preFillColor: 'red',
    },
    {
      name: '5',
      shape: 'circle',
      coords: [170, 100, 25],
    },
  ],
};

const URL = 'https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg';

const Example = () => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [msg, setMsg] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);
  const [codeDetails, setCodeDetails] = useState(null);
  const [stylingDetails, setStylingDetails] = useState(null);

  const load = () => {
    setMsg('Interact with image !');
  };

  const clicked = area => {
    setMsg(`You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !`);
  };

  const clickedOutside = e => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  };

  const moveOnImage = e => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  };

  const enterArea = area => {
    setHoveredArea(area);
    setMsg(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(area.coords)} !`);
  };

  const leaveArea = area => {
    setHoveredArea(null);
    setMsg(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(area.coords)} !`);
  };

  const moveOnArea = (area, e) => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMoveMsg(`You moved on ${area.shape} ${area.name} at coords ${JSON.stringify(coords)} !`);
  };

  const getTipPosition = area => ({top: `${area.center[1]}px`, left: `${area.center[0]}px`});

  const firstBlock = `
  <div className="container">
    <ImageMapper
      src={URL}
      map={MAP}
      width={500}
      onLoad={load}
      onClick={area => clicked(area)}
      onMouseEnter={area => enterArea(area)}
      onMouseLeave={area => leaveArea(area)}
      onMouseMove={(area, _, e) => moveOnArea(area, e)}
      onImageClick={e => clickedOutside(e)}
      onImageMouseMove={e => moveOnImage(e)}
      lineWidth={4}
      strokeColor="white"
    />
    {hoveredArea && (
      <span className="tooltip" style={{ ...getTipPosition(hoveredArea) }}>
        {hoveredArea && hoveredArea.name}
      </span>
    )}
  </div>
  `;

  const secondBlock = `
  URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"
  MAP = {
    name: "my-map",
    areas: [
      { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "blue"  },
      { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink"  },
      { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], fillColor: "yellow"  },
      { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },
      { name: "5", shape: "circle", coords: [170, 100, 25 ] },
    ]
  }
  `;

  const thirdBlock = `
  enterArea(area) {
      setHoveredArea(area);
  }
  
  leaveArea(area) {
      setHoveredArea(null);
  }
  
  getTipPosition(area) {
      return { top: \`\u0024{area.center[1]}px\`, left: \`\u0024{area.center[0]}px\` };
  }
  `;

  const fourthBlock = `
  .container {
    position: relative;
  }
  
  .tooltip {
      position: absolute;
      color: #fff;
      padding: 10px;
      background: rgba(0,0,0,0.8);
      transform: translate3d(-50%, -50%, 0);
      border-radius: 5px;
      pointer-events: none;
      z-index: 1000;
  }
  `;

  return (
    <div className="grid">
      <div className="presenter">
        <div style={{position: 'relative'}}>
          <ImageMapper
            src={URL}
            map={MAP}
            width={600}
            height={800}
            onLoad={load}
            onClick={area => clicked(area)}
            onMouseEnter={area => enterArea(area)}
            onMouseLeave={area => leaveArea(area)}
            onMouseMove={(area, _, e) => moveOnArea(area, e)}
            onImageClick={e => clickedOutside(e)}
            onImageMouseMove={e => moveOnImage(e)}
            lineWidth={1}
            strokeColor="black"
          />
          {hoveredArea && (
            <span className="tooltip" style={{...getTipPosition(hoveredArea)}}>
              {hoveredArea && hoveredArea.name}
            </span>
          )}
        </div>
        <pre className="message">{msg || null}</pre>
        <pre>{moveMsg || null}</pre>
      </div>
      <div className="source">
        <h2>Example with custom tooltips :</h2>
        <p>(message logic is not present, to keep it clear)</p>
        <pre className="highlight">
          <code>{firstBlock}</code>
        </pre>
        <pre className="highlight">
          <code className="json">{secondBlock}</code>
        </pre>
        Handler details : &nbsp;
        <span role="none" onClick={() => setCodeDetails(prev => !prev)}>
          {codeDetails ? '[-]' : '[+]'}
        </span>
        <pre className="highlight">
          <code className="js" style={{display: codeDetails ? 'block' : 'none'}}>
            {thirdBlock}
          </code>
        </pre>
        Styling details : &nbsp;
        <span role="none" onClick={() => setStylingDetails(prev => !prev)}>
          {stylingDetails ? '[-]' : '[+]'}
        </span>
        <pre className="highlight">
          <code className="css" style={{display: stylingDetails ? 'block' : 'none'}}>
            {fourthBlock}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Example;
