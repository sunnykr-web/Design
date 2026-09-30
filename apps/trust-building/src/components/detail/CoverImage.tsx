'use client';

import { useState, type CSSProperties } from 'react';
import type { Immersion } from '@/lib/data/immersions';

/* The Luma cover is remote, so a plain <img>; next/image would need the host in remotePatterns. */
/* eslint-disable @next/next/no-img-element */

/** Luma event cover that falls back to a bundled image if the remote one can't load. */
export function CoverImage({ u, className, style, lazy }: { u: Immersion; className?: string; style?: CSSProperties; lazy?: boolean }) {
  const [failed, setFailed] = useState(false);
  // A static import is an object in Next.js and a plain URL in the single-page preview build.
  const fallback = typeof u.fallback === 'string' ? (u.fallback as string) : u.fallback.src;
  return (
    <img
      src={failed ? fallback : u.img}
      alt={u.alt}
      loading={lazy ? 'lazy' : undefined}
      onError={() => setFailed(true)}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
