import type { AreaEvent, ImageEvent, ImageMapperProps, MapArea } from '@/types';

export interface EventListenerParam {
  area: MapArea;
  index: number;
}

export type EventListenerProps<T extends keyof ImageMapperProps> = Pick<ImageMapperProps, T> & {
  cb?: (area: MapArea) => void;
};

export type EventListener<T extends keyof ImageMapperProps, E = AreaEvent> = (
  params: EventListenerParam,
  props: EventListenerProps<T>
) => (event: E) => void;

export type ImageEventListener<T extends keyof ImageMapperProps> = (
  props: EventListenerProps<T>
) => (event: ImageEvent) => void;
