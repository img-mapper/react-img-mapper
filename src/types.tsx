import React from 'react';

export const rerenderPropsList: string[] = [
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
];

export interface Container extends HTMLDivElement {
  clearHighlightedArea: () => void;
}

export interface MapAreas {
  coords: [];
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

interface CustomArea extends MapAreas {
  scaledCords: number[];
  center: [number, number];
}

type MyEvent = React.BaseSyntheticEvent<HTMLImageElement, HTMLImageElement, HTMLImageElement>;

export interface ImageMapperProps {
  src: string;
  map?: Map;
  areaKeyName?: string;
  containerRef?: { current: HTMLDivElement | null };
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

  onImageClick?: (e: MyEvent) => void;
  onImageMouseMove?: (e: MyEvent) => void;
  onClick?: (area: CustomArea, index: number, e: MyEvent) => void;
  onMouseMove?: (area: CustomArea, index: number, e: MyEvent) => void;
  onMouseEnter?: (area: CustomArea, index: number, e: MyEvent) => void;
  onMouseLeave?: (area: CustomArea, index: number, e: MyEvent) => void;
  onLoad?: (e: HTMLImageElement, dimensions: { width: number; height: number }) => void;
}

export const ImageMapperDefaultProps = {
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
