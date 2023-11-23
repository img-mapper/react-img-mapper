import type { Area, CTX } from '@/types';

type DrawArea = 'scaledCoords' | 'fillColor' | 'lineWidth' | 'strokeColor';

export type DrawChosenShape = (area: Pick<Area, DrawArea>, ctx: CTX) => boolean;

export type DrawShape = (area: Pick<Area, 'shape' | DrawArea>, ctx: CTX<null>) => boolean;

export type GetShape = (shape: Area['shape']) => DrawChosenShape | false;
