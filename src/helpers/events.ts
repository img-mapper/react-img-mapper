import type { TouchEvent } from '@/types';
import type { EventListener, ImageEventListener } from '@/types/events.type';

export const imageMouseMove: ImageEventListener<'onImageMouseMove'> = props => event => {
  const { onImageMouseMove } = props;

  if (onImageMouseMove) onImageMouseMove(event);
};

export const imageClick: ImageEventListener<'onImageClick'> = props => event => {
  const { onImageClick } = props;

  if (onImageClick) {
    event.preventDefault();
    onImageClick(event);
  }
};

export const mouseEnter: EventListener<'onMouseEnter'> =
  ({ area, index }, props) =>
  event => {
    const { onMouseEnter, cb } = props;

    if (cb) cb(area);

    if (onMouseEnter) onMouseEnter(area, index, event);
  };

export const mouseLeave: EventListener<'onMouseLeave'> =
  ({ area, index }, props) =>
  event => {
    const { onMouseLeave, cb } = props;

    if (cb) cb(area);

    if (onMouseLeave) onMouseLeave(area, index, event);
  };

export const click: EventListener<'onClick'> =
  ({ area, index }, props) =>
  event => {
    const { onClick, cb } = props;

    if (cb) cb(area);

    if (onClick) {
      event.preventDefault();
      onClick(area, index, event);
    }
  };

export const mouseMove: EventListener<'onMouseMove'> =
  ({ area, index }, props) =>
  event => {
    const { onMouseMove } = props;

    if (onMouseMove) onMouseMove(area, index, event);
  };

export const mouseDown: EventListener<'onMouseDown'> =
  ({ area, index }, props) =>
  event => {
    const { onMouseDown } = props;

    if (onMouseDown) onMouseDown(area, index, event);
  };

export const mouseUp: EventListener<'onMouseUp'> =
  ({ area, index }, props) =>
  event => {
    const { onMouseUp } = props;

    if (onMouseUp) onMouseUp(area, index, event);
  };

export const touchStart: EventListener<'onTouchStart', TouchEvent> =
  ({ area, index }, props) =>
  event => {
    const { onTouchStart } = props;

    if (onTouchStart) onTouchStart(area, index, event);
  };

export const touchEnd: EventListener<'onTouchEnd', TouchEvent> =
  ({ area, index }, props) =>
  event => {
    const { onTouchEnd } = props;

    if (onTouchEnd) onTouchEnd(area, index, event);
  };
