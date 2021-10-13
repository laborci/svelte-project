import copydir from "copy-dir";
import fs from "fs";
import config from "./config.js";

let packages = JSON.parse(fs.readFileSync(config.path.cwd + '/package.json'));

fs.mkdirSync(config.path.public.fonts, {recursive: true});

console.log("looking for '@fortawesome/fontawesome-pro' in packages.json");
if (typeof packages.dependencies['@fortawesome/fontawesome-pro'] !== 'undefined') {
	console.log('copy fontawesome pro to assets');
	copydir.sync(config.path.node_modules + "/@fortawesome/fontawesome-pro/webfonts", config.path.public.fonts + "/fontawesome-pro")
}

console.log("looking for '@fortawesome/fontawesome-free' in packages.json");
if (typeof packages.dependencies['@fortawesome/fontawesome-free'] !== 'undefined') {
	console.log('copy fontawesome free to assets');
	copydir.sync(config.path.node_modules + "/@fortawesome/fontawesome-free/webfonts", config.path.public.fonts + "/fontawesome-free")
}

console.log("looking for '@fontsource/*' in packages.json");
for (let pkg in packages.dependencies) if (pkg.startsWith('@fontsource/')) {
	let name = pkg.substr('@fontsource/'.length);
	console.log('copy ' + name + " to assets");
	copydir.sync(config.path.node_modules + '/@fontsource/' + name + '/files', config.path.public.fonts + "/" + name);
}
