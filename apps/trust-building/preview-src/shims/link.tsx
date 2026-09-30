// Stand-in for next/link: routes inside the single-page preview via the URL hash.
import type { AnchorHTMLAttributes, ReactNode, Ref } from 'react';
import { navigate, toHash } from '../router';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode; ref?: Ref<HTMLAnchorElement> };

export default function Link({ href, onClick, ...rest }: Props) {
  return (
    <a
      href={toHash(href)}
      onClick={e => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
