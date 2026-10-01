// Builds a single self-contained preview page (inline JS + CSS, images alongside) into preview/.
// The Next.js runtime needs a real server path layout; this bundles the same components with light shims instead.
import { build } from 'esbuild';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../preview');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

await build({
  entryPoints: [resolve(here, 'main.tsx')],
  bundle: true,
  minifySyntax: true,
  minifyWhitespace: true,
  format: 'iife',
  jsx: 'automatic',
  outdir: out,
  entryNames: 'bundle',
  assetNames: 'assets/[name]-[hash]',
  publicPath: './',
  loader: { '.png': 'file', '.jpg': 'file', '.svg': 'file', '.webp': 'file' },
  alias: {
    'next/image': resolve(here, 'shims/image.tsx'),
    'next/link': resolve(here, 'shims/link.tsx'),
    'next/navigation': resolve(here, 'shims/navigation.ts'),
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  tsconfig: resolve(here, '../tsconfig.json'),
  logLevel: 'warning',
});

const js = readFileSync(resolve(out, 'bundle.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
const css = readFileSync(resolve(out, 'bundle.css'), 'utf8');
rmSync(resolve(out, 'bundle.js'));
rmSync(resolve(out, 'bundle.css'));

writeFileSync(resolve(out, 'index.html'), `<title>Trust Building V6</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap">
<style>
:root { --font-serif: 'Instrument Serif'; --font-sans: 'DM Sans'; color-scheme: dark; }
html, body { background: #0E0C0B; }
${css}
</style>
<div id="app"></div>
<script>${js}</script>
`);
console.log('preview built');
