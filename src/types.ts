import type { rerenderPropsList } from '@/constants';
import type {
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  TouchEvent as ReactTouchEvent,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };

export interface RefExtraProperties {
  clearHighlightedArea: () => void;
}

export type RefProperties = RefExtraProperties & HTMLDivElement;

export interface MapArea {
  id: string;
  shape: 'rect' | 'circle' | 'poly';
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

export interface Map {
  name: string;
  areas: MapArea[];
}

export interface Area
  extends Omit<MapArea, RequiredMapArea>,
    Pick<NoUndefinedField<MapArea>, RequiredMapArea> {
  scaledCoords: number[];
  center: [number, number];
}

type DrawArea = 'scaledCoords' | 'fillColor' | 'lineWidth' | 'strokeColor';
export type DrawChosenShape = (area: Pick<Area, DrawArea>, ctx: CTX) => boolean;
export type DrawShape = (area: Pick<Area, 'shape' | DrawArea>, ctx: CTX<null>) => boolean;
export type GetShape = (shape: Area['shape']) => DrawChosenShape | false;

export interface WidthHeight {
  width: number;
  height: number;
}

export type CTX<E = CanvasRenderingContext2D> = MutableRefObject<CanvasRenderingContext2D | E>;

export type TouchEvent = ReactTouchEvent<HTMLAreaElement>;
export type AreaEvent = MouseEvent<HTMLAreaElement>;
export type ImageEvent = MouseEvent<HTMLImageElement>;

export type Dimension = number | ((event: HTMLImageElement) => number);
export type RerenderProps = (keyof Omit<
  ImageMapperProps,
  'rerenderProps' | (typeof rerenderPropsList)[number]
>)[];

export type ImageEventHandler = ((event: ImageEvent) => void) | null;
export type EventHandler<T = AreaEvent> = ((area: Area, index: number, e: T) => void) | null;
export type LoadEventHandler = ((event: HTMLImageElement, dimensions: WidthHeight) => void) | null;

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
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: RerenderProps;
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
