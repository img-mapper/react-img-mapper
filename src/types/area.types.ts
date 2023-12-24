import type { Area, ImageMapperProps, MapArea } from '@/types';
import type { GetPropDimensionParams } from '@/types/dimensions.type';

type ScaleCoordsParams = GetPropDimensionParams &
  Pick<Required<ImageMapperProps>, 'responsive' | 'parentWidth' | 'imgWidth'>;

export type ScaleCoords = (
  coords: MapArea['coords'],
  scaleCoordsParams: ScaleCoordsParams
) => number[];

export type ComputeCenter = (
  shape: MapArea['shape'],
  scaleCoordsParams: ReturnType<ScaleCoords>
) => Area['center'];

type GetExtendedAreaParams = Pick<
  Required<ImageMapperProps>,
  'fillColor' | 'lineWidth' | 'strokeColor'
>;

export type GetExtendedArea = (
  area: MapArea,
  scaleCoordsParams: ScaleCoordsParams,
  params: GetExtendedAreaParams
) => Area;
