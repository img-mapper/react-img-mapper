import type { ConditionalKeys, NoUndefinedField } from '@/types/lib.type';
import type { HTMLProps, MouseEvent, TouchEvent as ReactTouchEvent, Ref } from 'react';

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

type RequiredMapArea = 'active' | 'fillColor' | 'lineWidth' | 'strokeColor';
type RequiredArea<T extends MapArea = MapArea, R extends keyof T = RequiredMapArea> = Omit<T, R> &
  Pick<NoUndefinedField<T>, R>;

export interface Area extends RequiredArea {
  scaledCoords: number[];
  center: [number, number];
}

export interface WidthHeight {
  width: number;
  height: number;
}

export type Dimension = number | ((event: HTMLImageElement) => number);

export type ContainerProps = Omit<HTMLProps<HTMLDivElement>, 'ref' | 'id'> | null;
export type ImgProps = Omit<
  HTMLProps<HTMLImageElement>,
  'ref' | 'src' | 'useMap' | 'onClick' | 'onMouseMove'
> | null;
export type CanvasProps = Omit<HTMLProps<HTMLCanvasElement>, 'ref'> | null;
export type MapProps = Omit<HTMLProps<HTMLMapElement>, 'name'> | null;
export type AreaProps = Omit<
  HTMLProps<HTMLAreaElement>,
  | 'key'
  | 'coords'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onMouseDown'
  | 'onMouseUp'
  | 'onTouchStart'
  | 'onTouchEnd'
  | 'onClick'
> | null;

export type TouchEvent = ReactTouchEvent<HTMLAreaElement>;
export type AreaEvent = MouseEvent<HTMLAreaElement>;
export type ImageEvent = MouseEvent<HTMLImageElement>;

export type ChangeEventHandler = ((selectedArea: MapArea, areas: MapArea[]) => void) | null;
export type ImageEventHandler = ((event: ImageEvent) => void) | null;
export type EventHandler<T = AreaEvent> = ((area: MapArea, index: number, e: T) => void) | null;
export type LoadEventHandler = ((event: HTMLImageElement, dimensions: WidthHeight) => void) | null;

export interface ImageMapperProps {
  src: string;
  name: string;
  areas: MapArea[];
  areaKeyName?: ConditionalKeys<MapArea, string>;
  isMulti?: boolean;
  toggle?: boolean;
  active?: boolean;
  disabled?: boolean;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  imgWidth?: number;
  width?: Dimension;
  height?: Dimension;
  natural?: boolean;
  responsive?: boolean;
  parentWidth?: number;
  containerProps?: ContainerProps;
  imgProps?: ImgProps;
  canvasProps?: CanvasProps;
  mapProps?: MapProps;
  areaProps?: AreaProps;

  onChange?: ChangeEventHandler;
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

export interface ImageMapperPropsWithRef extends ImageMapperProps {
  ref: Ref<RefProperties>;
}
