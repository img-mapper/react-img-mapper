import type { ImageMapperProps } from '@/types';
import type { CSSProperties } from 'react';

export interface StylesProps {
  container: CSSProperties;
  canvas: CSSProperties;
  img: (responsive: ImageMapperProps['responsive']) => CSSProperties;
  map: (onClick: ImageMapperProps['onClick']) => CSSProperties | undefined;
}
