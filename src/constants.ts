import type { ImageMapperProps } from '@/types';

export const rerenderPropsList = [
  'src',
  'active',
  'disabled',
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

export const ImageMapperDefaultProps: Omit<ImageMapperProps, 'src' | 'map'> = {
  areaKeyName: 'id',
  containerRef: null,
  active: true,
  disabled: false,
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
  onMouseDown: null,
  onMouseUp: null,
  onTouchStart: null,
  onTouchEnd: null,
  onMouseMove: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onLoad: null,
};

export const generateProps = <T extends ImageMapperProps>(props: T): Required<T> =>
  Object.entries(ImageMapperDefaultProps).reduce(
    (acc, val) => {
      const [key, value] = val as [keyof T, typeof val];

      // @ts-expect-error acc key error
      acc[key] = props[key] ?? value;
      return acc;
    },
    { src: props.src, map: props.map }
  ) as Required<T>;
