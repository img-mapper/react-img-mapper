import type { ImageMapperProps } from '@/types';
import type { ImageMapperDefaultProps } from '@/types/constants.type';

export const rerenderPropsList = [
  'src',
  'areaKeyName',
  'active',
  'disabled',
  'fillColor',
  'strokeColor',
  'lineWidth',
  'imgWidth',
  'width',
  'height',
  'natural',
  'highlighted',
  'responsive',
  'parentWidth',
] as const;

const imageMapperDefaultProps: ImageMapperDefaultProps = {
  areaKeyName: 'id',
  active: true,
  disabled: false,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  lineWidth: 1,
  imgWidth: 0,
  width: 0,
  height: 0,
  natural: false,
  highlighted: null,
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
  Object.entries(imageMapperDefaultProps).reduce(
    (acc, val) => {
      const [key, value] = val as [keyof T, typeof val];

      // @ts-expect-error acc key error
      acc[key] = props[key] ?? value;
      return acc;
    },
    { src: props.src, map: props.map, onChange: props.onChange }
  ) as Required<T>;
