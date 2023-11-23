import type {
  GetDimension,
  GetDimensionValues,
  GetDimensions,
  GetPropDimension,
} from '@/types/dimensions.type';

const getDimension: GetDimension = (dimension, img) => {
  if (!img.current) return 0;

  return typeof dimension === 'function' ? dimension(img.current) : dimension;
};

export const getPropDimension: GetPropDimension = ({ width, height, img }) => ({
  width: getDimension(width, img),
  height: getDimension(height, img),
});

const getDimensionValues: GetDimensionValues = (
  type,
  { width, height, img, responsive, parentWidth, natural }
) => {
  const { width: imageWidth, height: imageHeight } = getPropDimension({ width, height, img });

  if (img.current) {
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img.current;

    if (type === 'width') {
      if (responsive) return parentWidth;
      if (natural) return naturalWidth;
      if (imageWidth) return imageWidth;
      return clientWidth;
    }

    if (type === 'height') {
      if (responsive) return clientHeight;
      if (natural) return naturalHeight;
      if (imageHeight) return imageHeight;
      return clientHeight;
    }
  }

  return 0;
};

export const getDimensions: GetDimensions = props => ({
  width: getDimensionValues('width', props),
  height: getDimensionValues('height', props),
});
