## Latest Release

#### 1.5.3 - NPM Package updates

- `fancy-log` from __1.3.2__ to __1.3.3__  
- `graceful-fs` from __4.1.11__ to __4.1.15__  
- `gulp-imagemin` from __4.1.0__ to __5.0.3__  
- `gulp-plumber` from __1.2.0__ to __1.2.1__  

#### 1.5.2 - NPM Package updates
- update node package `gulp-sass` to version 4.0.2

#### 1.5.1
- update setup description in README.md and add notice for best asset-folder structure
- improved task-dependencies (_chainings_) and task-namings
- improved `gulp_config.json` folder description
- add an important css-minify compatibility setting (`restructure`) to prevent css restructuring
	I disable this feature to prevent errors during restructuring of css-code in the minified css file with a lot of lib's. Of course, you can everytime enable this setting in the `sass_minified` task.

		.pipe(minifyCSS({
            restructure: false, // enable this feature for maximum compression - check for css errors after minify!
            sourceMap: true
        })) 

## 1.5.0
- Fixed minor gulpfile syntax error for _minify_js_ task
- Add new update process
		
		gulp update
		gulp update-json
	
	Now it is new very easy to update the Buildtools and the project-json together with a single command. Just type `gulp update` to get the newest woodoo-package and automerge all dependencies from woodoo and your project. If you only want to merge the package.jsons without an update, just type `gulp update-json`.  
 

		
#### 1.4.2
-  gulpfile.example.js
	└── fixed task `minify_js`: All js files will be correct minified now

#### 1.4.1
- fixed error during woodoo-setup
	└── fixed js error in dev-task, gulpSequence Error in `gulpfile.example.js`

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

## 1.3.0
- updated dev-dependencies
	├── gulp-autoprefixer to 6.0.0
	└── gulp-postcss to 8.0.0

#### 1.2.2
- disabled sass-lint rule no-vendor-prefixes
	└── because in modern css it can be necessary to add "-webkit-xxxx" vendor prefixes direct in scss.

#### 1.2.1
- dev-dependencies updates
	└── `gulp-rename`
- update .sass-lint.yml to optimize lint for BEM Class-Nestings

## 1.2.0
- dev-dependencies updates

## 1.1.0
- updated readme install description
- add update-packages task
- refactor gulpfile for better watch-task handling (now sass or js run only if necessary)
- update gulp-sass and gulp-merge-json packages

## 1.0.0
- Woodoo Setup with automatic project package.json merging
- Gulpfile Configuration
- Gitlab ci pipeline
- Fixed gulpfile.example for better development usability
- Fixed minor variable bugs
- Example files
