import path from 'path';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@fonts': path.resolve(__dirname, './src/assets/fonts')
        }
    },
    plugins: [
        legacy(),
        react({
            exclude: /\.stories\.(t|j)sx?$/,
            include: '**/*.tsx'
        }),
        svgrPlugin(),
        eslintPlugin(),
        stylelintPlugin({
            fix: true
        })
    ],
    css: {
      postcss: {
        plugins: [autoprefixer({})]
      }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    /**
                     * Разбиваем используемые модули из node_modules на чанки, а не складируем в одном index-файле
                     * */
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                    return null;
                }
            }
        },
        minify: 'esbuild'
    },
    server: {
        host: true
    }
})
