# Svelte skeleton with Rollup

`npm run build`
- builds production files
- copies the font files
- increases the build version number

`npm run dev`
- builds dev files
- increases the build version number

# Custom Rollup plugins

## font-copy

Copies font files from node_modules to elsewhere. Fonts must be in the `dependencies` in the `package.json` file.
It will copy [fontawesome free/pro](https://fontawesome.com) fonts and all [@fontsource](https://fontsource.org) fonts installed.

```js
fontCopy(target, root = null)
```

> - `target` - target directory
> - `root` - where the `node_modules` folder can be found. Default: current working directory

### Import fontawesome fonts

```scss
$fontDirectory: "fonts/";

@import "@fortawesome/fontawesome-free/scss/variables";
$fa-font-path: $fontDirectory + "fontawesome-free";
@import "@fortawesome/fontawesome-free/scss/brands";
@import "@fortawesome/fontawesome-free/scss/solid";
@import "@fortawesome/fontawesome-free/scss/fontawesome";
```

### Import fontsource fonts

```scss
@use "@fontsource/baloo-da-2/scss/mixins" as BalooDa2;

@include BalooDa2.fontFace($fontDir: $fontDirectory + "baloo-da-2", $weight: 400);
@include BalooDa2.fontFace($fontDir: $fontDirectory + "baloo-da-2", $weight: 800);
```

## build-number

Can write a build number (based on the current timestamp) into several places.

### bump

```js
BuildNumber.bump(packageJson = null, key = "build-number")
```
Updates the build number value in the package json file

> - `packageJson` - the file to be updated. Default: `cwd + package.json`
> - `key` - the key to be updated

### inject

```js
BuildNumber.inject(file, pattern = /__BUILD_NUMBER__/g, replace = (version) => version.toString())
```
Injects to the build number into a file

> - `file` - to be modified
> - `pattern` - regex pattern to replace
> - `replace` - the replace function

### write

```js
BuildNumber.write(file)
```
Writes the build number into a file

> - `file` - to be written

### touch

```js
BuildNumber.touch(file)
```
Touches a file

> - `file` - to be touched