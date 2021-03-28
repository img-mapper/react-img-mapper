import React from 'react';

export const rerenderPropsList = [
  'src',
  'active',
  'width',
  'height',
  'imgWidth',
  'fillColor',
  'strokeColor',
  'lineWidth',
  'natural',
  'areaKeyName',
  'stayHighlighted',
  'stayMultiHighlighted',
  'toggleHighlighted',
  'parentWidth',
  'responsive',
] as const;

export interface Container extends HTMLDivElement {
  clearHighlightedArea: () => void;
}

export interface MapAreas {
  id?: string;
  coords: [];
  active: boolean;
  href: string;
  shape: string;
  fillColor: string;
  strokeColor: string;
  lineWidth: number;
  preFillColor: string;
}

export interface Map {
  name: string;
  areas: Array<MapAreas>;
}

export interface CustomArea extends MapAreas {
  scaledCoords: number[];
  center?: [number, number];
}

export type AreaEvent = React.MouseEvent<HTMLAreaElement, MouseEvent>;
export type ImageEvent = React.MouseEvent<HTMLImageElement, MouseEvent>;

export interface ImageMapperProps {
  src: string;
  map?: Map;
  areaKeyName?: 'id';
  containerRef?: { current: HTMLDivElement } | null;
  active?: boolean;
  fillColor?: string;
  strokeColor?: string;
  lineWidth?: number;
  imgWidth?: number;
  width?: number | ((e: React.MouseEvent<HTMLImageElement>) => void);
  height?: number | ((e: React.MouseEvent<HTMLImageElement>) => void);
  natural?: boolean;
  stayHighlighted?: boolean;
  stayMultiHighlighted?: boolean;
  toggleHighlighted?: boolean;
  rerenderProps?: Array<keyof ImageMapperProps>;
  responsive?: boolean;
  parentWidth?: number;

  onImageClick?: ((e: ImageEvent) => void) | null;
  onImageMouseMove?: ((e: ImageEvent) => void) | null;
  onClick?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseMove?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseEnter?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onMouseLeave?: ((area: CustomArea, index: number, e: AreaEvent) => void) | null;
  onLoad?: ((e: HTMLImageElement, dimensions: { width: number; height: number }) => void) | null;
}

export const ImageMapperDefaultProps: Partial<ImageMapperProps> = {
  map: {
    areas: [],
    name: `image-map-${Math.random()}`,
  },
  areaKeyName: 'id',
  containerRef: null,
  active: true,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
  imgWidth: 0,
  width: 0,
  height: 0,
  natural: false,
  stayHighlighted: false,
  stayMultiHighlighted: false,
  toggleHighlighted: false,
  rerenderProps: [],
  responsive: false,
  parentWidth: 0,

  onImageClick: null,
  onImageMouseMove: null,
  onClick: null,
  onMouseMove: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onLoad: null,
};
