import copyDir from "copy-dir";
import fs from "fs";
import Path from "path"

export default function fontCopy(target, root = null) {
	return {
		writeBundle() {
			root = root === null ? process.cwd() : root;
			const packages = JSON.parse(fs.readFileSync(Path.resolve(root, 'package.json')).toString());

			if (typeof packages["dependencies"] === "undefined") return;

			fs.mkdirSync(target, {recursive: true});

			console.log("looking for '@fortawesome/fontawesome-pro' in packages.json");
			if (typeof packages.dependencies['@fortawesome/fontawesome-pro'] !== 'undefined') {
				console.log('copy fontawesome pro to assets');
				copyDir.sync(
					Path.resolve(root, "node_modules/@fortawesome/fontawesome-pro/webfonts"),
					Path.resolve(target, "fontawesome-pro")
				)
			}

			console.log("looking for '@fortawesome/fontawesome-free' in packages.json");
			if (typeof packages.dependencies['@fortawesome/fontawesome-free'] !== 'undefined') {
				console.log('copy fontawesome free to assets');
				copyDir.sync(
					Path.resolve(root, "node_modules/@fortawesome/fontawesome-free/webfonts"),
					Path.resolve(target, "fontawesome-free")
				)
			}

			console.log("looking for '@fontsource/*' in packages.json");
			for (let pkg in packages.dependencies) if (pkg.startsWith('@fontsource/')) {
				let name = pkg.substring('@fontsource/'.length);
				console.log('copy ' + name + " to assets");
				copyDir.sync(
					Path.resolve(root, "node_modules/@fontsource", name, 'files'),
					Path.resolve(target, name)
				);
			}
		}
	}
}

