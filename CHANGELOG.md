# CHANGELOG
All notable changes in this project are documented in this file.

[![Dermatz on Twitter](https://img.shields.io/twitter/follow/_dermatz.svg?style=social&label=Follow%20@_dermatz)](https://twitter.com/_dermatz/)


## Latest Release

### [2.5.4](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- update node packages

### [2.5.3](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- Improved update script: `npm run woodoo-update` removes the complete core folder and prepare for a clean reinstall now
>- NPX Install Script: Fixed an missing file error during the setup process in step 2.

### [2.5.2](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- Updated `core/gulpfile.example.js`: Changed destination directory for minified Images to `project_dist` + `images`
>- Remove `core/.babelrc` and replace it with `core/babel.config.js` to ignore ES5 libraries in the `node_modules`.
>- Remove `core/.browserlistrc` - Move all Parameters to the new `gulp.config.js`.
>- Fixed Autoprefixer with new Config Settings. All SCSS Files inside monorepositories will be correct autoprefixed.
>- Updated readme.md

### [2.5.1](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- Fixed true/false condition at line 44 in the `gulpfile-example.js`. Now the BrowserSync works like expected.

### [2.5.0](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- New `gulp.config.js` file which replace the old `gulp_config.json`. Now you can add you project variables here!
>- New Support of BabelJS 7. JavaScript will be automatically compile in ES6 during concat- and minify task of your project js assets.
>- The JSHint Linter is replaced by eslint. The linter is compatible to ES6 now.
>- There are 2 new config files in the Woodoo Core Folder: `.babelrc` and `.eslintrc`.
>- The default `.sass-lint.yml` is moved back in the core folder of Woodoo-Buildtools. So we can update easierly. If you want to change the rules, just copy the file out of
the folder edit the rules. After editing just set the new path to your new `.sass-lint.yml` in the config file `gulp.config.js`.
>- __New way to Concat your JS Files!__ :
> Now you can specify you js concatination in the `gulp.config.js` file. Add all files in the `JS CONCATINATION` area.
> This is necessary for a better gulpfile update in the future. You dont need to edit the gulpfile anymore in the future.

__For Example - The new JS Concatination in the gulp.config.js:__
Compile all lib-files like this example
```
const project_js_lib_files = [
   'node_modules/jquery/jquery.js',
   'node_modules/bootstrap/bootstrap.js',
   project_js_lib + "**/*.js"
];
```

### Update to this new Version:
1. switch into the woodoo-buildtools directory
2. run `npm run woodoo-update`
3. make a backup of your `gulpfile.js` like `gulpfile.bak.js` > `mv gulpfile.js gulpfile.bak.js`
4. Get the new Gulpfile-Version. Copy the file from the core `cp ./core/gulpfile.example.js gulpfile.js`
5. Copy the concatination pathes for `lib`, `head` and `footer` from your `gulpfile.bak.js` into the new `gulp.config.js`
6. run `npm run woodoo-init` ... finish.

### [2.1.2 - 2.4.0](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
>- Woodoo Buildtools is listed now on [https://www.npmjs.com/package/woodoo-buildtools](https://www.npmjs.com/package/woodoo-buildtools) 🤩
>- complete new setup process based on `npx`
>- BrowserSync now use opened Browser-Tabs for Sync Task. You can turn this off in the `gulp_config.json`
>- New File-Structure for the Woodoo-Buildtools Core to improve the installation and update handling
>- The `sass-lint.yml` will is delivered from Woodoo-Buildtools per default. Now you can specify your own path in the `gulp_config.json`
>- Changed the behavior for Autoprefixer with the new `.browserlistrc` file to your autoprefix scss / css
>- removed installion via composer
>- removed Babel temporarily from the gulpfile (will come back in the futures)
>- removed autolog for Changelog updates

#### Getting Started with the new Setup
To install woodoo-Buildtools just open your project directory and run `npx woodoo-buildtools`
```
npx woodoo-buildtools   - install the current NPM Package of Woodoo-Buildtools automaticly

npm wodooo-init         - initialize the Woodoo-Buildtools merge with your Project Files (run this after setup)
npm woodoo-update       - runs the update task
```
#### ⚠️ Update from Version 2.1.3 or newer to this Version:
If you use Version 2.1.3 or newer, please remove `woodoo-buildtools/package-lock.json` and `woodoo-buildtools/package.json` and run `cd .. && npx woodoo-buildtoools`
to get the latest version.

### [2.1.1](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
- Known issues
	- Babel has problems with some jQuery libraries

- update dev dependencies
	Name										Old			New
	- @babel/core          7.4.4   7.4.5
	- @babel/preset-env    7.4.4   7.4.5
	- browser-sync        2.26.5  2.26.7
	- gulp-imagemin        5.0.3   5.0.3
	- gulp-shell           0.7.0   0.7.1
	- tar                  4.4.8  4.4.10

### [2.1.0](https://gitlab.com/dermatz/woodoo-buildtools/-/releases)
- add possibility to enable/disable browser-sync via `gulp_config.json`
	- browsersync > enable > true/false (boolean)
- add babel v8
	- now you can write use Next Generation JavaScript in you Assets per default
	- More Informations [https://babeljs.io/](https://babeljs.io/)
- update dev dependencies
	- `gulp`
	- `node-sass`
	- `browser-sync`

## 2.0.6
- add `tar` package to package.json for security vulnerability #803 [(see  nodesecurity report)](https://nodesecurity.io/advisories/803)
- add some missing basic task to gulpfile (requires a compare and update of your local gulpfile)
- update dev dependencies
	- `gulp`
	- `gulp-sourcemaps`
	- `gulp-autoprefixer`
	- `gulp-uglify`
	- `browser-sync`
	- `js-hint`

### How to update up to 2.0.6:
- `composer update dermatz/woodoo-buildtools`
- `cd woodoo-buildtools`
- `gulp update_json`

## 2.0.5
- update `gulp-shell` dependency to Version 0.7.0
- update variable for `browsersync_proxy_local_url` in `gulp_config.json` because .dev domains are tld now
- simple refactorings in `gulpfile.example.js`
- add new browser-sync options to `gulp_config.json` __Important: update your gulp_config.json__
- update gulpfile.js with new browser-sync options __Important: update your gulpfile.js__

#### Files DIFF needed?:
Yes, following files has been changed:
- `gulp_config.json`
- `gulpfile.js` ( diff with _gulpfile.example.js_ )

#### Vulnerabilities Found:
Regular Expression Denial of Service (ReDos) of the npm `braces` package (wait for fix from package-author)

---
## 2.0.4
- optimize error handling to prevent sass and js watcher brakes on error
---
## 2.0.3
- fixed syntax in gulp_config.json
---
## 2.0.2
- add browsersync proxy for local dev-domains
---
## 2.0.1
- Fixed setup process task
---
## 2.0.0 - Update to GULP 4.x
- completly change and refactor the gulpfile for gulp 4.x
- rearrange the task sort order and groups
- add .nvmrc for node 10.x
- add browserSync (config root and port in gulp_config.json)
---
## 1.5.3 - NPM Package updates

- `fancy-log` from __1.3.2__ to __1.3.3__
- `graceful-fs` from __4.1.11__ to __4.1.15__
- `gulp-imagemin` from __4.1.0__ to __5.0.3__
- `gulp-plumber` from __1.2.0__ to __1.2.1__
---
## 1.5.2 - NPM Package updates
- update node package `gulp-sass` to version 4.0.2
---
## 1.5.1
- update setup description in README.md and add notice for best asset-folder structure
- improved task-dependencies (_chainings_) and task-namings
- improved `gulp_config.json` folder description
- add an important css-minify compatibility setting (`restructure`) to prevent css restructuring
	I disable this feature to prevent errors during restructuring of css-code in the minified css file with a lot of lib's. Of course, you can everytime enable this setting in the `sass_minified` task.

		.pipe(minifyCSS({
            restructure: false, // enable this feature for maximum compression - check for css errors after minify!
            sourceMap: true
        }))
---
## 1.5.0
- Fixed minor gulpfile syntax error for _minify_js_ task
- Add new update process

		gulp update
		gulp update-json

	Now it is new very easy to update the Buildtools and the project-json together with a single command. Just type `gulp update` to get the newest woodoo-package and automerge all dependencies from woodoo and your project. If you only want to merge the package.jsons without an update, just type `gulp update-json`.
---
## 1.4.2
-  gulpfile.example.js
	└── fixed task `minify_js`: All js files will be correct minified now
---
## 1.4.1
- fixed error during woodoo-setup
	└── fixed js error in dev-task, gulpSequence Error in `gulpfile.example.js`
---
## 1.4.0
- Refactored gulpfile and `gulp_config.json`
	└──	For a easier project configuration. Now you can copy & paste your project
		folder structure (pathes) into the gulp_config.json to set the pathes for the gulp tasks.

- Current Woodoo-Version
	└── Now you can see the current Woodoo Version in every gulp task output

- Dependencies Outdate-Check
	├── Add npm-dependencies outdate check was added to the gulp default task.
	└── Now you get informations about outdated packages before the compiled files are checked-in in your version control.

- More than one Projects! (Work in Process)
	└── Another project-root was added in the `gulp_config.json` to implement a secend project.
---
## 1.3.0
- updated dev-dependencies
	├── gulp-autoprefixer to 6.0.0
	└── gulp-postcss to 8.0.0
---
## 1.2.2
- disabled sass-lint rule no-vendor-prefixes
	└── because in modern css it can be necessary to add "-webkit-xxxx" vendor prefixes direct in scss.
---
## 1.2.1
- dev-dependencies updates
	└── `gulp-rename`
- update .sass-lint.yml to optimize lint for BEM Class-Nestings
---
## 1.2.0
- dev-dependencies updates
---
## 1.1.0
- updated readme install description
- add update-packages task
- refactor gulpfile for better watch-task handling (now sass or js run only if necessary)
- update gulp-sass and gulp-merge-json packages
---
## 1.0.0
- Woodoo Setup with automatic project package.json merging
- Gulpfile Configuration
- Gitlab ci pipeline
- Fixed gulpfile.example for better development usability
- Fixed minor variable bugs
- Example files
