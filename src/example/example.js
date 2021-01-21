import React, { useState, useEffect, useRef } from 'react';
import ImageMapper from '../lib/ImageMapper';
import URL from './assets/example.jpg';
import areasJSON from './assets/example.json';
import './example.css';

const MAP = {
  name: 'my-map',
  areas: areasJSON,
};

const Example = () => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [msg, setMsg] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);
  const [codeDetails, setCodeDetails] = useState(null);
  const [stylingDetails, setStylingDetails] = useState(null);
  const parentRef = useRef(null);

  useEffect(() => {
    setMsg('Interact with image !');
  }, [parentRef.current]);

  const load = () => {};

  const clicked = area => {
    setMsg(`You clicked on ${area.shape} at coords ${JSON.stringify(area.coords)} !`);
  };

  const clickedOutside = e => {
    const coords = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  };

  const moveOnImage = e => {
    const coords = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
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
    const coords = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
    setMoveMsg(`You moved on ${area.shape} ${area.name} at coords ${JSON.stringify(coords)} !`);
  };

  const getTipPosition = area => ({ top: `${area.center[1]}px`, left: `${area.center[0]}px` });

  const firstBlock = `
  <div className="container">
    <ImageMapper
      src={URL}
      map={MAP}
      onLoad={load}
      onClick={area => clicked(area)}
      onMouseEnter={area => enterArea(area)}
      onMouseLeave={area => leaveArea(area)}
      onMouseMove={(area, _, e) => moveOnArea(area, e)}
      onImageClick={e => clickedOutside(e)}
      onImageMouseMove={e => moveOnImage(e)}
      lineWidth={1}
      strokeColor="black"
      parentWidth={parentRef.current.clientWidth}
      responsive
    />
    {hoveredArea && (
      <span className="tooltip" style={{ ...getTipPosition(hoveredArea) }}>
        {hoveredArea && hoveredArea.name}
      </span>
    )}
  </div>
  `;

  const secondBlock = `
  const URL = "https://raw.githubusercontent.com/NishargShah/react-img-mapper/master/src/example/assets/example.jpg";
  const areasJSONLink = "https://raw.githubusercontent.com/NishargShah/react-img-mapper/master/src/example/assets/example.json";
  
  const MAP = {
    name: "my-map",
    areas: areasJSON,
  };
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
      padding: 5px;
      font-size: 10px;
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
        <div className="image_wrapper" ref={parentRef}>
          {parentRef.current && (
            <ImageMapper
              src={URL}
              map={MAP}
              onLoad={load}
              onClick={area => clicked(area)}
              onMouseEnter={area => enterArea(area)}
              onMouseLeave={area => leaveArea(area)}
              onMouseMove={(area, _, e) => moveOnArea(area, e)}
              onImageClick={e => clickedOutside(e)}
              onImageMouseMove={e => moveOnImage(e)}
              lineWidth={1}
              strokeColor="black"
              parentWidth={parentRef.current.clientWidth}
              responsive
            />
          )}
          {hoveredArea && (
            <span className="tooltip" style={{ ...getTipPosition(hoveredArea) }}>
              {hoveredArea && hoveredArea.name}
            </span>
          )}
        </div>
        <h1 className="message">
          Fully Responsive Image With <br /> Auto Setting Coordinates
        </h1>
        <p className="message">{msg || null}</p>
        <p className="message">{moveMsg || null}</p>
      </div>
      <div className="content_wrapper">
        <h2>Example with custom tooltips :</h2>
        <pre className="highlight">
          <code>{firstBlock}</code>
        </pre>
        <pre className="highlight">
          <code className="json">{secondBlock}</code>
        </pre>
        <span role="none" className="handler" onClick={() => setCodeDetails(prev => !prev)}>
          Handler details : &nbsp; {codeDetails ? '[-]' : '[+]'}
        </span>
        <pre className="highlight">
          <code className="js" style={{ display: codeDetails ? 'block' : 'none' }}>
            {thirdBlock}
          </code>
        </pre>
        <span role="none" className="handler" onClick={() => setStylingDetails(prev => !prev)}>
          Styling details : &nbsp; {stylingDetails ? '[-]' : '[+]'}
        </span>
        <pre className="highlight">
          <code className="css" style={{ display: stylingDetails ? 'block' : 'none' }}>
            {fourthBlock}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Example;
