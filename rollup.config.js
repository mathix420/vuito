import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
};

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'cjs', // commonJS
      exports: 'auto',
      sourcemap: true,
      entryFileNames: '[name].cjs.js',
      preserveModulesRoot: 'src',
      preserveModules: true,
    },
    {
      file: 'lib/vuito.min.js',
      format: 'cjs', // commonJS
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
      entryFileNames: '[name].esm.js',
      preserveModulesRoot: 'src',
      preserveModules: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
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
  ],
  external: Object.keys(globals),
};

// Other useful plugins you might want to add are:
// rollup-plugin-terser - minify the Rollup bundle
