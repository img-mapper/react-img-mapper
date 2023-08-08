import type { Area, AreaEvent, ImageEvent, ImageMapperProps, TouchEvent } from '@/types';

export const imageMouseMove = (
  event: ImageEvent,
  { onImageMouseMove }: Pick<ImageMapperProps, 'onImageMouseMove'>
): void => {
  if (onImageMouseMove) onImageMouseMove(event);
};

export const imageClick = (
  event: ImageEvent,
  { onImageClick }: Pick<ImageMapperProps, 'onImageClick'>
): void => {
  if (onImageClick) {
    event.preventDefault();
    onImageClick(event);
  }
};

export const mouseMove = (
  area: Area,
  index: number,
  event: AreaEvent,
  { onMouseMove }: Pick<ImageMapperProps, 'onMouseMove'>
): void => {
  if (onMouseMove) onMouseMove(area, index, event);
};

export const mouseDown = (
  area: Area,
  index: number,
  event: AreaEvent,
  { onMouseDown }: Pick<ImageMapperProps, 'onMouseDown'>
): void => {
  if (onMouseDown) onMouseDown(area, index, event);
};

export const mouseUp = (
  area: Area,
  index: number,
  event: AreaEvent,
  { onMouseUp }: Pick<ImageMapperProps, 'onMouseUp'>
): void => {
  if (onMouseUp) onMouseUp(area, index, event);
};

export const touchStart = (
  area: Area,
  index: number,
  event: TouchEvent,
  { onTouchStart }: Pick<ImageMapperProps, 'onTouchStart'>
): void => {
  if (onTouchStart) onTouchStart(area, index, event);
};

export const touchEnd = (
  area: Area,
  index: number,
  event: TouchEvent,
  { onTouchEnd }: Pick<ImageMapperProps, 'onTouchEnd'>
): void => {
  if (onTouchEnd) onTouchEnd(area, index, event);
};
