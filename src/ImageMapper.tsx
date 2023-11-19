import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import isEqual from 'react-fast-compare';

import { generateProps, rerenderPropsList } from '@/constants';
import callingFn from '@/draw';
import {
  imageClick,
  imageMouseMove,
  mouseDown,
  mouseMove,
  mouseUp,
  touchEnd,
  touchStart,
} from '@/events';
import styles from '@/styles';

import type {
  Area,
  AreaEvent,
  Dimension,
  ImageMapperProps,
  Map,
  MapArea,
  RefProperties,
  WidthHeight,
} from '@/types';

export * from '@/types';

const ImageMapper = forwardRef<RefProperties, Required<ImageMapperProps>>((props, ref) => {
  const {
    active,
    disabled,
    fillColor: fillColorProp,
    lineWidth: lineWidthProp,
    map: mapProp,
    src: srcProp,
    strokeColor: strokeColorProp,
    natural,
    height,
    width,
    imgWidth,
    areaKeyName,
    stayHighlighted,
    stayMultiHighlighted,
    toggleHighlighted,
    parentWidth,
    responsive,
    onLoad,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onImageClick,
    onImageMouseMove,
    onTouchStart,
    onTouchEnd,
    onMouseUp,
    onMouseDown,
    onMouseMove,
  } = props;

  const [map, setMap] = useState<Map>(mapProp);
  const [storedMap, setStoredMap] = useState<Map>(map);
  const [isRendered, setRendered] = useState<boolean>(false);
  const innerRef = useRef<RefProperties | null>(null);
  const img = useRef<HTMLImageElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const interval = useRef<number>(0);
  const prevParentWidth = useRef<number>(parentWidth ?? 0);

  useEffect(() => {
    if (!isRendered) {
      interval.current = window.setInterval(() => {
        if (img.current?.complete) {
          setRendered(true);
          console.log({ img: img.current });
        }
      }, 500);
    } else {
      clearInterval(interval.current);
    }
  }, [isRendered]);

  const getPropDimension = (): WidthHeight => {
    const getDimension = (dimension: Dimension): number => {
      if (!img.current) return 0;
      return typeof dimension === 'function' ? dimension(img.current) : dimension;
    };

    return { width: getDimension(width), height: getDimension(height) };
  };

  const scaleCoords = (coords: MapArea['coords']): number[] =>
    coords.map(coord => {
      if (responsive && parentWidth && img.current) {
        return coord / (img.current.naturalWidth / parentWidth);
      }

      const { width: imageWidth } = getPropDimension();
      const scale = imageWidth && imgWidth > 0 ? imageWidth / imgWidth : 1;
      return coord * scale;
    });

  const renderPrefilledAreas = (mapObj: Map = map) => {
    mapObj.areas.forEach(area => {
      if (!area.preFillColor) return false;

      return callingFn(
        area.shape,
        scaleCoords(area.coords),
        area.preFillColor,
        area.lineWidth ?? lineWidthProp,
        area.strokeColor ?? strokeColorProp,
        ctx
      );
    });
  };

  const clearCanvas = () => {
    if (!(ctx.current && canvas.current)) return;

    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const updateCanvas = (mapObj: Map): void => {
    clearCanvas();
    renderPrefilledAreas(mapObj);
  };

  const updateMap = () => {
    setMap(mapProp);
    setStoredMap(mapProp);
  };

  const highlightArea = (area: Area): void => {
    if (area.active) return;

    callingFn(area.shape, area.scaledCoords, area.fillColor, area.lineWidth, area.strokeColor, ctx);
  };

  const hoverOn = (area: Area, index: number, event: AreaEvent) => {
    if (active) highlightArea(area);

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const hoverOff = (area: Area, index: number, event: AreaEvent) => {
    if (active) updateCanvas(map);

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const click = (area: Area, index: number, event: AreaEvent) => {
    const isAreaActive = area.active ?? true;

    if (active && isAreaActive && (stayHighlighted || stayMultiHighlighted || toggleHighlighted)) {
      const newArea = { ...area };
      const chosenArea = stayMultiHighlighted ? map : storedMap;

      if (toggleHighlighted && newArea.preFillColor) {
        const isPreFillColorFromJSON = storedMap.areas.find(
          c => c[areaKeyName] === area[areaKeyName]
        );

        if (isPreFillColorFromJSON && !isPreFillColorFromJSON.preFillColor) {
          delete newArea.preFillColor;
        }
      } else if (stayHighlighted || stayMultiHighlighted) {
        newArea.preFillColor = area.fillColor ?? fillColorProp;
      }

      const updatedAreas = chosenArea.areas.map(cur =>
        cur[areaKeyName] === area[areaKeyName] ? newArea : cur
      );

      setMap(prev => ({ ...prev, areas: updatedAreas }));

      if (!stayMultiHighlighted) {
        updateCanvas(mapProp);
        highlightArea(area);
      }
    }

    if (onClick) {
      event.preventDefault();
      onClick(area, index, event);
    }
  };

  const getDimensions = (): WidthHeight => {
    const getValues = (type: 'width' | 'height'): number => {
      const { width: imageWidth, height: imageHeight } = getPropDimension();

      if (img.current) {
        const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img.current;

        if (type === 'width') {
          if (responsive) return parentWidth;
          if (natural) return naturalWidth;
          if (imageWidth) return imageWidth;
          return clientWidth;
        }

        if (type === 'height') {
          if (responsive) return clientHeight;
          if (natural) return naturalHeight;
          if (imageHeight) return imageHeight;
          return clientHeight;
        }
      }

      return 0;
    };

    return { width: getValues('width'), height: getValues('height') };
  };

  const initCanvas = () => {
    const { width: imageWidth, height: imageHeight } = getDimensions();

    if (!(img.current && canvas.current && innerRef.current && ctx.current)) return;

    img.current.width = imageWidth;
    img.current.height = imageHeight;

    canvas.current.width = imageWidth;
    canvas.current.height = imageHeight;

    innerRef.current.style.width = `${imageWidth}px`;
    innerRef.current.style.height = `${imageHeight}px`;

    // ctx.current = canvas.current.getContext('2d');
    ctx.current.fillStyle = fillColorProp;

    renderPrefilledAreas();

    if (onLoad) onLoad(img.current, { width: imageWidth, height: imageHeight });
  };

  useEffect(() => {
    if (isRendered && canvas.current) {
      initCanvas();
      ctx.current = canvas.current.getContext('2d');
      updateMap();
    }
  }, [isRendered]);

  useEffect(() => {
    if (isRendered) {
      updateMap();
      initCanvas();
      updateCanvas(mapProp);
    }
  }, [isRendered, props]);

  useEffect(() => {
    if (responsive && parentWidth) {
      if (prevParentWidth.current !== parentWidth) {
        initCanvas();
        prevParentWidth.current = parentWidth;
      }
    }
  }, [responsive, parentWidth]);

  useImperativeHandle(
    ref,
    () => {
      innerRef.current.clearHighlightedArea = () => {
        setMap(storedMap);
        initCanvas();
      };
      return innerRef.current;
    },
    []
  );

  const computeCenter = (area: MapArea): Area['center'] => {
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
      const extendedArea = {
        ...area,
        scaledCoords,
        center,
        active: area.active ?? true,
        fillColor: area.fillColor ?? fillColorProp,
        lineWidth: area.lineWidth ?? lineWidthProp,
        strokeColor: area.strokeColor ?? strokeColorProp,
      };

      if (area.disabled) return null;

      return (
        <area
          {...(area.preFillColor ? { className: 'img-mapper-area-highlighted' } : {})}
          key={area[areaKeyName] ?? index.toString()}
          shape={area.shape}
          coords={scaledCoords.join(',')}
          onMouseEnter={event => hoverOn(extendedArea, index, event)}
          onMouseLeave={event => hoverOff(extendedArea, index, event)}
          onMouseMove={event => mouseMove(extendedArea, index, event, { onMouseMove })}
          onMouseDown={event => mouseDown(extendedArea, index, event, { onMouseDown })}
          onMouseUp={event => mouseUp(extendedArea, index, event, { onMouseUp })}
          onTouchStart={event => touchStart(extendedArea, index, event, { onTouchStart })}
          onTouchEnd={event => touchEnd(extendedArea, index, event, { onTouchEnd })}
          onClick={event => click(extendedArea, index, event)}
          href={area.href}
          alt="map"
        />
      );
    });

  return (
    <div ref={innerRef} id="img-mapper" style={styles.container}>
      <img
        ref={img}
        role="presentation"
        className="img-mapper-img"
        style={{ ...styles.img(responsive), ...(!isRendered ? { display: 'none' } : null) }}
        src={srcProp}
        useMap={`#${map.name}`}
        alt="map"
        onClick={event => imageClick(event, { onImageClick })}
        onMouseMove={event => imageMouseMove(event, { onImageMouseMove })}
      />
      <canvas ref={canvas} className="img-mapper-canvas" style={styles.canvas} />
      <map className="img-mapper-map" name={map.name} style={styles.map(onClick)}>
        {isRendered && !disabled && renderAreas()}
      </map>
    </div>
  );
});

ImageMapper.displayName = 'ImageMapperForwarded';

const ImageMapperRequired = forwardRef<RefProperties, ImageMapperProps>((props, ref) => (
  <ImageMapper ref={ref} {...generateProps(props)} />
));

ImageMapperRequired.displayName = 'ImageMapperRequiredForwarded';

export default memo(ImageMapperRequired, (prevProps, nextProps) => {
  const watchedProps = [...rerenderPropsList, ...(nextProps.rerenderProps ?? [])];

  const propChanged = watchedProps.some(prop => prevProps[prop] !== nextProps[prop]);

  return isEqual(prevProps.map, nextProps.map) && !propChanged;
});
