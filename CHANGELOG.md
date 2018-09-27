## Latest Release

#### 1.4.2 Hotfix
	-  gulpfile.example.js
		└── fixed task minify_js: All js files will be correct minified now

#### 1.4.1 Hotfix
    - fixed error during woodoo-setup
    	└── fixed js error in dev-task, gulpSequence Error in "gulpfile.example.js"

#### 1.4.0
    - Refactored gulpfile and `gulp_config.json`
		└──	For a easier project configuration. Now you can copy & paste your project 
			folder structure (pathes) into the gulp_config.json to set the pathes for the gulp tasks.
    
    - Current Woodoo-Version 
		└── Now you can see the current Woodoo Version in every gulp task output
    
    - Dependencies Outdate-Check
		├── Add npm-dependencies outdate check was added to the gulp default task. 
		└── Now you get informations about outdated packages before the compiled files are checked-in in your version control.
  
    - More than one Projects! (Work in Process)
		└── Another project-root was added in the gulp_config.json to implement a secend project. 

#### 1.3.0
	- updated dev-dependencies
		├── gulp-autoprefixer to 6.0.0
		└── gulp-postcss to 8.0.0

#### 1.2.2 Hotfix
	- disabled sass-lint rule no-vendor-prefixes
		└── because in modern css it can be necessary to add "-webkit-xxxx" vendor prefixes direct in scss.
	
#### 1.2.1 Hotfix
	- dev-dependencies updates
		└── gulp-rename
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
