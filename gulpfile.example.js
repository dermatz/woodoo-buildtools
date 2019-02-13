/**
 * Read for further information https://gulpjs.com
 */

'use strict';

// BUILDTOOL CONFIG
const vars = require('./gulp_config.json');
const packageinfo = require(vars.buildtools.path + 'package.json');
const woodoo_hint = '';
const externalPath = ['node_modules'];

// Node Dependencies via NPM
const {src, dest, parallel, series} = require('gulp');
const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
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
const uglify = require('gulp-uglify');
const browsersync = require("browser-sync").create();

/**
 * Shell Messages
 */

log('👍 You are using Woodoo-Buildtools ' + packageinfo.version);

// BROWSER SYNC ==================================================================================================================

function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: vars.dev.browsersync_basedir
        },
        port: vars.dev.browsersync_port
    });
    done();
}

function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// SCSS WITH MINIFY ==============================================================================================================

function scss() {
    return src(vars.project.path_scss + '**/*.s+(a|c)ss')
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end')
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-neat').with(externalPath)
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS({
            restructure: false, // enable this feature for maximum compression - check for css errors after minify!
            sourceMap: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(vars.project.path_dist + 'css'))
        .pipe(browsersync.stream());
}

// SASS LINT =====================================================================================================================

function scsslint() {
    return src([
            '!' + vars.project.path_scss + 'plugins/**/*.s+(a|c)ss',
            vars.project.path_scss + '**/*.s+(a|c)ss'
        ]
    )
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end')
            }
        }))
        .pipe(sassLint({
            configFile: vars.buildtools.path + '.sass-lint.yml'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
}

// JS CONCAT =====================================================================================================================
// Libruary JS

function concat_lib_js() {
    return src(
        [
            vars.project.path_lib_js + '**/*.js'
        ]
    )
        .pipe(plumber())
        .pipe(concat('lib.min.js'))
        .pipe(dest(vars.project.path_dist + 'js'));
}

// Head JS

function concat_head_js() {
    return src(
        [
            vars.project.path_head_js + '**/*.js'
        ]
    )
        .pipe(plumber())
        .pipe(concat('head.min.js'))
        .pipe(dest(vars.project.path_dist + 'js'));
}

// Footer JS

function concat_footer_js() {
    return src(
        [
            vars.project.path_footer_js + '**/*.js'
        ]
    )
        .pipe(plumber())
        .pipe(concat('footer.min.js'))
        .pipe(dest(vars.project.path_dist + 'js'));
}

// JS MINIFY =====================================================================================================================

function minify_js() {
    return src(vars.project.path_dist + 'js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(dest(vars.project.path_dist + 'js'));
}

// JS LINT =======================================================================================================================

function jslint() {
    return src([
        '!' + vars.project.path_lib_js + '**/*.js',
        vars.project.path_js + '**/*.js'
    ])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
}

// IMAGEMIN ======================================================================================================================

function image_minify() {
    return src(
        vars.project.path_images + '**/*'
    )
        .pipe(newer(vars.project.path_dist + 'images'))
        .pipe(
            imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(dest(vars.project.path_dist + 'images'))
}

// WATCH TASK ====================================================================================================================

function watchFiles() {
    gulp.watch(
        vars.project.path_scss + '**/*.s+(a|c)ss', series(scss, scsslint)
    );
    gulp.watch(
        vars.project.path_js + '**/*.js', series(concat_lib_js, concat_head_js, concat_footer_js, jslint, browserSyncReload)
    );
    gulp.watch(
        vars.project.path_dist + 'images' + '/**/*', series(image_minify, browserSyncReload)
    );
}

// Tasks =========================================================================================================================

const js = series(
    concat_lib_js,
    concat_head_js,
    concat_footer_js,
    minify_js
);

const lints = parallel(
    scsslint,
    jslint
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
    lints
);

const watch = parallel(
    watchFiles,
    browserSync
);


// Woodoo Buildtool specific tasks ===============================================================================================

function merge_json() {
    log('From Woodoo-Buildtools: ' + vars.buildtools.path + 'package.json');
    log('From Theme Path: ' + vars.project.path + 'package.json');
    return src([
        vars.buildtools.path + 'package.json',
        vars.project.path + 'package.json'
    ])
        .pipe(merge({
            fileName: 'package.json'
        }))
        .pipe(dest('./'));
}

function npm_dependencies_check() {
    return src('*.js', {read: false})
        .pipe(shell([
                'npm outdated',
            ], {ignoreErrors: true}
        ))
}

function npm_install() {
    return src('*.js', {read: false})
        .pipe(shell([
                'npm install',
            ], {ignoreErrors: true}
        ))
}

// export / register tasks =======================================================================================================

exports.npm_install = npm_install;
exports.update_json = update_json;
exports.image_minify = image_minify;
exports.scss = scss;
exports.merge_json = merge_json;
exports.npm_dependencies_check = npm_dependencies_check;
exports.js = js;
exports.build = build;
exports.lints = lints;
exports.watch = watch;
exports.default = build;
