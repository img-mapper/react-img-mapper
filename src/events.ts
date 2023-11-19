import type { EventListener, ImageEventListener, TouchEvent } from '@/types';

export const imageMouseMove: ImageEventListener<'onImageMouseMove'> = (event, props) => {
  const { onImageMouseMove } = props;

  if (onImageMouseMove) onImageMouseMove(event);
};

export const imageClick: ImageEventListener<'onImageClick'> = (event, props) => {
  const { onImageClick } = props;

  if (onImageClick) {
    event.preventDefault();
    onImageClick(event);
  }
};

export const mouseMove: EventListener<'onMouseMove'> = ({ area, index, event }, props) => {
  const { onMouseMove } = props;

  if (onMouseMove) onMouseMove(area, index, event);
};

export const mouseDown: EventListener<'onMouseDown'> = ({ area, index, event }, props) => {
  const { onMouseDown } = props;

  if (onMouseDown) onMouseDown(area, index, event);
};

export const mouseUp: EventListener<'onMouseUp'> = ({ area, index, event }, props) => {
  const { onMouseUp } = props;

  if (onMouseUp) onMouseUp(area, index, event);
};

export const touchStart: EventListener<'onTouchStart', TouchEvent> = (
  { area, index, event },
  props
) => {
  const { onTouchStart } = props;

  if (onTouchStart) onTouchStart(area, index, event);
};

export const touchEnd: EventListener<'onTouchEnd', TouchEvent> = (
  { area, index, event },
  props
) => {
  const { onTouchEnd } = props;

  if (onTouchEnd) onTouchEnd(area, index, event);
};
