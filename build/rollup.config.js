import Path from "path";

import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import styles from 'rollup-plugin-styles';
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import {terser} from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import fontCopy from "./plugins/font-copy";
import BuildNumber from "./plugins/build-number";

const production = !process.env.ROLLUP_WATCH;
const cwd = process.cwd();

export default {
	input: Path.resolve(cwd, "src/index.ts"),
	output: {
		file: Path.resolve(cwd, "public/index.js"),
		sourcemap: !production,
		format: "iife"
	},
	plugins: [
		styles({mode: 'emit', url: false}),
		typescript({check: false}),
		alias({entries: {}}),
		json(),
		svelte({
			extensions: [".svelte"],
			emitCss: true,
			preprocess: sveltePreprocess({sourceMap: !production}),
			compilerOptions: {
				dev: !production,
				cssHash: ({hash, css, name, filename}) => '_' + hash(css)
			}
		}),
		css({output: "index.css"}),
		resolve({extensions: ['.mjs', '.js', '.json', '.node', ".ts", ".svelte"], browser: true}),
		commonjs(),
		copy({
			targets: [
				{src: Path.resolve(cwd, "src/index.html"), dest: Path.resolve(cwd, "public")}
			]
		}),
		//replace({}),
		BuildNumber.init(),
		BuildNumber.inject(Path.resolve(cwd, "public/index.html")),
		BuildNumber.write(Path.resolve(cwd, "public/version"), null),
		BuildNumber.touch(Path.resolve(cwd, "public/build"), null),
		production && fontCopy(Path.resolve(cwd, "public/fonts")),
		production && terser()
	]
}

