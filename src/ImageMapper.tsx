import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import styles from './styles';
import {
  Map,
  Container,
  MapAreas,
  CustomArea,
  ImageEvent,
  AreaEvent,
  rerenderPropsList,
  ImageMapperProps,
  ImageMapperDefaultProps,
} from './types';

const ImageMapper: React.FC<ImageMapperProps> = (props: ImageMapperProps) => {
  const {
    containerRef,
    active,
    disabled,
    fillColor: fillColorProp,
    lineWidth: lineWidthProp,
    map: mapProp,
    src: srcProp,
    strokeColor: strokeColorProp,
    natural,
    height: heightProp,
    width: widthProp,
    imgWidth: imageWidthProp,
    areaKeyName,
    stayHighlighted,
    stayMultiHighlighted,
    toggleHighlighted,
    parentWidth,
    responsive,
  } = props;

  const [map, setMap] = useState<Map>(mapProp);
  const [storedMap, setStoredMap] = useState<Map>(map);
  const [isRendered, setRendered] = useState<boolean>(false);
  const [imgRef, setImgRef] = useState<HTMLImageElement>(null);
  const [isClearFnCalled, setClearFnCall] = useState<boolean>(false);
  const container = useRef<Container>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateCacheMap();
      initCanvas();
      updateCanvas();
    }
  }, [props, isInitialMount]);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    updateCacheMap();
    setRendered(true);
  }, []);

  useEffect(() => {
    container.current.clearHighlightedArea = () => {
      setMap(storedMap);
      setClearFnCall(true);
    };

    if (containerRef) {
      containerRef.current = container.current;
    }
  }, []);

  useEffect(() => {
    if (isClearFnCalled) {
      setClearFnCall(false);
      initCanvas();
    }
  }, [isClearFnCalled]);

  useEffect(() => {
    if (responsive) initCanvas();
  }, [parentWidth]);

  const updateCacheMap = () => {
    setMap(mapProp);
    setStoredMap(mapProp);
  };

  const callingFn = (
    shape: string,
    coords: number[],
    fillColor: string,
    lineWidth: number,
    strokeColor: string,
    isAreaActive: boolean
  ) => {
    if (shape === 'rect' && isAreaActive) {
      return drawRect(coords, fillColor, lineWidth, strokeColor);
    }
    if (shape === 'circle' && isAreaActive) {
      return drawCircle(coords, fillColor, lineWidth, strokeColor);
    }
    if (shape === 'poly' && isAreaActive) {
      return drawPoly(coords, fillColor, lineWidth, strokeColor);
    }
    return false;
  };

  const drawRect = (
    coords: number[],
    fillColor: string,
    lineWidth: number,
    strokeColor: string
  ) => {
    const [left, top, right, bot] = coords;
    ctx.current.fillStyle = fillColor;
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.strokeRect(left, top, right - left, bot - top);
    ctx.current.fillRect(left, top, right - left, bot - top);
  };

  const drawCircle = (
    coords: number[],
    fillColor: string,
    lineWidth: number,
    strokeColor: string
  ) => {
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;
    ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
  };

  const drawPoly = (
    coords: number[],
    fillColor: string,
    lineWidth: number,
    strokeColor: string
  ) => {
    const newCoords = coords.reduce((a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]), []);
    // const first = newCoords.unshift();
    ctx.current.fillStyle = fillColor;
    ctx.current.beginPath();
    ctx.current.lineWidth = lineWidth;
    ctx.current.strokeStyle = strokeColor;

    // ctx.current.moveTo(first[0], first[1]);
    newCoords.forEach(c => ctx.current.lineTo(c[0], c[1]));
    ctx.current.closePath();
    ctx.current.stroke();
    ctx.current.fill();
  };

  const getDimensions = (type: 'width' | 'height'): number => {
    if (typeof props[type] === 'function') {
      // @ts-ignore
      return props[type](img.current);
    }
    return props[type] as number;
  };

  const getValues = (type: string, measure: number, name = 'area') => {
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img.current;

    if (type === 'width') {
      if (responsive) return parentWidth;
      if (natural) return naturalWidth;
      if (widthProp || name === 'image') return measure;
      return clientWidth;
    }
    if (type === 'height') {
      if (responsive) return clientHeight;
      if (natural) return naturalHeight;
      if (heightProp || name === 'image') return measure;
      return clientHeight;
    }
    return 0;
  };

  const initCanvas = (firstLoad = false) => {
    const imgWidth = getDimensions('width');
    const imgHeight = getDimensions('height');
    const imageWidth = getValues('width', imgWidth);
    const imageHeight = getValues('height', imgHeight);

    if (widthProp || responsive) {
      img.current.width = getValues('width', imgWidth, 'image');
    }

    if (heightProp || responsive) {
      img.current.height = getValues('height', imgHeight, 'image');
    }

    canvas.current.width = imageWidth;
    canvas.current.height = imageHeight;
    container.current.style.width = `${imageWidth}px`;
    container.current.style.height = `${imageHeight}px`;

    ctx.current = canvas.current.getContext('2d');
    ctx.current.fillStyle = fillColorProp;
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

  const hoverOn = (area: CustomArea, index?: number, event?: AreaEvent) => {
    const { shape, scaledCoords, fillColor, lineWidth, strokeColor, active: isAreaActive } = area;

    if (active) {
      callingFn(
        shape,
        scaledCoords,
        fillColor || fillColorProp,
        lineWidth || lineWidthProp,
        strokeColor || strokeColorProp,
        isAreaActive ?? true
      );
    }

    if (props.onMouseEnter) props.onMouseEnter(area, index, event);
  };

  const hoverOff = (area: CustomArea, index: number, event: AreaEvent) => {
    if (active) {
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
      renderPrefilledAreas();
    }

    if (props.onMouseLeave) props.onMouseLeave(area, index, event);
  };

  const click = (area: CustomArea, index: number, event: AreaEvent) => {
    const isAreaActive = area.active ?? true;
    if (isAreaActive && (stayHighlighted || stayMultiHighlighted || toggleHighlighted)) {
      const newArea = { ...area };
      const chosenArea = stayMultiHighlighted ? map : storedMap;
      if (toggleHighlighted && newArea.preFillColor) {
        delete newArea.preFillColor;
      } else if (stayHighlighted || stayMultiHighlighted) {
        newArea.preFillColor = area.fillColor || fillColorProp;
      }
      const updatedAreas = chosenArea.areas.map(cur =>
        cur[areaKeyName] === area[areaKeyName] ? newArea : cur
      );
      setMap(prev => ({ ...prev, areas: updatedAreas }));
    }
    if (props.onClick) {
      event.preventDefault();
      props.onClick(area, index, event);
    }
  };

  const imageClick = (event: ImageEvent) => {
    if (props.onImageClick) {
      event.preventDefault();
      props.onImageClick(event);
    }
  };

  const mouseMove = (area: CustomArea, index: number, event: AreaEvent) => {
    if (props.onMouseMove) props.onMouseMove(area, index, event);
  };

  const imageMouseMove = (event: ImageEvent) => {
    if (props.onImageMouseMove) props.onImageMouseMove(event);
  };

  const scaleCoords = (coords: []): number[] => {
    const scale =
      widthProp && imageWidthProp && imageWidthProp > 0
        ? (widthProp as number) / imageWidthProp
        : 1;
    if (responsive && parentWidth) {
      return coords.map(coord => coord / (imgRef.naturalWidth / parentWidth));
    }
    return coords.map(coord => coord * scale);
  };

  const renderPrefilledAreas = (mapObj: Map = map) => {
    mapObj.areas.map(area => {
      if (!area.preFillColor) return false;
      callingFn(
        area.shape,
        scaleCoords(area.coords),
        area.preFillColor,
        area.lineWidth || lineWidthProp,
        area.strokeColor || strokeColorProp,
        true
      );
      return true;
    });
  };

  const computeCenter = (area: MapAreas): [number, number] => {
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

  const updateCanvas = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    renderPrefilledAreas(mapProp);
  };

  const renderAreas = () =>
    map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);
      const extendedArea = { ...area, scaledCoords, center };

      if (area.disabled) return null;

      return (
        <area
          key={area[areaKeyName] || index.toString()}
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
        {isRendered && !disabled && renderAreas()}
      </map>
    </div>
  );
};

ImageMapper.defaultProps = ImageMapperDefaultProps;

export default React.memo<ImageMapperProps>(ImageMapper, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...nextProps.rerenderProps!];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return isEqual(prevProps.map, nextProps.map) && !propChanged;
});
