import type { StylesProps } from '@/types';
import type { CSSProperties } from 'react';

const absPos: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
};

const imgNonResponsive: CSSProperties = {
  ...absPos,
  zIndex: 1,
  userSelect: 'none',
};

const imgResponsive: CSSProperties = {
  ...imgNonResponsive,
  width: '100%',
  height: 'auto',
};

const styles: StylesProps = {
  container: {
    position: 'relative',
  },
  canvas: {
    ...absPos,
    pointerEvents: 'none',
    zIndex: 2,
  },
  img: responsive => (responsive ? imgResponsive : imgNonResponsive),
  map: onClick => (onClick ? { cursor: 'pointer' } : undefined),
};

export default styles;
