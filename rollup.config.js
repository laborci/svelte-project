import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from "rollup-plugin-typescript2";
import css from 'rollup-plugin-css-only';
import json from "@rollup/plugin-json";
import styles from 'rollup-plugin-styles';
import verbump from "./build/verbump";
import config from "./build/config";

const production = !process.env.ROLLUP_WATCH;
let rollup = config.rollup('/dist', production);

export default {
	input: rollup.entry,
	output: {
		file: rollup.out.path + '/' + rollup.out.js,
		sourcemap: true,
		format: 'iife',
		name: 'app',
	},
	plugins: [
		styles({mode: 'emit', url: false}),
		typescript({check: false}),
		alias({entries: {
			'src': rollup.src
		}}),
		json(),
		svelte({
			extensions: [".svelte"],
			emitCss: true,
			preprocess: sveltePreprocess({sourceMap: !production}),
			compilerOptions: {
				dev: !production,
				cssHash: ({hash, css, name, filename}) => 'Q' + hash(css)
			}
		}),
		css({output: rollup.out.css}),
		resolve({
			extensions: ['.mjs', '.js', '.json', '.node', ".ts"],
			module: true, // <-- this library is not an ES6 module
			browser: true, // <-- suppress node-specific features
		}),
		commonjs(),
		verbump(rollup.versionFile),
		production && terser()
	]
}
