import type { CSSProperties, MouseEvent, TouchEvent as ReactTouchEvent } from 'react';

export interface Container extends HTMLDivElement {
  clearHighlightedArea: () => void;
}

export interface MapArea {
  id?: string;
  shape: string;
  coords: number[];
  active?: boolean;
  disabled?: boolean;
  href?: string;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  preFillColor?: string;
}

export interface Map {
  name: string;
  areas: MapArea[];
}

export interface Area extends MapArea {
  scaledCoords: number[];
  center?: [number, number];
}

export type CTX = { current: CanvasRenderingContext2D } | null;
export type TouchEvent = ReactTouchEvent<HTMLAreaElement>;
export type AreaEvent = MouseEvent<HTMLAreaElement>;
export type ImageEvent = MouseEvent<HTMLImageElement>;

export type Dimension = number | ((event: HTMLImageElement) => number);

export type ImageEventHandler = ((event: ImageEvent) => void) | null;
export type EventHandler<T = AreaEvent> = ((area: Area, index: number, e: T) => void) | null;
export type LoadEventHandler =
  | ((event: HTMLImageElement, dimensions: { width: number; height: number }) => void)
  | null;

export interface ImageMapperProps {
  src: string;
  map: Map;
  areaKeyName?: 'id';
  containerRef?: { current: HTMLDivElement } | null;
  active?: boolean;
  disabled?: boolean;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  imgWidth?: number;
  width?: Dimension;
  height?: Dimension;
  natural?: boolean;
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: (keyof ImageMapperProps)[];
  responsive?: boolean;
  parentWidth?: number;

  onImageClick?: ImageEventHandler;
  onImageMouseMove?: ImageEventHandler;
  onClick?: EventHandler;
  onMouseDown?: EventHandler;
  onMouseUp?: EventHandler;
  onTouchStart?: EventHandler<TouchEvent>;
  onTouchEnd?: EventHandler<TouchEvent>;
  onMouseMove?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  onLoad?: LoadEventHandler;
}

export interface StylesProps {
  container: CSSProperties;
  canvas: CSSProperties;
  img: (responsive: ImageMapperProps['responsive']) => CSSProperties;
  map: (onClick: ImageMapperProps['onClick']) => CSSProperties | undefined;
}
