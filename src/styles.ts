import React from 'react';
import { ImageMapperProps } from './types';

const absPos: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
};

const imgNonResponsive: React.CSSProperties = {
  ...absPos,
  zIndex: 1,
  userSelect: 'none',
};

const imgResponsive: React.CSSProperties = {
  ...imgNonResponsive,
  width: '100%',
  height: 'auto',
};

interface StylesProps {
  container: React.CSSProperties;
  canvas: React.CSSProperties;
  img: React.CSSProperties;
  map: React.CSSProperties | undefined;
}

const styles = (props?: Partial<ImageMapperProps>): StylesProps => ({
  container: {
    position: 'relative',
  },
  canvas: {
    ...absPos,
    pointerEvents: 'none',
    zIndex: 2,
  },
  img: props?.responsive ? imgResponsive : imgNonResponsive,
  map:
    (props?.onClick && {
      cursor: 'pointer',
    }) ||
    undefined,
});

export default styles;
