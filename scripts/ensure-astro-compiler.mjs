// Runs after `npm install`.
// Some Windows PCs (e.g. with Smart App Control on) block Astro's native compiler
// (astro.win32-x64-msvc.node). Astro can fall back to a WebAssembly build of the
// compiler, but npm won't install it on x64 machines. This script installs that
// fallback only when the native compiler cannot load. On Cloudflare/Netlify or an
// unrestricted PC it does nothing.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const PKG = '@astrojs/compiler-binding-wasm32-wasi';
const target = join(process.cwd(), 'node_modules', ...PKG.split('/'));

try {
  require('@astrojs/compiler-binding');
  process.exit(0); // native or WASI compiler already loads
} catch {
  // fall through
}

if (existsSync(target)) process.exit(0);

console.log(`[postinstall] Native Astro compiler is blocked on this machine; installing ${PKG} fallback...`);
const version = require('@astrojs/compiler-binding/package.json').optionalDependencies?.[PKG] ?? 'latest';
const tmp = mkdtempSync(join(tmpdir(), 'astro-wasi-'));
try {
  execSync(`npm pack ${PKG}@${version} --pack-destination "${tmp}"`, { stdio: 'ignore' });
  const tgz = readdirSync(tmp).find((f) => f.endsWith('.tgz'));
  mkdirSync(target, { recursive: true });
  // Prefer Windows' built-in tar: Git's GNU tar (often first on PATH) misreads "C:" as a remote host.
  const winTar = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe');
  const tar = process.platform === 'win32' && existsSync(winTar) ? `"${winTar}"` : 'tar';
  execSync(`${tar} -xzf "${join(tmp, tgz)}" --strip-components=1 -C "${target}"`, { stdio: 'inherit' });
  console.log('[postinstall] Done.');
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
