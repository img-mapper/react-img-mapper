import React, { useState } from 'react';
import ImageMapper from "../lib/ImageMapper";

const MAP = {
  name: "my-map",
  areas: [
    {
      name: "1",
      shape: "poly",
      coords: [25, 33, 27, 300, 128, 240, 128, 94],
      preFillColor: "green",
      fillColor: "#0000ff"
    },
    {
      name: "2",
      shape: "poly",
      coords: [219, 118, 220, 210, 283, 210, 284, 119],
      preFillColor: "pink",
      lineWidth: 10,
      strokeColor: "#0000ff"
    },
    {
      name: "3",
      shape: "poly",
      coords: [381, 241, 383, 94, 462, 53, 457, 282],
      preFillColor: "yellow", // this is mandatory for stroke color to work
      lineWidth: 10,
      strokeColor: "#6afd09"
    },
    {
      name: "4",
      shape: "poly",
      coords: [245, 285, 290, 285, 274, 239, 249, 238],
      preFillColor: "red"
    },
    {
      name: "5",
      shape: "circle",
      coords: [170, 100, 25],
      preFillColor: "rgb(255,255,255,0.3)",
      lineWidth: 2
    },
    {
      name: "6",
      shape: "rect",
      coords: [270, 100, 200, 50],
      lineWidth: 2,
      preFillColor: "rgba(255, 255, 255, 0.3)",
      strokeColor: "#6afd09"
    }
  ]
};

const URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg";

const Example = () => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [msg, setMsg] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);
  const [codeDetails, setCodeDetails] = useState(null);
  const [stylingDetails, setStylingDetails] = useState(null);

  const load = () => {
    setMsg("Interact with image !");
  }

  const clicked = area => {
    setMsg(`You clicked on ${area.shape} at coords ${JSON.stringify(
      area.coords
    )} !`);
  }

  const clickedOutside = e => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  }

  const moveOnImage = (e) => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  }

  const enterArea = area => {
    setHoveredArea(area);
    setMsg(`You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
      area.coords
    )} !`);
  }

  const leaveArea = area => {
    setHoveredArea(null);
    setMsg(`You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
      area.coords
    )} !`);
  }

  const moveOnArea = (area, e) => {
    const coords = {x: e.nativeEvent.layerX, y: e.nativeEvent.layerY};
    setMoveMsg(`You moved on ${area.shape} ${
      area.name
    } at coords ${JSON.stringify(coords)} !`)
  }

  const getTipPosition = area => {
    return {top: `${area.center[1]}px`, left: `${area.center[0]}px`};
  }

  return (
    <div className="grid">
      <div className="presenter">
        <div style={{position: "relative"}}>
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
            <span
              className="tooltip"
              style={{...getTipPosition(hoveredArea)}}
            >
								{hoveredArea && hoveredArea.name}
							</span>
          )}
        </div>
        <pre className="message">
						{msg ? msg : null}
					</pre>
        <pre>{moveMsg ? moveMsg : null}</pre>
      </div>
      <div className="source">
        <h2>Example with custom tooltips :</h2>
        <p>(message logic is not present, to keep it clear)</p>
        <pre>
						<code>
							{'<div className="container">\n' +
              "    <ImageMapper src={URL} map={MAP} width={500}\n" +
              "    	onLoad={load}\n" +
              "    	onClick={area => clicked(area)}\n" +
              "    	onMouseEnter={area => enterArea(area)}\n" +
              "    	onMouseLeave={area => leaveArea(area)}\n" +
              "    	onMouseMove={(area, _, e) => moveOnArea(area, e)}\n" +
              "    	onImageClick={e => clickedOutside(e)}\n" +
              "    	onImageMouseMove={e => moveOnImage(e)}\n" +
              "		lineWidth={4}\n" +
              "		strokeColor={\"white\"}\n" +
              "    />\n" +
              "    {\n" +
              "    	hoveredArea &&\n" +
              '    	<span className="tooltip"\n' +
              "    	    style={{ ...this.getTipPosition(this.state.hoveredArea)}}>\n" +
              "    		{ this.state.hoveredArea && this.state.hoveredArea.name}\n" +
              "    	</span>\n" +
              "    }\n" +
              "</div>\n"}
						</code>
					</pre>
        <pre>
						<code className="json">
							{'URL = "https://c1.staticflickr.com/5/4052/4503898393_303cfbc9fd_b.jpg"\n' +
              "MAP = {\n" +
              '  name: "my-map",\n' +
              "  areas: [\n" +
              '    { name: "1", shape: "poly", coords: [25,33,27,300,128,240,128,94], preFillColor: "green", fillColor: "#0000ff", },\n' +
              '    { name: "2", shape: "poly", coords: [219,118,220,210,283,210,284,119], preFillColor: "pink", lineWidth: 10, strokeColor: "#0000ff" },\n' +
              '    { name: "3", shape: "poly", coords: [381,241,383,94,462,53,457,282], preFillColor: "yellow", /*this is mandatory for stroke color to work*/ lineWidth: 10, strokeColor: "#6afd09" },\n' +
              '    { name: "4", shape: "poly", coords: [245,285,290,285,274,239,249,238], preFillColor: "red"  },\n' +
              '    { name: "5", shape: "circle", coords: [170, 100, 25 ], preFillColor: "rgb(255,255,255,0.3)", lineWidth: 2 },\n' +
              '    { name: "6", shape: "rect", coords: [270, 100, 200, 50], lineWidth: 2, preFillColor: "rgba(255, 255, 255, 0.3)", strokeColor: "#6afd09" }\n' +
              "  ]\n}"}
						</code>
					</pre>
        Handler details : &nbsp;
        <span
          onClick={() => setCodeDetails(prev => !prev)}
        >
						{codeDetails ? "[-]" : "[+]"}
					</span>
        <pre>
						<code
              className="js"
              style={{display: codeDetails ? "block" : "none"}}
            >
							{"enterArea(area) {\n" +
              "    setHoveredArea(area);\n" +
              "}\n\n" +
              "leaveArea(area) {\n" +
              "    setHoveredArea(null);\n" +
              "}\n\n" +
              "getTipPosition(area) {\n" +
              "    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };\n" +
              "}\n\n"}
						</code>
					</pre>
        Styling details : &nbsp;
        <span
          onClick={() => setStylingDetails(prev => !prev)}
        >
						{stylingDetails ? "[-]" : "[+]"}
					</span>
        <pre>
						<code
              className="css"
              style={{display: stylingDetails ? "block" : "none"}}
            >
							{".container {\n" +
              "    position: relative;\n" +
              "}\n\n" +
              ".tooltip {\n" +
              "    position: absolute;\n" +
              "    color: #fff;\n" +
              "    padding: 10px;\n" +
              "    background: rgba(0,0,0,0.8);\n" +
              "    transform: translate3d(-50%, -50%, 0);\n" +
              "    border-radius: 5px;\n" +
              "    pointer-events: none;\n" +
              "    z-index: 1000;\n" +
              "}\n"}
						</code>
					</pre>
      </div>
    </div>
  );
}

export default Example;
