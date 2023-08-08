import React, { useEffect, useRef, useState } from 'react';

import isEqual from 'react-fast-compare';

import { ImageMapperDefaultProps, rerenderPropsList } from '@/constants';
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

import type { AreaEvent, Container, CustomArea, ImageMapperProps, Map, MapAreas } from '@/types';

export * from '@/types';

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
  const [imgRef, setImgRef] = useState<HTMLImageElement>(null);
  const container = useRef<Container>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const isInitialMount = useRef<boolean>(true);
  const interval = useRef<number>(0);

  const scaleCoords = (coords: number[]): number[] => {
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
    mapObj.areas.forEach(area => {
      if (!area.preFillColor) return false;
      callingFn(
        area.shape,
        scaleCoords(area.coords),
        area.preFillColor,
        area.lineWidth || lineWidthProp,
        area.strokeColor || strokeColorProp,
        true,
        ctx
      );
      return true;
    });
  };

  const clearCanvas = () =>
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);

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

  const initCanvas = (firstLoad = false) => {
    if (!firstLoad && !imgRef) return;

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

    if (onLoad && imgRef) {
      onLoad(img.current, {
        width: imageWidth,
        height: imageHeight,
      });
    }

    setImgRef(img.current);
    if (imgRef) renderPrefilledAreas();
  };

  const highlightArea = (area: CustomArea) =>
    callingFn(
      area.shape,
      area.scaledCoords,
      area.fillColor || fillColorProp,
      area.lineWidth || lineWidthProp,
      area.strokeColor || strokeColorProp,
      area.active ?? true,
      ctx
    );

  const hoverOn = (area: CustomArea, index?: number, event?: AreaEvent) => {
    if (active) highlightArea(area);

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const hoverOff = (area: CustomArea, index: number, event: AreaEvent) => {
    if (active) {
      clearCanvas();
      renderPrefilledAreas();
    }

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const click = (area: CustomArea, index: number, event: AreaEvent) => {
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
        newArea.preFillColor = area.fillColor || fillColorProp;
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
      initCanvas(true);
      ctx.current = canvas.current.getContext('2d');
      updateCacheMap();
    }
  }, [isRendered]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      updateCacheMap();
      initCanvas();
      if (imgRef) updateCanvas();
    }
  }, [props, isInitialMount, imgRef]);

  useEffect(() => {
    container.current.clearHighlightedArea = () => {
      setMap(storedMap);
      initCanvas();
    };

    if (containerRef) {
      containerRef.current = container.current;
    }
  }, [imgRef]);

  useEffect(() => {
    if (responsive) initCanvas();
  }, [parentWidth]);

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

  const renderAreas = () =>
    map.areas.map((area, index) => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);
      const extendedArea = { ...area, scaledCoords, center };

      if (area.disabled) return null;

      return (
        <area
          {...(area.preFillColor ? { className: 'img-mapper-area-highlighted' } : {})}
          key={area[areaKeyName] || index.toString()}
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
    <div ref={container} id="img-mapper" style={styles.container}>
      <img
        ref={img}
        role="presentation"
        className="img-mapper-img"
        style={{ ...styles.img(responsive), ...(!imgRef ? { display: 'none' } : null) }}
        src={srcProp}
        useMap={`#${map.name}`}
        alt="map"
        onClick={event => imageClick(event, { onImageClick })}
        onMouseMove={event => imageMouseMove(event, { onImageMouseMove })}
      />
      <canvas ref={canvas} className="img-mapper-canvas" style={styles.canvas} />
      <map className="img-mapper-map" name={map.name} style={styles.map(onClick)}>
        {isRendered && !disabled && imgRef && renderAreas()}
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
