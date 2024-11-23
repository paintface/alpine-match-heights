import terser from '@rollup/plugin-terser';

export default {
    input: 'src/plugin.js',
    output: {
        file: 'dist/alpine-match-heights.min.js',
        format: 'iife',
        name: 'matchHeights'
    },
    plugins: [terser()]
};