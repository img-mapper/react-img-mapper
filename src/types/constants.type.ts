import type { ImageMapperProps } from '@/types/index';

type RequiredProps = 'src' | 'map' | 'onChange';

export type ImageMapperDefaultProps = Omit<ImageMapperProps, RequiredProps>;
