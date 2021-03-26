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
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: true,
    },
    {
      file: packageJson.main.replace(/cjs.js$/, 'min.js'),
      format: 'cjs', // commonJS
      plugins: [terser()], // minified
      sourcemap: true,
    },
    {
      file: packageJson.main.replace(/cjs.js$/, 'umd.js'),
      format: 'umd', // Universal Module Definition
      plugins: [terser()], // minified
      name: 'vuito',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: true,
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
