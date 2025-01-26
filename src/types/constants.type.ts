import type { ImageMapperProps } from '@/types/index';

type RequiredProps = 'src' | 'name' | 'areas';

export type ImageMapperDefaultProps = Omit<ImageMapperProps, RequiredProps>;
