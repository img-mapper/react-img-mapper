"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : {default: obj}; }

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () { return cache; };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {default: obj};
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

const ImageMapper = props => {
  const [map, setMap] = (0, _react.useState)(JSON.parse(JSON.stringify(props.map)));
  const [isRendered, setRendered] = (0, _react.useState)(false);
  const container = (0, _react.useRef)(null);
  const img = (0, _react.useRef)(null);
  const canvas = (0, _react.useRef)(null);
  const ctx = (0, _react.useRef)(null);
  const isInitialMount = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('update');
      updateCacheMap();
      initCanvas();
    }
  }, [props, isInitialMount]);
  (0, _react.useEffect)(() => {
    console.log('mount');
    ctx.current = canvas.current.getContext('2d');
    updateCacheMap();
    setRendered(true);
  }, []);

  const updateCacheMap = () => {
    setMap(JSON.parse(JSON.stringify(props.map)));
    initCanvas();
  };

  const callingFn = (shape, coords, fillColor, lineWidth, strokeColor) => {
    if (shape === 'rect') {
      return drawRect(coords, fillColor, lineWidth, strokeColor);
    }

    if (shape === 'circle') {
      return drawCircle(coords, fillColor, lineWidth, strokeColor);
    }

    if (shape === 'poly') {
      return drawPoly(coords, fillColor, lineWidth, strokeColor);
    }
  };

  const drawRect = (coords, fillColor, lineWidth, strokeColor) => {
    let [left, top, right, bot] = coords;
    ctx.current.fillStyle = fillColor;
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.strokeRect(left, top, right - left, bot - top);
    ctx.current.fillRect(left, top, right - left, bot - top);
    ctx.current.fillStyle = props.fillColor;
  };

  const drawCircle = (coords, fillColor, lineWidth, strokeColor) => {
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
    ctx.current.fillStyle = props.fillColor;
  };

  const drawPoly = (coords, fillColor, lineWidth, strokeColor) => {
    const newCoords = coords.reduce((a, v, i, s) => i % 2 ? a : [...a, s.slice(i, i + 2)], []);
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
  };

  const initCanvas = () => {
    if (props.width) img.current.width = props.width;
    if (props.height) img.current.height = props.height;
    canvas.current.width = props.width || props.natural ? img.current.naturalWidth : img.current.clientWidth;
    canvas.current.height = props.height || props.natural ? img.current.naturalHeight : img.current.clientHeight;
    container.current.style.width = (props.width || props.natural ? img.current.naturalWidth : img.current.clientWidth) + 'px';
    container.current.style.height = (props.height || props.natural ? img.current.naturalHeight : img.current.clientHeight) + 'px';
    ctx.current = canvas.current.getContext('2d');
    ctx.current.fillStyle = props.fillColor; //ctx.strokeStyle = props.strokeColor;

    if (props.onLoad) props.onLoad();
    renderPrefilledAreas();
  };

  const hoverOn = (area, index, event) => {
    const shape = event.target.getAttribute('shape');

    if (props.active) {
      callingFn(shape, event.target.getAttribute('coords').split(','), area.fillColor, area.lineWidth || props.lineWidth, area.strokeColor || props.strokeColor);
    }

    if (props.onMouseEnter) props.onMouseEnter(area, index, event);
  };

  const hoverOff = (area, index, event) => {
    if (props.active) {
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      renderPrefilledAreas();
    }

    if (props.onMouseLeave) props.onMouseLeave(area, index, event);
  };

  const click = (area, index, event) => {
    if (props.onClick) {
      event.preventDefault();
      props.onClick(area, index, event);
    }
  };

  const imageClick = event => {
    if (props.onImageClick) {
      event.preventDefault();
      props.onImageClick(event);
    }
  };

  const mouseMove = (area, index, event) => {
    if (props.onMouseMove) props.onMouseMove(area, index, event);
  };

  const imageMouseMove = (area, index, event) => {
    if (props.onImageMouseMove) props.onImageMouseMove(area, index, event);
  };

  const scaleCoords = coords => {
    const {
      imgWidth,
      width
    } = props;
    const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
    return coords.map(coord => coord * scale);
  };

  const renderPrefilledAreas = () => {
    map.areas.map(area => {
      if (!area.preFillColor) return;
      callingFn(area.shape, scaleCoords(area.coords), area.preFillColor, area.lineWidth || props.lineWidth, area.strokeColor || props.strokeColor);
    });
  };

  const computeCenter = area => {
    if (!area) return [0, 0];
    const scaledCoords = scaleCoords(area.coords);

    switch (area.shape) {
      case 'circle':
        return [scaledCoords[0], scaledCoords[1]];

      case 'poly':
      case 'rect':
      default: {
        // Calculate centroid
        const n = scaledCoords.length / 2;
        const {
          y,
          x
        } = scaledCoords.reduce(({
                                   y,
                                   x
                                 }, val, idx) => {
          return !(idx % 2) ? {
            y,
            x: x + val / n
          } : {
            y: y + val / n,
            x
          };
        }, {
          y: 0,
          x: 0
        });
        return [x, y];
      }
    }
  };

  const renderAreas = () => {
    return map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);
      const extendedArea = {
        ...area,
        scaledCoords,
        center
      };
      return /*#__PURE__*/_react.default.createElement("area", {
        key: area._id || index,
        shape: area.shape,
        coords: scaledCoords.join(','),
        onMouseEnter: event => hoverOn(extendedArea, index, event),
        onMouseLeave: event => hoverOff(extendedArea, index, event),
        onMouseMove: event => mouseMove(extendedArea, index, event),
        onClick: event => click(extendedArea, index, event),
        href: area.href,
        alt: "map"
      });
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "img-mapper",
    style: (0, _styles.default)(props).container,
    ref: container
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "img-mapper-img",
    style: (0, _styles.default)().img,
    src: props.src,
    useMap: `#${map.name}`,
    alt: "map",
    ref: img,
    onLoad: initCanvas,
    onClick: imageClick,
    onMouseMove: imageMouseMove
  }), /*#__PURE__*/_react.default.createElement("canvas", {
    className: "img-mapper-canvas",
    ref: canvas,
    style: (0, _styles.default)().canvas
  }), /*#__PURE__*/_react.default.createElement("map", {
    className: "img-mapper-map",
    name: map.name,
    style: (0, _styles.default)().map
  }, isRendered && renderAreas()));
};

ImageMapper.defaultProps = {
  active: true,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  lineWidth: 1,
  map: {
    areas: [],
    name: 'image-map-' + Math.random()
  },
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  natural: false
};
ImageMapper.propTypes = {
  active: _propTypes.default.bool,
  fillColor: _propTypes.default.string,
  height: _propTypes.default.number,
  imgWidth: _propTypes.default.number,
  lineWidth: _propTypes.default.number,
  src: _propTypes.default.string.isRequired,
  strokeColor: _propTypes.default.string,
  width: _propTypes.default.number,
  natural: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onMouseMove: _propTypes.default.func,
  onImageClick: _propTypes.default.func,
  onImageMouseMove: _propTypes.default.func,
  onLoad: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  map: _propTypes.default.shape({
    areas: _propTypes.default.arrayOf(_propTypes.default.shape({
      area: _propTypes.default.shape({
        coords: _propTypes.default.arrayOf(_propTypes.default.number),
        href: _propTypes.default.string,
        shape: _propTypes.default.string,
        preFillColor: _propTypes.default.string,
        fillColor: _propTypes.default.string
      })
    })),
    name: _propTypes.default.string
  })
};

var _default = /*#__PURE__*/_react.default.memo(ImageMapper, (prevProps, nextProps) => {
  const watchedProps = ['active', 'fillColor', 'height', 'imgWidth', 'lineWidth', 'src', 'strokeColor', 'width'];
  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);
  return (0, _reactFastCompare.default)(prevProps.map, nextProps.map) || !propChanged;
});

exports.default = _default;
