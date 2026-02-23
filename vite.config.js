import path from 'node:path';
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react-swc';

const SRC_DIR = path.resolve(__dirname, 'src');
const SRC_ALIAS_DIRS = [
  'actions',
  'components',
  'core',
  'documentation',
  'fonts',
  'images',
  'pages',
  'reducers',
  'styles',
];

function createSourceAliases() {
  const aliases = [{ find: 'config', replacement: path.resolve(SRC_DIR, 'config.js') }];

  for (const dir of SRC_ALIAS_DIRS) {
    aliases.push(
      { find: dir, replacement: path.resolve(SRC_DIR, dir) },
      { find: new RegExp(`^${dir}/(.*)$`), replacement: `${path.resolve(SRC_DIR, dir)}/$1` },
    );
  }

  return aliases;
}

function transformJsAsJsx() {
  return {
    name: 'transform-js-as-jsx',
    async transform(code, id) {
      if (!/\/src\/.*\.js$/.test(id)) {
        return null;
      }

      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const publicUrl = env.PUBLIC_URL || './';
  const backendFlag = env.VITE_BACKEND || '';

  return {
    base: './',
    build: {
      outDir: 'build',
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.js$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div', 'if-function', 'abs-percent'],
        },
      },
    },
    server: {
      port: 3000,
    },
    plugins: [
      transformJsAsJsx(),
      react({
        include: /\.[jt]sx?$/,
      }),
    ],
    resolve: {
      alias: [
        { find: /^~(.*)$/, replacement: '$1' },
        { find: 'reactstrap', replacement: path.resolve(SRC_DIR, 'lib/reactstrap/index.js') },
        ...createSourceAliases(),
      ],
    },
    define: {
      __APP_ENV__: JSON.stringify({
        NODE_ENV: mode,
        PUBLIC_URL: publicUrl,
        VITE_BACKEND: backendFlag,
      }),
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
      'process.env.REACT_APP_BACKEND': JSON.stringify(backendFlag),
    },
    test: {
      environment: 'jsdom',
    },
  };
});
