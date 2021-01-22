import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import styles from './styles';

const ImageMapper = props => {
  const { map: mapProp, src: srcProp, rerenderProps } = props;

  const [map, setMap] = useState(JSON.parse(JSON.stringify(mapProp)));
  const [storedMap] = useState(map);
  const [isRendered, setRendered] = useState(false);
  const [imgRef, setImgRef] = useState(false);
  const container = useRef(null);
  const img = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateCacheMap();
      initCanvas();
    }
  }, [props, isInitialMount]);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    updateCacheMap();
    setRendered(true);
  }, []);

  const updateCacheMap = () => {
    setMap(JSON.parse(JSON.stringify(mapProp)));
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
    return false;
  };

  const drawRect = (coords, fillColor, lineWidth, strokeColor) => {
    const [left, top, right, bot] = coords;
    ctx.current.fillStyle = fillColor;
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.strokeRect(left, top, right - left, bot - top);
    ctx.current.fillRect(left, top, right - left, bot - top);
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
  };

  const drawPoly = (coords, fillColor, lineWidth, strokeColor) => {
    const newCoords = coords.reduce((a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]), []);
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
  };

  const getDimensions = type => {
    if (typeof props[type] === 'function') {
      return props[type](img.current);
    }
    return props[type];
  };

  const getValues = (type, measure, name = 'area') => {
    const responsiveWidth = props.parentWidth;
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img.current;

    if (type === 'width') {
      if (props.responsive) return responsiveWidth;
      if (props.natural) return naturalWidth;
      if (props.width || name === 'image') return measure;
      return clientWidth;
    }
    if (type === 'height') {
      if (props.responsive) return naturalHeight;
      if (props.natural) return naturalHeight;
      if (props.height || name === 'image') return measure;
      return clientHeight;
    }
    return false;
  };

  const initCanvas = (firstLoad = false) => {
    const imgWidth = getDimensions('width');
    const imgHeight = getDimensions('height');
    const imageWidth = getValues('width', imgWidth);
    const imageHeight = getValues('height', imgHeight);

    if (props.width || props.responsive) {
      img.current.width = getValues('width', imgWidth, 'image');
    }

    if (props.height || props.responsive) {
      img.current.height = getValues('height', imgHeight, 'image');
    }

    canvas.current.width = imageWidth;
    canvas.current.height = imageHeight;
    container.current.style.width = `${imageWidth}px`;
    container.current.style.height = `${imageHeight}px`;

    ctx.current = canvas.current.getContext('2d');
    ctx.current.fillStyle = props.fillColor;
    //ctx.strokeStyle = props.strokeColor;

    if (props.onLoad && firstLoad) {
      props.onLoad(img.current, {
        width: imageWidth,
        height: imageHeight,
      });
    }

    setImgRef(img.current);
    renderPrefilledAreas();
  };

  const hoverOn = (area, index, event) => {
    const shape = event.target.getAttribute('shape');

    if (props.active) {
      callingFn(
        shape,
        event.target.getAttribute('coords').split(','),
        area.fillColor || props.fillColor,
        area.lineWidth || props.lineWidth,
        area.strokeColor || props.strokeColor
      );
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
    if (props.stayHighlighted) {
      const newArea = { ...area };
      newArea.preFillColor = area.fillColor || props.fillColor;
      const updatedAreas = storedMap.areas.map(cur =>
        cur[props.areaKeyName] === area[props.areaKeyName] ? newArea : cur
      );
      setMap(prev => ({ ...prev, areas: updatedAreas }));
    }
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
    const { imgWidth, width, responsive, parentWidth } = props;
    const scale = width && imgWidth && imgWidth > 0 ? width / imgWidth : 1;
    if (responsive && parentWidth) {
      return coords.map(coord => (coord * scale) / (imgRef.naturalWidth / parentWidth));
    }
    return coords.map(coord => coord * scale);
  };

  const renderPrefilledAreas = () => {
    map.areas.map(area => {
      if (!area.preFillColor) return false;
      callingFn(
        area.shape,
        scaleCoords(area.coords),
        area.preFillColor,
        area.lineWidth || props.lineWidth,
        area.strokeColor || props.strokeColor
      );
      return true;
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
        const n = scaledCoords.length / 2;
        const { y: scaleY, x: scaleX } = scaledCoords.reduce(
          ({ y, x }, val, idx) => (!(idx % 2) ? { y, x: x + val / n } : { y: y + val / n, x }),
          { y: 0, x: 0 }
        );
        return [scaleX, scaleY];
      }
    }
  };

  const renderAreas = () =>
    map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);
      const extendedArea = { ...area, scaledCoords, center };

      return (
        <area
          key={area[props.areaKeyName] || index.toString()}
          shape={area.shape}
          coords={scaledCoords.join(',')}
          onMouseEnter={event => hoverOn(extendedArea, index, event)}
          onMouseLeave={event => hoverOff(extendedArea, index, event)}
          onMouseMove={event => mouseMove(extendedArea, index, event)}
          onClick={event => click(extendedArea, index, event)}
          href={area.href}
          alt="map"
        />
      );
    });

  return (
    <div id="img-mapper" style={styles(props).container} ref={container}>
      <img
        role="presentation"
        className="img-mapper-img"
        style={styles(props).img}
        src={srcProp}
        useMap={`#${map.name}`}
        alt="map"
        ref={img}
        onLoad={() => initCanvas(true)}
        onClick={imageClick}
        onMouseMove={imageMouseMove}
      />
      <canvas className="img-mapper-canvas" ref={canvas} style={styles().canvas} />
      <map className="img-mapper-map" name={map.name} style={styles().map}>
        {isRendered && renderAreas()}
      </map>
    </div>
  );
};

ImageMapper.defaultProps = {
  active: true,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  lineWidth: 1,
  map: {
    areas: [],
    name: `image-map-${Math.random()}`,
  },
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  natural: false,
  height: 0,
  imgWidth: 0,
  width: 0,
  areaKeyName: 'id',
  stayHighlighted: false,
  rerenderProps: [],
  parentWidth: 0,
  responsive: false,

  onClick: null,
  onMouseMove: null,
  onImageClick: null,
  onImageMouseMove: null,
  onLoad: null,
  onMouseEnter: null,
  onMouseLeave: null,
};

ImageMapper.propTypes = {
  active: PropTypes.bool,
  fillColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  imgWidth: PropTypes.number,
  lineWidth: PropTypes.number,
  src: PropTypes.string.isRequired,
  strokeColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  natural: PropTypes.bool,
  areaKeyName: PropTypes.string,
  stayHighlighted: PropTypes.bool,
  rerenderProps: PropTypes.array,
  parentWidth: PropTypes.number,
  responsive: PropTypes.bool,

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
          fillColor: PropTypes.string,
        }),
      })
    ),
    name: PropTypes.string,
  }),
};

export default React.memo(ImageMapper, (prevProps, nextProps) => {
  const watchedProps = [
    'src',
    'active',
    'width',
    'height',
    'imgWidth',
    'fillColor',
    'strokeColor',
    'lineWidth',
    'natural',
    'areaKeyName',
    'stayHighlighted',
    'parentWidth',
    'responsive',
    ...nextProps.rerenderProps,
  ];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return isEqual(prevProps.map, nextProps.map) && !propChanged;
});
