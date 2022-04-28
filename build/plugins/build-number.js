import fs from "fs";
import Path from "path";

export default class BuildNumber {

	static init() {
		return {
			writeBundle: () => {
				this.buildnumber = Math.ceil(Date.now() / 1000).toString()
			}
		}
	}

	static bump(packageJson = null, key = "build-number") {
		packageJson = packageJson === null ? Path.resolve(process.cwd(), 'package.json') : packageJson;
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(packageJson).toString());
				packages[key] = this.buildnumber;
				fs.writeFileSync(packageJson, JSON.stringify(packages, null, "\t"));
			}
		}
	}

	static inject(file, pattern = /__BUILD_NUMBER__/g, replace = (version) => version.toString()) {
		return {
			writeBundle: () => {
				console.log("inject build number (" + this.buildnumber + ") in file: " + file);
				let content = fs.readFileSync(file).toString();
				content = content.replaceAll(pattern, replace(this.buildnumber));
				fs.writeFileSync(file, content);
			}
		}
	}

	static write(file) {
		return {
			writeBundle: () => {
				console.log("writing build number (" + this.buildnumber + ") into file: " + file);
				fs.writeFileSync(file, this.buildnumber);
			}
		}
	}

	static touch(file) {
		return {
			writeBundle: () => {
				const time = new Date();
				try {
					fs.utimesSync(file, time, time);
				} catch (err) {
					fs.closeSync(fs.openSync(file, 'w'));
				}
			}
		}
	}
}