import type { AreaEvent, ImageEvent, ImageMapperProps, MapArea } from '@/types';

export interface EventListenerParam<E> {
  area: MapArea;
  index: number;
  event: E;
}

export type EventListener<T extends keyof ImageMapperProps, E = AreaEvent> = (
  params: EventListenerParam<E>,
  props: Pick<ImageMapperProps, T>
) => void;

export type ImageEventListener<T extends keyof ImageMapperProps> = (
  event: ImageEvent,
  props: Pick<ImageMapperProps, T>
) => void;
