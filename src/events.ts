import { ImageMapperProps, CustomArea, AreaEvent, TouchEvent, ImageEvent } from './types';

export const imageMouseMove = (event: ImageEvent, props: ImageMapperProps): void => {
  if (props.onImageMouseMove) props.onImageMouseMove(event);
};

export const imageClick = (event: ImageEvent, props: ImageMapperProps): void => {
  if (props.onImageClick) {
    event.preventDefault();
    props.onImageClick(event);
  }
};

export const mouseMove = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.onMouseMove) props.onMouseMove(area, index, event);
};

export const mouseDown = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.onMouseDown) props.onMouseDown(area, index, event);
};

export const mouseUp = (
  area: CustomArea,
  index: number,
  event: AreaEvent,
  props: ImageMapperProps
): void => {
  if (props.onMouseUp) props.onMouseUp(area, index, event);
};

export const touchStart = (
  area: CustomArea,
  index: number,
  event: TouchEvent,
  props: ImageMapperProps
): void => {
  if (props.onTouchStart) props.onTouchStart(area, index, event);
};

export const touchEnd = (
  area: CustomArea,
  index: number,
  event: TouchEvent,
  props: ImageMapperProps
): void => {
  if (props.onTouchEnd) props.onTouchEnd(area, index, event);
};
