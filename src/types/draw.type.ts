import type { Area } from '@/types';
import type { MutableRefObject } from 'react';

export type CTX<E = CanvasRenderingContext2D> = MutableRefObject<CanvasRenderingContext2D | E>;

type DrawArea = 'scaledCoords' | 'fillColor' | 'lineWidth' | 'strokeColor';

export type DrawChosenShape = (area: Pick<Area, DrawArea>, ctx: CTX) => boolean;

export type DrawShape = (area: Pick<Area, 'shape' | DrawArea>, ctx: CTX<null>) => boolean;

export type GetShape = (shape: Area['shape']) => DrawChosenShape | false;
