import path from 'path';

import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import stylelintPlugin from 'vite-plugin-stylelint';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@fonts': path.resolve(__dirname, './src/assets/fonts'),
            '@store': path.resolve(__dirname, './src/store'),
            '@services': path.resolve(__dirname, './src/services'),
            '@types': path.resolve(__dirname, './src/types'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@components': path.resolve(__dirname, './src/components/ui'),
            '@pages': path.resolve(__dirname, './src/components/pages'),
            '@layouts': path.resolve(__dirname, './src/components/layouts'),
            '@utils': path.resolve(__dirname, './src/utils')
        }
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
            manifest: {
                name: 'НАЗВАНИЕ',
                short_name: 'КОРОТКОЕ_НАЗВАНИЕ',
                description: 'ОПИСАНИЕ',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                background_color: '#ffffff',
                display: 'standalone'
            }
        }),
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
});
