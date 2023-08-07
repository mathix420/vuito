import renameNodeModules from 'rollup-plugin-rename-node-modules';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';
import terser from '@rollup/plugin-terser';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function extractChunks(id) {
  if (id.includes('tslib')) return 'template';
  if (id.includes('/validators/')) return 'validators/' + path.parse(id).name;
  return path.parse(id).name;
}

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/vuito.ts',
  output: [
    {
      dir: 'lib',
      format: 'cjs', // commonJS
      exports: 'auto',
      sourcemap: true,
      esModule: false,
      preserveModulesRoot: 'src',
      manualChunks: extractChunks,
      entryFileNames: '[name].cjs.js',
      chunkFileNames: '[name].cjs.js',
    },
    {
      file: 'lib/vuito.min.js',
      format: 'cjs', // commonJS
      esModule: false,
      plugins: [terser()], // minified
      sourcemap: true,
    },
    {
      file: 'lib/vuito.umd.js',
      name: 'vuito',
      format: 'umd', // Universal Module Definition
      plugins: [terser()], // minified
      sourcemap: true,
    },
    {
      dir: 'lib',
      format: 'esm', // ES Modules
      sourcemap: true,
      preserveModulesRoot: 'src',
      manualChunks: extractChunks,
      entryFileNames: '[name].esm.js',
      chunkFileNames: '[name].esm.js',
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs({
      exclude: 'node_modules',
      ignoreGlobal: true,
    }),
    cleanup({
      comments: 'none',
    }),
    renameNodeModules('ext'),
  ],
  external: Object.keys(globals),
};

// Other useful plugins you might want to add are:
// rollup-plugin-terser - minify the Rollup bundle
