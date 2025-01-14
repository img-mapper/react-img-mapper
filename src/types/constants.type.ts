import type { ImageMapperProps } from '@/types/index';

type RequiredProps = 'src' | 'map';

export type ImageMapperDefaultProps = Omit<ImageMapperProps, RequiredProps>;
