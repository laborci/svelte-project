import fs from "fs";

export default function verbump(filename) {
	return {
		writeBundle() {
			let version = fs.existsSync(filename) ? parseInt(fs.readFileSync(filename)) + 1 : 1;
			fs.writeFileSync(filename, version.toString());
			console.log("Build number: " + version + ' (' + filename + ')');
		}
	}
}
