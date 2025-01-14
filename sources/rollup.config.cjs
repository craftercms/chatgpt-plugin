// const babel = require('@rollup/plugin-babel');
// const typescript = require('rollup-plugin-typescript2');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const replaceImportsWithVars = require('rollup-plugin-replace-imports-with-vars');
const json = require('@rollup/plugin-json');
// const pkg = require('./package.json');
const copy = require('rollup-plugin-copy');
// const { terser } = require('rollup-plugin-terser');
const replace = require('@rollup/plugin-replace');
const { parseSync } = require('env-file-parser');

const envFile = parseSync('.env');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// const craftercmsLibs = 'craftercms.libs?';
const globals = {
  react: 'craftercms.libs.React',
  rxjs: 'craftercms.libs.rxjs',
  'rxjs/operators': 'craftercms.libs.rxjs',
  // jsx runtime part of Studio's runtime starting 4.1.2
  'react/jsx-runtime': 'craftercms.libs?.reactJsxRuntime',
  '@emotion/css/create-instance': 'craftercms.libs.createEmotion',
  'react-dom': 'craftercms.libs.ReactDOM',
  'react-intl': 'craftercms.libs.ReactIntl',
  'react-redux': 'craftercms.libs.ReactRedux',
  '@mui/material': 'craftercms.libs.MaterialUI',
  '@mui/material/styles': 'craftercms.libs.MaterialUI',
  '@craftercms/studio-ui': 'craftercms.components',
  '@craftercms/studio-ui/components': 'craftercms.components',
  '@mui/material/utils': 'craftercms.libs.MaterialUI',
  '@reduxjs/toolkit': 'craftercms.libs.ReduxToolkit'
};

const replacementRegExps = {
  '@craftercms/studio-ui/(components|icons|utils|services)/(.+)': (exec) =>
    `craftercms.${exec[1]}.${exec[2].split('/').pop()}`,
  '@mui/material/(.+)': (exec) => `craftercms.libs.MaterialUI.${exec[1]}`,
  '@mui/icons-material/(.+(Rounded|Outlined))$': (exec) => `craftercms.utils.constants.components.get('${exec[0]}')`
};

const basePluginDir = '../authoring/static-assets/plugins/org/craftercms/openai';
const publicDir = './public';

module.exports = [
  {
    context: 'this',
    input: './src/craftercms_openai.tsx',
    output: [
      {
        file: `${publicDir}/craftercms_openai.js`,
        format: 'iife',
        globals
      }
    ],
    external: Object.keys(globals).filter(key => !key.includes('rxjs')).concat(Object.keys(replacementRegExps).map((str) => new RegExp(str))),
    plugins: [
      json(),
      replace({
        preventAssignment: true,
        'import.meta.env.MODE': JSON.stringify('production'),
        'import.meta.env.VITE_OPENAI_API_KEY': `"${envFile.VITE_OPENAI_API_KEY}"`
      }),
      // babel({ babelHelpers: 'bundled', extensions }),
      typescript({ tsconfig: './tsconfig.json', compilerOptions: { noEmit: false } }),
      // typescript({
      //   tsconfigOverride: { compilerOptions: { declaration: false, noEmit: false, emitDeclarationOnly: false } }
      // }),
      replaceImportsWithVars({
        replacementLookup: globals,
        replacementRegExps
      }),
      // !!: If used, terser should be after `replaceImportsWithVars`
      // terser(),
      resolve({ extensions }),
      commonjs(),
      copy({
        hook: 'closeBundle',
        targets: [
          {
            src: './public/*.js',
            dest: `${basePluginDir}/tinymce`
          }
        ]
      })
    ]
  },
  !process.env.tinymce && {
    context: 'this',
    input: 'index.tsx',
    output: [
      {
        file: `${basePluginDir}/components/index.js`,
        format: 'es',
        globals
      }
    ],
    external: Object.keys(globals).concat(Object.keys(replacementRegExps).map((str) => new RegExp(str))),
    plugins: [
      json(),
      replace({
        preventAssignment: true,
        'import.meta.env.MODE': JSON.stringify('production'),
        'import.meta.env.VITE_OPENAI_API_KEY': `"${envFile.VITE_OPENAI_API_KEY}"`
      }),
      // babel({ babelHelpers: 'bundled', extensions }),
      typescript({ tsconfig: './tsconfig.json', compilerOptions: { noEmit: false } }),
      // typescript({
      //   tsconfigOverride: { compilerOptions: { declaration: false, noEmit: false, emitDeclarationOnly: false } }
      // }),
      replaceImportsWithVars({
        replacementLookup: globals,
        replacementRegExps
      }),
      // !!: If used, terser should be after `replaceImportsWithVars`
      // terser(),
      resolve({ extensions }),
      commonjs(),
      copy({
        hook: 'closeBundle',
        targets: [
          {
            src: './public/*.js',
            dest: `${basePluginDir}/tinymce`
          }
        ]
      })
    ]
  }
].filter(Boolean);
