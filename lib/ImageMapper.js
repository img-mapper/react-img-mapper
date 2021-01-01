import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import isEqual from "react-fast-compare";

let absPos = {
  position: "absolute",
  top: 0,
  left: 0
};

const styles = props => {
  return ({
    container: {
      position: "relative"
    },
    canvas: {
      ...absPos,
      pointerEvents: "none",
      zIndex: 2
    },
    img: {
      ...absPos,
      zIndex: 1,
      userSelect: "none"
    },
    map: (
      props?.onClick && {
        cursor: "pointer"
      }) || undefined
  });
}

const ImageMapper = props => {
  const [map, setMap] = useState(JSON.parse(JSON.stringify(props.map)));
  const [isRendered, setRendered] = useState(false);
  const container = useRef(null);
  const img = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('update');
      updateCacheMap();
      initCanvas();
    }
  }, [props, isInitialMount]);

  useEffect(() => {
    console.log('mount');
    ctx.current = canvas.current.getContext("2d");
    updateCacheMap();
    setRendered(true);
  }, []);

  // DONE
  const updateCacheMap = () => {
    setMap(JSON.parse(JSON.stringify(props.map)))
    initCanvas();
  }

  const callingFn = (shape, coords, fillColor, lineWidth, strokeColor) => {
    if (shape === 'rect') {
      return drawrect(coords, fillColor, lineWidth, strokeColor);
    }
    if (shape === 'circle') {
      return drawcircle(coords, fillColor, lineWidth, strokeColor);
    }
    if (shape === 'poly') {
      return drawpoly(coords, fillColor, lineWidth, strokeColor);
    }
  }

  // DONE
  const drawrect = (coords, fillColor, lineWidth, strokeColor) => {
    let [left, top, right, bot] = coords;
    ctx.current.fillStyle = fillColor;
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.strokeRect(left, top, right - left, bot - top);
    ctx.current.fillRect(left, top, right - left, bot - top);
    ctx.current.fillStyle = props.fillColor;
  }

  // DONE
  const drawcircle = (coords, fillColor, lineWidth, strokeColor) => {
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
    ctx.current.fillStyle = props.fillColor;
  }

  // DONE
  const drawpoly = (coords, fillColor, lineWidth, strokeColor) => {
    const newCoords = coords.reduce(
      (a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
      []
    );
    const first = newCoords.unshift();

    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;

    ctx.current.moveTo(first[0], first[1]);
    newCoords.forEach(c => ctx.current.lineTo(c[0], c[1]));
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
    ctx.current.fillStyle = props.fillColor;
  }

  // DONE
  const initCanvas = () => {
    if (props.width) img.current.width = props.width;

    if (props.height) img.current.height = props.height;

    canvas.current.width = props.width || img.current.clientWidth;
    canvas.current.height = props.height || img.current.clientHeight;
    container.current.style.width =
      (props.width || img.current.clientWidth) + "px";
    container.current.style.height =
      (props.height || img.current.clientHeight) + "px";

    ctx.current = canvas.current.getContext("2d");
    ctx.current.fillStyle = props.fillColor;
    //ctx.strokeStyle = props.strokeColor;

    if (props.onLoad) props.onLoad();

    renderPrefilledAreas();
  }

  // DONE
  const hoverOn = (area, index, event) => {
    const shape = event.target.getAttribute("shape");

    if (props.active) {
      callingFn(
        shape,
        event.target.getAttribute("coords").split(","),
        area.fillColor,
        area.lineWidth || props.lineWidth,
        area.strokeColor || props.strokeColor
      );
    }

    if (props.onMouseEnter) props.onMouseEnter(area, index, event);
  }

  // DONE
  const hoverOff = (area, index, event) => {
    if (props.active) {
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      renderPrefilledAreas();
    }

    if (props.onMouseLeave) props.onMouseLeave(area, index, event);
  }

  // DONE
  const click = (area, index, event) => {
    if (props.onClick) {
      event.preventDefault();
      props.onClick(area, index, event);
    }
  }

  // DONE
  const imageClick = event => {
    if (props.onImageClick) {
      event.preventDefault();
      props.onImageClick(event);
    }
  }

  // DONE
  const mouseMove = (area, index, event) => {
    if (props.onMouseMove) props.onMouseMove(area, index, event);
  }

  // DONE
  const imageMouseMove = (area, index, event) => {
    if (props.onImageMouseMove) props.onImageMouseMove(area, index, event);
  }

  // DONE
  const scaleCoords = coords => {
    const {imgWidth, width} = props;
    // calculate scale based on current 'width' and the original 'imgWidth'
    const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
    return coords.map(coord => coord * scale);
  }

  // DONE
  const renderPrefilledAreas = () => {
    map.areas.map(area => {
      if (!area.preFillColor) return;
      callingFn(
        area.shape,
        scaleCoords(area.coords),
        area.preFillColor,
        area.lineWidth || props.lineWidth,
        area.strokeColor || props.strokeColor
      );
    });
  }

  // DONE
  const computeCenter = area => {
    if (!area) return [0, 0];

    const scaledCoords = scaleCoords(area.coords);

    switch (area.shape) {
      case "circle":
        return [scaledCoords[0], scaledCoords[1]];
      case "poly":
      case "rect":
      default: {
        // Calculate centroid
        const n = scaledCoords.length / 2;
        const {y, x} = scaledCoords.reduce(
          ({y, x}, val, idx) => {
            return !(idx % 2) ? {y, x: x + val / n} : {y: y + val / n, x};
          },
          {y: 0, x: 0}
        );
        return [x, y];
      }
    }
  }

  // DONE
  const renderAreas = () => {
    return map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);
      const extendedArea = {...area, scaledCoords, center};

      return (
        <area
          key={area._id || index}
          shape={area.shape}
          coords={scaledCoords.join(",")}
          onMouseEnter={event => hoverOn(extendedArea, index, event)}
          onMouseLeave={event => hoverOff(extendedArea, index, event)}
          onMouseMove={event => mouseMove(extendedArea, index, event)}
          onClick={event => click(extendedArea, index, event)}
          href={area.href}
          alt="map"
        />
      );
    });
  }

  // DONE
  return (
    <div style={styles(props).container} ref={container}>
      <img
        style={styles().img}
        src={props.src}
        useMap={`#${map.name}`}
        alt="map"
        ref={img}
        onLoad={initCanvas}
        onClick={imageClick}
        onMouseMove={imageMouseMove}
      />
      <canvas ref={canvas} style={styles().canvas} />
      <map name={map.name} style={styles().map}>
        {isRendered && renderAreas()}
      </map>
    </div>
  );
}

ImageMapper.defaultProps = {
  active: true,
  fillColor: "rgba(255, 255, 255, 0.5)",
  lineWidth: 1,
  map: {
    areas: [],
    name: "image-map-" + Math.random()
  },
  strokeColor: "rgba(0, 0, 0, 0.5)"
};

ImageMapper.propTypes = {
  active: PropTypes.bool,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  imgWidth: PropTypes.number,
  lineWidth: PropTypes.number,
  src: PropTypes.string.isRequired,
  strokeColor: PropTypes.string,
  width: PropTypes.number,

  onClick: PropTypes.func,
  onMouseMove: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageMouseMove: PropTypes.func,
  onLoad: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,

  map: PropTypes.shape({
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        area: PropTypes.shape({
          coords: PropTypes.arrayOf(PropTypes.number),
          href: PropTypes.string,
          shape: PropTypes.string,
          preFillColor: PropTypes.string,
          fillColor: PropTypes.string
        })
      })
    ),
    name: PropTypes.string
  })
};

export default React.memo(ImageMapper, (prevProps, nextProps) => {
  const watchedProps = [
    "active",
    "fillColor",
    "height",
    "imgWidth",
    "lineWidth",
    "src",
    "strokeColor",
    "width"
  ];

  const propChanged = watchedProps.some(
    prop => prevProps[prop] !== nextProps[prop]
  );

  return isEqual(prevProps.map, nextProps.map) || !propChanged;
});
