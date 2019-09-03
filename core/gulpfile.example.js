/**
 * Read for further information https://gulpjs.com
 */

'use strict';

// const vars = require('./gulp_config.json');
const wb = require( './gulp.config.js' ); // WOODOO BUILDTOOLS CONFIG

const packageinfo = require(wb.woodoo_core + 'package.json');
const externalPath = ['node_modules'];  // path to Node-Modules

// Node Dependencies via NPM
const {src, dest, parallel, series} = require('gulp');
const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const log = require('fancy-log');
const plumber = require('gulp-plumber');
const minifyCSS = require('gulp-csso');
const merge = require('gulp-merge-json');
const neat = require('node-neat');
const newer = require('gulp-newer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const shell = require('gulp-shell');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require("browser-sync").create();
const browserSyncReuseTab = require('browser-sync-reuse-tab')(browsersync);
const babel = require("gulp-babel");
const terser = require('gulp-terser');
const eslint = require('gulp-eslint');

/**
 * Output of the current Woodoo Version in the shell
 */
log('👍 You are using Woodoo-Buildtools ' + packageinfo.version);
// BROWSER SYNC ==================================================================================================================

function browserSync(done) {
    if(wb.browsersync_support === true) {
        browsersync.init({
            proxy: {
                target: wb.browsersync_proxyUrl
            },
            port: wb.browsersync_port,
            ui: {
                port: wb.browsersync_portUI
            },
            https: wb.browsersync_https,
            notify: wb.browsersync_notify,
            ghostMode: wb.browsersync_ghostmode,
            open: wb.browsersync_new_tab
        }, browserSyncReuseTab);
    } else {
        log('Browsersync is disabled in gulp.config.js');
    }
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// SCSS, SCSS-LINT, MINIFY =======================================================================================================

// Path to .sass-lint (default is woodoo-buildtools/core/.sass-lint.yml)
// change the path in the gulp.config.js (project > path_sass_lint) if you want a new location with your own sass-lint.yml

function scss() {

    return src(wb.project_scss + '**/*.s+(a|c)ss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-neat').with(externalPath)
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer(wb.browserslist))
        .pipe(minifyCSS({
            restructure: false, // enable this feature for maximum compression - check for css errors after minify!
            sourceMap: true // enable Source Maps for css files
        }))
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(wb.project_dist + 'css'))
        .pipe(browsersync.stream());
}

// SASS LINT =====================================================================================================================

function scsslint() {
    log('Using ' + wb.sasslint); // Shows the current loaded Sass-Lint path the shell-output
    return src([
            wb.project_scss + '**/*.s+(a|c)ss',
            '!' + wb.project_scss + 'path/to/ignore/**/',  // Add a path to ignore files
        ]
    )
        .pipe(sassLint({
            configFile: wb.sasslint
        }))
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
}

// JS CONCAT =====================================================================================================================

// Libruary JS

function concat_lib_js() {
    return src(wb.concat_JS_lib)
        .pipe(sourcemaps.init())
        .pipe(eslint({ configFile: wb.eslint }))
        .pipe(eslint.format())
        .pipe(
            babel({
                configFile: wb.babelconfigFile,
                presets: [
                    [
                        '@babel/preset-env', {
                            targets: { browsers: wb.browserslist },
                        }
                    ]
                ]
            })
        )
        .pipe(concat('lib.js'))
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(plumber())
        .pipe(dest(wb.project_dist + 'js'));
}

// Head JS

function concat_head_js() {

    return src(wb.concat_JS_head)
        .pipe(sourcemaps.init())
        .pipe(eslint({ configFile: wb.eslint }))
        .pipe(eslint.format())
        .pipe(
            babel({
                configFile: wb.babelconfigFile,
                presets: [
                    [
                        '@babel/preset-env', {
                            targets: { browsers: wb.browserslist },
                        }
                    ]
                ]
            })
        )
        .pipe(concat('head.js'))
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(plumber())
        .pipe(dest(wb.project_dist + 'js'));
}

// Footer JS

function concat_footer_js() {
    return src(wb.concat_JS_footer)
        .pipe(sourcemaps.init())
        .pipe(eslint({ configFile: wb.eslint }))
        .pipe(eslint.format())
        .pipe(
            babel({
                configFile: wb.babelconfigFile,
                presets: [
                    [
                        '@babel/preset-env', {
                            targets: { browsers: wb.browserslist },
                        }
                    ]
                ]
            })
        )
        .pipe(concat('footer.js'))
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(plumber())
        .pipe(dest(wb.project_dist + 'js'));
}

// IMAGEMIN ======================================================================================================================

function image_minify() {
    return src(
        wb.project_images + '**/*'
    )
        .pipe(newer(wb.project_images))
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: wb.imagemin_interlaced}),
                imagemin.jpegtran({progressive: wb.imagemin_progressive}),
                imagemin.optipng({optimizationLevel: wb.imagemin_optimization_level}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: wb.imagemin_removeviewbox,
                            collapseGroups: wb.imagemin_collapsegroups
                        }
                    ]
                })
            ])
        )
        .pipe(dest(wb.project_dist + 'images'));
}

// WATCH TASK ====================================================================================================================

function watchFiles() {
    gulp.watch(
        wb.project_scss + '**/*.s+(a|c)ss', series(
            scss,
            scsslint
        )
    );
    gulp.watch(
        wb.project_js + '**/*.js', series(
            concat_lib_js,
            concat_head_js,
            concat_footer_js,
            browserSyncReload
        )
    );
    gulp.watch(
        wb.project_images + '**/*', series(
            image_minify,
            browserSyncReload
        )
    );
}

// Tasks =========================================================================================================================

const js = series(
    concat_lib_js,
    concat_head_js,
    concat_footer_js
);

const update_json = series(
    npm_dependencies_check,
    merge_json,
    npm_install
);

const build = series(
    npm_dependencies_check,
    scss,
    js,
    image_minify,
    scsslint
);

const watch = parallel(
    watchFiles,
    browserSync
);


// Woodoo Buildtool specific tasks ===============================================================================================

function merge_json() {
    log('From Woodoo-Buildtools: ' + wb.woodoo_core + 'package.json');
    log('From Theme Path: ' + wb.project_path + 'package.json');
    return src([
        wb.woodoo_core + 'package.json',
        wb.project_path + 'package.json'
    ])
        .pipe(merge({
            fileName: 'package.json'
        }))
        .pipe(dest('./'));
}

function npm_dependencies_check() {
    if(wb.dependency_check) {
        return src('*.js', {read: false})
            .pipe(shell([
                    'npm outdated',
                ], {ignoreErrors: true}
            ));
    } else {
        log('NPM Dependency check was disabled in gulp.config.js');
        return src('.');
    }
}

function npm_install() {
    return src('*.js', {read: false})
        .pipe(shell([
                'npm install',
            ], {ignoreErrors: true}
        ));
}

// export / register tasks =======================================================================================================
exports.npm_install = npm_install;
exports.merge_json = merge_json;
exports.npm_dependencies_check = npm_dependencies_check;
exports.syscheck = npm_dependencies_check;
exports.scss = scss;
exports.image_minify = image_minify;

exports.update_json = update_json;
exports.update = update_json;
exports.build = build;
exports.js = js;
exports.watch = watch;
exports.default = build;

