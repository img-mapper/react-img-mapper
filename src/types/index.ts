import type { ConditionalKeys, NoUndefinedField } from '@/types/lib.type';
import type { MouseEvent, TouchEvent as ReactTouchEvent } from 'react';

export interface Refs {
  containerRef: HTMLDivElement | null;
  imgRef: HTMLImageElement | null;
  canvasRef: HTMLCanvasElement | null;
}

export interface RefProperties {
  getRefs: () => Refs;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OverrideMapArea {}

export interface MapArea extends OverrideMapArea {
  id: string;
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

type RequiredMapArea = 'active' | 'fillColor' | 'lineWidth' | 'strokeColor';
type RequiredArea<T extends MapArea = MapArea, R extends keyof T = RequiredMapArea> = Omit<T, R> &
  Pick<NoUndefinedField<T>, R>;

export interface Area extends RequiredArea {
  scaledCoords: number[];
  center: [number, number];
}

export interface HighlightedOptions {
  isMulti?: boolean;
  toggle?: boolean;
}

export type Highlighted = HighlightedOptions | null;

export interface WidthHeight {
  width: number;
  height: number;
}

export type Dimension = number | ((event: HTMLImageElement) => number);

export type TouchEvent = ReactTouchEvent<HTMLAreaElement>;
export type AreaEvent = MouseEvent<HTMLAreaElement>;
export type ImageEvent = MouseEvent<HTMLImageElement>;

export type ChangeEventHandler = (selectedArea: MapArea, areas: MapArea[]) => void;
export type ImageEventHandler = ((event: ImageEvent) => void) | null;
export type EventHandler<T = AreaEvent, A = MapArea> =
  | ((area: A, index: number, e: T) => void)
  | null;
export type LoadEventHandler = ((event: HTMLImageElement, dimensions: WidthHeight) => void) | null;

export interface ImageMapperProps {
  src: string;
  map: Map;
  areaKeyName?: ConditionalKeys<MapArea, string>;
  active?: boolean;
  disabled?: boolean;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  imgWidth?: number;
  width?: Dimension;
  height?: Dimension;
  natural?: boolean;
  highlighted: Highlighted;
  responsive?: boolean;
  parentWidth?: number;

  onChange: ChangeEventHandler;
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
