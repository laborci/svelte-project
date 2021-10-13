import Path from "path";

let cwd = process.cwd(); // frontend project root
let root = cwd; // project root

let path = {
	cwd: cwd,
	node_modules: cwd + '/node_modules',
	src: cwd + '/src',
	root: root,
	public: {
		dev: cwd + '/public',
		prod: cwd + '/public',
		fonts: cwd + '/public/fonts',
	}
};

function rollup(suffix = "", prod = false) {
	return {
		src: path.src,
		entry: path.src + '/index.ts',
		versionFile: path.cwd + '/public/version',
		out: {
			path: (prod ? path.public.prod : path.public.dev) + suffix,
			js: 'index.js',
			css: 'index.css',
		},
	}
}

let config = {
	path,
	rollup
}

export default config;
