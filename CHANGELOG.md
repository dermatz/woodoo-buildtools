#### Planned Features in one of the next releases
- Ruby Compass Support - [Gulp-Compass](https://www.npmjs.com/package/gulp-compass)
- node version manager for specific node version during build process
- build differend themes with differend settings / packages

## Latest Release
#### 1.3.0
	- updated dev-dependencies
		- gulp-autoprefixer to 6.0.0
		- gulp-postcss to 8.0.0

#### 1.2.2
	- disabled sass-lint rule 'no-vendor-prefixes' because in modern css it can be necessary to add `-webkit-xxxx` vendor prefixes direct in scss.
	
#### 1.2.1
	- dev-dependencies updates
		- gulp-rename
	- update .sass-lint.yml to optimize lint for BEM Class-Nestings

#### 1.2.0
	- dev-dependencies updates

#### 1.1.0
	- updated readme install description
	- add update-packages task
	- refactor gulpfile for better watch-task handling (now sass or js run only if necessary)
	- update gulp-sass and gulp-merge-json packages

#### 1.0.0
	- Woodoo Setup with automatic project package.json merging
	- Gulpfile Configuration
	- Gitlab ci pipeline
	- Fixed gulpfile.example for better development usability
	- Fixed minor variable bugs
	- Example files
