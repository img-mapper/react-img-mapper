import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import isEqual from 'react-fast-compare';

import { getExtendedArea } from '@/helpers/area';
import { generateProps, rerenderPropsList } from '@/helpers/constants';
import { getDimension, getDimensions, getPropDimension } from '@/helpers/dimensions';
import drawShape from '@/helpers/draw';
import {
  click,
  imageClick,
  imageMouseMove,
  mouseDown,
  mouseEnter,
  mouseLeave,
  mouseMove,
  mouseUp,
  touchEnd,
  touchStart,
} from '@/helpers/events';
import styles from '@/helpers/styles';

import type { FC, ReactNode } from 'react';

import type { ImageMapperPropsWithRef, MapArea, Refs } from '@/@types';
import type { PrevStateRef } from '@/@types/dimensions';
import type { CTX } from '@/@types/draw';

const ImageMapper: FC<ImageMapperPropsWithRef> = ({ ref, ...props }) => {
  const generatedProps = generateProps(props);
  const {
    src,
    name,
    areas,
    areaKeyName,
    isMulti,
    toggle,
    active,
    disabled,
    fillColor,
    strokeColor,
    lineWidth,
    imgWidth,
    width,
    height,
    natural,
    responsive,
    parentWidth,
    containerProps,
    imgProps,
    canvasProps,
    mapProps,
    areaProps,

    onChange,
    onImageClick,
    onImageMouseMove,
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onLoad,
  } = generatedProps;

  const [isRendered, setIsRendered] = useState<boolean>(false);

  const [hoverOpacity, setHoverOpacity] = useState<Record<string, number>>({});


  const animate = (from: number, to: number, duration: number, cb: (v: number) => void) => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * t;
      cb(v);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const areasRef = useRef<MapArea[]>(areas);
  const containerRef = useRef<Refs['containerRef']>(null);
  const img = useRef<Refs['imgRef']>(null);
  const canvas = useRef<Refs['canvasRef']>(null);
  const ctx = useRef<CTX<null>['current']>(null);
  const interval = useRef<number>(0);
  const prevState = useRef<PrevStateRef>({
    parentWidth,
    ...getPropDimension({ width, height, img }),
  });

  const dimensionParams = useMemo(
    () => ({ width, height, responsive, parentWidth, natural }),
    [width, height, responsive, parentWidth, natural],
  );

  const scaleCoordsParams = useMemo(
    () => ({ width, height, responsive, parentWidth, imgWidth }),
    [width, height, responsive, parentWidth, imgWidth],
  );

  const areaParams = useMemo(
    () => ({ fillColor, lineWidth, strokeColor }),
    [fillColor, lineWidth, strokeColor],
  );

  const init = useCallback(() => {
    if (img.current?.complete && canvas.current && containerRef.current) {
      ctx.current = canvas.current.getContext('2d');
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    if (isRendered) {
      clearInterval(interval.current);
    } else {
      interval.current = window.setInterval(init, 500);
    }
  }, [init, isRendered]);

  const renderPrefilledAreas = useCallback(() => {
    areas.forEach((area) => {
      const extendedArea = getExtendedArea(area, { img, ...scaleCoordsParams }, areaParams);
      if (!extendedArea.preFillColor) return false;
      return drawShape(
        { ...extendedArea, fillColor: extendedArea.preFillColor },
        ctx
      );
    });
  }, [areaParams, areas, scaleCoordsParams]);

  const clearCanvas = useCallback(() => {
    if (!(ctx.current && canvas.current)) return;
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }, []);

  const resetCanvasAndPrefillArea = useCallback(() => {
    clearCanvas();
    renderPrefilledAreas();
  }, [clearCanvas, renderPrefilledAreas]);

  const highlightArea = (area: MapArea, opacity = 1): boolean => {
    const extendedArea = getExtendedArea(area, { img, ...scaleCoordsParams }, areaParams);
    if (!extendedArea.active) return false;

    const rgba = extendedArea.fillColor
      .replace(/rgba?\(([^)]+)\)/, (match, inner) => {
        const base = inner.split(',').slice(0, 3).join(',');
        return `rgba(${base}, ${opacity})`;
      });

    return drawShape(
      { ...extendedArea, fillColor: rgba },
      ctx
    );
  };

  const onHighlightArea = (area: MapArea): void => {
    const chosenAreasRef = areasRef.current;

    const chosenArea = isMulti
      ? area
      : chosenAreasRef.find((c) => c[areaKeyName] === area[areaKeyName]);

    if (!chosenArea) return;

    const extendedArea = getExtendedArea(chosenArea, { img, ...scaleCoordsParams }, areaParams);
    if (!(active && extendedArea.active)) return;

    const chosenAreas = isMulti ? areas : chosenAreasRef;
    const newArea = { ...chosenArea };

    const isCurrentAreaSelected = (() => {
      if (toggle) {
        if (isMulti && newArea.preFillColor) return true;
        return !isMulti && !!area.preFillColor;
      }
      return false;
    })();

    if (isCurrentAreaSelected) {
      const isPreFillColorFromJSON = chosenAreas.find((c) => c[areaKeyName] === area[areaKeyName]);
      if (isPreFillColorFromJSON?.preFillColor) delete newArea.preFillColor;
    } else {
      newArea.preFillColor = extendedArea.fillColor;
    }

    const updatedAreas = chosenAreas.map((cur) =>
      cur[areaKeyName] === area[areaKeyName] ? newArea : cur,
    );

    if (onChange) onChange(newArea, updatedAreas);
  };

  const initCanvas = useCallback(
    (isFirstTime = true, triggerOnLoad = false) => {
      const { width: imageWidth, height: imageHeight } = getDimensions({ img, ...dimensionParams });

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
    [dimensionParams, onLoad, renderPrefilledAreas],
  );

  const getRefs = useCallback(
    () => ({ containerRef: containerRef.current, imgRef: img.current, canvasRef: canvas.current }),
    [],
  );

  useEffect(() => {
    if (isRendered) initCanvas();
  }, [isRendered]);

  useEffect(() => {
    resetCanvasAndPrefillArea();
  }, [areas, resetCanvasAndPrefillArea]);

  useEffect(() => {
    if (responsive && parentWidth && prevState.current.parentWidth !== parentWidth) {
      initCanvas();
      prevState.current.parentWidth = parentWidth;
    }

    if (width && prevState.current.width !== width) {
      initCanvas();
      prevState.current.width = getDimension(width, img);
    }

    if (height && prevState.current.height !== height) {
      initCanvas();
      prevState.current.height = getDimension(height, img);
    }
  }, [height, initCanvas, parentWidth, responsive, width]);

  useImperativeHandle(ref, () => ({ getRefs }), [getRefs]);

  const handleMouseEnter = (area: MapArea): void => {
    if (!active) return;
    const key = area[areaKeyName];

    animate(0, 1, 250, (value) => {
      setHoverOpacity((prev) => ({ ...prev, [key]: value }));
      resetCanvasAndPrefillArea();
      highlightArea(area, value);
    });
  };

  
  const handleMouseLeave = (area: MapArea): void => {
    if (!active) return;
    const key = area[areaKeyName];
    const current = hoverOpacity[key] ?? 1;

    animate(current, 0, 250, (value) => {
      setHoverOpacity((prev) => ({ ...prev, [key]: value }));
      resetCanvasAndPrefillArea();
      if (value > 0) highlightArea(area, value);
    });
  };

  const handleClick = (area: MapArea): void => {
    onHighlightArea(area);
  };

  const renderAreas = (): ReactNode =>
    areas.map((area, index) => {
      const { areaKeyName: areaKeyNameProp } = props;

      const { scaledCoords } = getExtendedArea(area, { img, ...scaleCoordsParams }, areaParams);

      if (area.disabled) return null;

      const { preFillColor, shape, href } = area;
      const currentAreaProps = (() => {
        if (Array.isArray(areaProps)) {
          if (areaKeyNameProp) {
            return areaProps.find((cur) => cur && cur[areaKeyNameProp] === area[areaKeyNameProp]);
          }
          return areaProps[index];
        }
        return areaProps;
      })();

      return (
        <area
          alt="map"
          {...currentAreaProps}
          key={area[areaKeyName] ?? index.toString()}
          coords={scaledCoords.join(',')}
          href={href ?? currentAreaProps?.href}
          onClick={click({ area, index }, { onClick, cb: handleClick })}
          onMouseDown={mouseDown({ area, index }, { onMouseDown })}
          onMouseEnter={mouseEnter({ area, index }, { onMouseEnter, cb: () => handleMouseEnter(area) })}
          onMouseLeave={mouseLeave({ area, index }, { onMouseLeave, cb: () => handleMouseLeave(area) })}
          onMouseMove={mouseMove({ area, index }, { onMouseMove })}
          onMouseUp={mouseUp({ area, index }, { onMouseUp })}
          onTouchEnd={touchEnd({ area, index }, { onTouchEnd })}
          onTouchStart={touchStart({ area, index }, { onTouchStart })}
          shape={shape ?? currentAreaProps?.shape}
          className={[
            'img-mapper-area',
            ...(preFillColor ? ['img-mapper-area-highlighted'] : []),
            ...(currentAreaProps?.className ? [currentAreaProps.className] : []),
          ].join(' ')}
        />
      );
    });

  return (
    <div
      {...containerProps}
      ref={containerRef}
      id="img-mapper"
      style={{ ...containerProps?.style, ...styles.container }}
    >
      <img
        alt="map"
        role="presentation"
        {...imgProps}
        ref={img}
        onClick={imageClick({ onImageClick })}
        onMouseMove={imageMouseMove({ onImageMouseMove })}
        src={src}
        useMap={`#${name}`}
        className={['img-mapper-img', ...(imgProps?.className ? [imgProps.className] : [])].join(
          ' ',
        )}
        style={{
          ...imgProps?.style,
          ...styles.img(responsive),
          ...(isRendered ? null : { display: 'none' }),
        }}
      />
      <canvas
        {...canvasProps}
        ref={canvas}
        style={{ ...canvasProps?.style, ...styles.canvas }}
        className={[
          'img-mapper-canvas',
          ...(canvasProps?.className ? [canvasProps.className] : []),
        ].join(' ')}
      />
      <map
        {...mapProps}
        name={name}
        style={{ ...mapProps?.style, ...styles.map(!!onClick) }}
        className={['img-mapper-map', ...(mapProps?.className ? [mapProps.className] : [])].join(
          ' ',
        )}
      >
        {isRendered && !disabled ? renderAreas() : null}
      </map>
    </div>
  );
};

export default memo(ImageMapper, (prevProps, nextProps) => {
  const propChanged = rerenderPropsList.some((prop) => prevProps[prop] !== nextProps[prop]);
  return isEqual(prevProps.areas, nextProps.areas) && !propChanged;
});
