import type { rerenderPropsList } from '@/constants';
import type { NoUndefinedField } from '@/types/lib.type';
import type { MouseEvent, MutableRefObject, TouchEvent as ReactTouchEvent } from 'react';

export interface Refs {
  containerRef: HTMLDivElement | null;
  imgRef: HTMLImageElement | null;
  canvasRef: HTMLCanvasElement | null;
  ctxRef: CTX<null>['current'];
}

export interface RefProperties {
  clearHighlightedArea: () => void;
  getRefs: () => Omit<Refs, 'ctxRef'>;
}

export interface MapArea {
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

type RequiredMapArea = 'active' | 'fillColor' | 'lineWidth' | 'strokeColor';
type RequiredArea<T, R extends keyof T> = Omit<T, R> & Pick<NoUndefinedField<T>, R>;

export interface Map {
  name: string;
  areas: MapArea[];
}

export interface Area extends RequiredArea<MapArea, RequiredMapArea> {
  scaledCoords: number[];
  center: [number, number];
}

export type CTX<E = CanvasRenderingContext2D> = MutableRefObject<CanvasRenderingContext2D | E>;

export interface HighlightedOptions {
  isMulti?: boolean;
  toggle?: boolean;
}

export type Highlighted = HighlightedOptions | null;

export interface WidthHeight {
  width: number;
  height: number;
}

export type TouchEvent = ReactTouchEvent<HTMLAreaElement>;
export type AreaEvent = MouseEvent<HTMLAreaElement>;
export type ImageEvent = MouseEvent<HTMLImageElement>;

export type Dimension = number | ((event: HTMLImageElement) => number);
export type RerenderProps = (keyof Omit<
  ImageMapperProps,
  'rerenderProps' | (typeof rerenderPropsList)[number]
>)[];

export type ImageEventHandler = ((event: ImageEvent) => void) | null;
export type EventHandler<T = AreaEvent, A = MapArea> =
  | ((area: A, index: number, e: T) => void)
  | null;
export type LoadEventHandler = ((event: HTMLImageElement, dimensions: WidthHeight) => void) | null;
export type ChangeEventHandler = (selectedArea: MapArea, areas: MapArea[]) => void;

export interface ImageMapperProps {
  src: string;
  map: Map;
  areaKeyName?: 'id';
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
  rerenderProps?: RerenderProps;
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
