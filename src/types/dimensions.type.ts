import type { Dimension, ImageMapperProps, Refs, WidthHeight } from '@/types';
import type { MutableRefObject } from 'react';

type ImgRef = MutableRefObject<Refs['imgRef']>;

export type GetDimension = (dimension: Dimension, img: ImgRef) => number;

export interface GetPropDimensionParams {
  width: Dimension;
  height: Dimension;
  img: ImgRef;
}

export type GetPropDimension = (params: GetPropDimensionParams) => WidthHeight;

type GetDimensionValuesParams = GetPropDimensionParams &
  Pick<Required<ImageMapperProps>, 'responsive' | 'parentWidth' | 'natural'>;

export type GetDimensionValues = (
  type: 'width' | 'height',
  params: GetDimensionValuesParams
) => number;

type GetDimensionsParams = Omit<GetDimensionValuesParams, 'type'>;

export type GetDimensions = (params: GetDimensionsParams) => WidthHeight;
