// Stand-in for next/image in the single-file preview: a plain <img>.
import type { CSSProperties, Ref } from 'react';

type Src = string | { src: string; width?: number; height?: number };
type Props = {
  src: Src; alt: string; fill?: boolean; width?: number; height?: number; sizes?: string; priority?: boolean;
  className?: string; style?: CSSProperties; draggable?: boolean; ref?: Ref<HTMLImageElement>; [k: string]: unknown;
};

export default function Image({ src, alt, fill, width, height, sizes: _s, priority, style, ref, ...rest }: Props) {
  const url = typeof src === 'string' ? src : src.src;
  const fillStyle: CSSProperties = fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : {};
  return <img ref={ref} src={url} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding="async" style={{ ...fillStyle, ...style }} {...rest} />;
}
export type StaticImageData = { src: string; width: number; height: number };
