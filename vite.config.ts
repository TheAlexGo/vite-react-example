import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@fonts': path.resolve(__dirname, './src/assets/fonts')
        }
    },
    plugins: [
        legacy({
            targets: [
                'defaults',
                'not IE 11'
            ]
        }),
        react({
            exclude: /\.stories\.(t|j)sx?$/,
            include: '**/*.tsx'
        }),
        svgr({}),
        eslintPlugin()
    ],
    css: {
        preprocessorOptions: {
            styl: {
                imports: [
                    path.resolve(__dirname, 'src/styles/common.styl')
                ],
            },
        },
    },
})
