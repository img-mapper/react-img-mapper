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

import type { Area, AreaEvent, ImageMapperProps, Map, MapArea, RefProperties } from '@/types';

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
    height: heightProp,
    width: widthProp,
    imgWidth: imageWidthProp,
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

  const scaleCoords = (coords: number[]): number[] =>
    coords.map(coord => {
      if (responsive && parentWidth && img.current) {
        return coord / (img.current.naturalWidth / parentWidth);
      }

      const scale = widthProp && imageWidthProp > 0 ? widthProp / imageWidthProp : 1;
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
        true,
        ctx
      );
    });
  };

  const clearCanvas = () => {
    if (!(ctx.current && canvas.current)) return;

    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const updateCanvas = () => {
    clearCanvas();
    renderPrefilledAreas(mapProp);
  };

  const updateCacheMap = () => {
    setMap(mapProp);
    setStoredMap(mapProp);
  };

  const getDimensions = (type: 'width' | 'height'): number => {
    const { [type]: dimension } = props;

    if (typeof dimension === 'function') {
      return dimension(img.current);
    }
    return dimension as number;
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

  const initCanvas = () => {
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
    innerRef.current.style.width = `${imageWidth}px`;
    innerRef.current.style.height = `${imageHeight}px`;

    ctx.current = canvas.current.getContext('2d');
    ctx.current.fillStyle = fillColorProp;

    if (onLoad) {
      onLoad(img.current, {
        width: imageWidth,
        height: imageHeight,
      });
    }

    renderPrefilledAreas();
  };

  const highlightArea = (area: Area) =>
    callingFn(
      area.shape,
      area.scaledCoords,
      area.fillColor ?? fillColorProp,
      area.lineWidth ?? lineWidthProp,
      area.strokeColor ?? strokeColorProp,
      area.active ?? true,
      ctx
    );

  const hoverOn = (area: Area, index: number, event: AreaEvent) => {
    if (active) highlightArea(area);

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const hoverOff = (area: Area, index: number, event: AreaEvent) => {
    if (active) {
      clearCanvas();
      renderPrefilledAreas();
    }

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const click = (area: Area, index: number, event: AreaEvent) => {
    const isAreaActive = area.active ?? true;

    if (isAreaActive && (stayHighlighted || stayMultiHighlighted || toggleHighlighted)) {
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
        updateCanvas();
        highlightArea(area);
      }
    }

    if (onClick) {
      event.preventDefault();
      onClick(area, index, event);
    }
  };

  useEffect(() => {
    if (!isRendered) {
      interval.current = window.setInterval(() => {
        if (img.current?.complete) setRendered(true);
      }, 500);
    } else {
      clearInterval(interval.current);
    }
  }, [isRendered]);

  useEffect(() => {
    if (isRendered && canvas.current) {
      initCanvas();
      ctx.current = canvas.current.getContext('2d');
      updateCacheMap();
    }
  }, [isRendered]);

  useEffect(() => {
    if (isRendered) {
      updateCacheMap();
      initCanvas();
      updateCanvas();
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

  const computeCenter = (area: MapArea): [number, number] => {
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
