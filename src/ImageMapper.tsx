import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import isEqual from 'react-fast-compare';

import { generateProps, rerenderPropsList } from '@/constants';
import drawShape from '@/draw';
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
  Refs,
  WidthHeight,
} from '@/types';

export * from '@/types';

const ImageMapper = forwardRef<RefProperties, Required<ImageMapperProps>>((props, ref) => {
  const {
    active,
    disabled,
    fillColor,
    lineWidth,
    map,
    src,
    strokeColor,
    natural,
    height,
    width,
    imgWidth,
    areaKeyName,
    highlighted,
    parentWidth,
    responsive,
    onChange,
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

  const [isRendered, setRendered] = useState<boolean>(false);
  const mapRef = useRef<Map>(map);
  const containerRef = useRef<Refs['containerRef']>(null);
  const img = useRef<Refs['imgRef']>(null);
  const canvas = useRef<Refs['canvasRef']>(null);
  const ctx = useRef<Refs['ctxRef']>(null);
  const interval = useRef<number>(0);
  const prevParentWidth = useRef<number>(parentWidth ?? 0);

  const init = useCallback(() => {
    if (img.current?.complete && canvas.current && containerRef.current) {
      ctx.current = canvas.current.getContext('2d');

      setRendered(true);
      console.log({ img: img.current });
    }
  }, []);

  useEffect(() => {
    if (!isRendered) {
      interval.current = window.setInterval(init, 500);
    } else {
      clearInterval(interval.current);
    }
  }, [init, isRendered]);

  const getPropDimension = useCallback((): WidthHeight => {
    const getDimension = (dimension: Dimension): number => {
      if (!img.current) return 0;
      return typeof dimension === 'function' ? dimension(img.current) : dimension;
    };

    return { width: getDimension(width), height: getDimension(height) };
  }, [height, width]);

  const scaleCoords = useCallback(
    (coords: MapArea['coords']): number[] =>
      coords.map(coord => {
        if (responsive && parentWidth && img.current) {
          return coord / (img.current.naturalWidth / parentWidth);
        }

        const { width: imageWidth } = getPropDimension();
        const scale = imageWidth && imgWidth > 0 ? imageWidth / imgWidth : 1;
        return coord * scale;
      }),
    [getPropDimension, imgWidth, parentWidth, responsive]
  );

  const computeCenter = useCallback(
    (area: MapArea): Area['center'] => {
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
    },
    [scaleCoords]
  );

  const getExtendedArea = useCallback(
    (area: MapArea): Area => {
      const scaledCoords = scaleCoords(area.coords);
      const center = computeCenter(area);

      return {
        ...area,
        scaledCoords,
        center,
        active: area.active ?? true,
        fillColor: area.fillColor ?? fillColor,
        lineWidth: area.lineWidth ?? lineWidth,
        strokeColor: area.strokeColor ?? strokeColor,
      };
    },
    [computeCenter, fillColor, lineWidth, scaleCoords, strokeColor]
  );

  const renderPrefilledAreas = useCallback(() => {
    map.areas.forEach(area => {
      const extendedArea = getExtendedArea(area);

      if (!extendedArea.preFillColor) return false;

      return drawShape({ ...extendedArea, fillColor: extendedArea.preFillColor }, ctx);
    });
  }, [map.areas, getExtendedArea]);

  const clearCanvas = useCallback(() => {
    if (!(ctx.current && canvas.current)) return;

    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const resetCanvasAndPrefillArea = useCallback(() => {
    clearCanvas();
    renderPrefilledAreas();
  }, [clearCanvas, renderPrefilledAreas]);

  const highlightArea = (area: MapArea): boolean => {
    const extendedArea = getExtendedArea(area);

    if (!extendedArea.active) return false;

    return drawShape(extendedArea, ctx);
  };

  const onHighlightArea = (area: MapArea) => {
    if (!highlighted) return;

    const { isMulti = true, toggle = false } = highlighted;
    const areasRef = mapRef.current.areas;

    const chosenArea = isMulti ? area : areasRef.find(c => c[areaKeyName] === area[areaKeyName]);
    if (!chosenArea) return;

    const extendedArea = getExtendedArea(chosenArea);
    if (!(active && extendedArea.active)) return;

    const chosenMap = isMulti ? map : mapRef.current;
    const newArea = { ...chosenArea };

    if (toggle && newArea.preFillColor) {
      const isPreFillColorFromJSON = chosenMap.areas.find(
        c => c[areaKeyName] === area[areaKeyName]
      );

      if (isPreFillColorFromJSON?.preFillColor) delete newArea.preFillColor;
    } else {
      newArea.preFillColor = extendedArea.fillColor;
    }

    const areas = chosenMap.areas.map(cur =>
      cur[areaKeyName] === area[areaKeyName] ? newArea : cur
    );

    onChange(newArea, areas);
  };

  const hoverOn = (area: MapArea, index: number, event: AreaEvent) => {
    if (active) highlightArea(area);

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

  const hoverOff = (area: MapArea, index: number, event: AreaEvent) => {
    if (active) resetCanvasAndPrefillArea();

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

  const click = (area: MapArea, index: number, event: AreaEvent) => {
    onHighlightArea(area);

    if (onClick) {
      event.preventDefault();
      onClick(area, index, event);
    }
  };

  const getDimensions = useCallback((): WidthHeight => {
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
  }, [getPropDimension, natural, parentWidth, responsive]);

  const initCanvas = useCallback(
    (isFirstTime = true, triggerOnLoad = false) => {
      const { width: imageWidth, height: imageHeight } = getDimensions();

      if (!(img.current && canvas.current && containerRef.current && ctx.current)) return;

      containerRef.current.style.width = `${imageWidth}px`;
      containerRef.current.style.height = `${imageHeight}px`;

      if (isFirstTime) {
        initCanvas(false, true);
      } else {
        img.current.width = imageWidth;
        img.current.height = imageHeight;

        canvas.current.width = imageWidth;
        canvas.current.height = imageHeight;

        renderPrefilledAreas();
      }

      if (onLoad && triggerOnLoad) {
        onLoad(img.current, { width: imageWidth, height: imageHeight });
      }
    },
    [getDimensions, onLoad, renderPrefilledAreas]
  );

  useEffect(() => {
    if (isRendered) initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRendered]);

  useEffect(() => {
    if (responsive && parentWidth) {
      if (prevParentWidth.current !== parentWidth) {
        initCanvas();
        prevParentWidth.current = parentWidth;
      }
    }
  }, [responsive, parentWidth, initCanvas]);

  useImperativeHandle(
    ref,
    () => ({
      clearHighlightedArea: () => resetCanvasAndPrefillArea(),
      getRefs: () => ({
        containerRef: containerRef.current,
        imgRef: img.current,
        canvasRef: canvas.current,
      }),
    }),
    [resetCanvasAndPrefillArea]
  );

  const renderAreas = () =>
    map.areas.map((area, index) => {
      const { scaledCoords } = getExtendedArea(area);

      if (area.disabled) return null;

      return (
        <area
          {...(area.preFillColor ? { className: 'img-mapper-area-highlighted' } : {})}
          key={area[areaKeyName] ?? index.toString()}
          shape={area.shape}
          coords={scaledCoords.join(',')}
          onMouseEnter={event => hoverOn(area, index, event)}
          onMouseLeave={event => hoverOff(area, index, event)}
          onMouseMove={event => mouseMove({ area, index, event }, { onMouseMove })}
          onMouseDown={event => mouseDown({ area, index, event }, { onMouseDown })}
          onMouseUp={event => mouseUp({ area, index, event }, { onMouseUp })}
          onTouchStart={event => touchStart({ area, index, event }, { onTouchStart })}
          onTouchEnd={event => touchEnd({ area, index, event }, { onTouchEnd })}
          onClick={event => click(area, index, event)}
          href={area.href}
          alt="map"
        />
      );
    });

  return (
    <div ref={containerRef} id="img-mapper" style={styles.container}>
      <img
        ref={img}
        role="presentation"
        className="img-mapper-img"
        style={{ ...styles.img(responsive), ...(!isRendered ? { display: 'none' } : null) }}
        src={src}
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
