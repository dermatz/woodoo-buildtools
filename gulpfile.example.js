'use strict';

// Extern Config Files =========================================================

var timestamp           = Date.now(),
    vars                = require('./gulp_config.json'),
    externalPath        = ['node_modules'], // Include external pathes to get access via scss @import (like node_modules, bower, ..)

// GULP MODULES=================================================================

    gulp                = require('gulp'),
    log                 = require('fancy-log'),
    plumber             = require('gulp-plumber'),
    sass                = require('gulp-sass'),
    sassLint            = require('gulp-sass-lint'),
    minifyCSS           = require('gulp-csso'),
    postcss             = require('gulp-postcss'),
    autoprefixer        = require('gulp-autoprefixer'),
    sourcemaps          = require('gulp-sourcemaps'),
    gutil               = require('gulp-util'),
    jshint              = require('gulp-jshint'),
    merge               = require('gulp-merge-json'),
    shell               = require('gulp-shell'),
    neat                = require('node-neat'),
    concat              = require('gulp-concat'),
    rename              = require('gulp-rename'),
    gulpSequence        = require('gulp-sequence'),
    uglify              = require('gulp-uglify'),
    spritesmith         = require('gulp.spritesmith'),
    imagemin            = require('gulp-imagemin'),
    newer               = require('gulp-newer'),
    compass             = require('gulp-compass');

log('You are blessed! 🚀 You are using the Woodoo-Buildtool');

// VARIABLE REWRITES ===========================================================
// bin/gulp_config.json

var buildtools_core = vars.buildtools.buildtools_core,

    path            = vars.project.path,
    src             = vars.project.src,
    dist            = vars.project.dist,
    css             = vars.project.css,
    scss            = vars.project.scss,
    js              = vars.project.js,
    head_js         = vars.project.head_js,
    footer_js       = vars.project.footer_js,
    lib_js          = vars.project.lib_js,
    images          = vars.project.images,
    sprites_map     = vars.project.sprites_dist,
    sprites_png     = vars.project.sprites_png_src,
    sprites_svg     = vars.project.sprites_svg_src;

// SASS ========================================================================

    gulp.task('sass', function () {
    return gulp.src(path + src + scss + '**/*.s+(a|c)ss')
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
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path + dist + css));
    });

    gulp.task('sass_minified', function () {
        return gulp.src(path + src + scss + '**/*.s+(a|c)ss')
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
                sourceMap: true
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(path + dist + css));
    });

// SASS LINT ===================================================================

    gulp.task('sasslint', function () {
    return gulp.src([
                '!' + path + src + scss + 'plugins/**/*.s+(a|c)ss',
                path + src + scss + '**/*.s+(a|c)ss'
            ]
        )
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end')
            }
        }))
            .pipe(sassLint({
                configFile: buildtools_core +'.sass-lint.yml'
            }))
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError())
    });

// RUBY COMPASS ================================================================
// https://www.npmjs.com/package/gulp-compass

    gulp.task('compass', function() {
        gulp.src(path + src + scss + '**/*.s+(a|c)ss')
            .pipe(plumber({
                errorHandler: function (error) {
                    log(error.message);
                    this.emit('end');
                }}))
            .pipe(compass({
                config_file: path + src + 'config.rb',
                css: 'stylesheets',
                sass: 'sass'
            }))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(minifyCSS({
                sourceMap: true
            }))
            .pipe(gulp.dest(path + dist + css));
    });

// JS CONCAT ===================================================================

// Head JS
    gulp.task('concat_head_js', function() {
        return gulp.src(
          [
              path + src + js + head_js + '**/*.js'
          ]
        )
        .pipe(plumber())
        .pipe(concat('head.min.js'))
        .pipe(gulp.dest(path + dist + js));
    });

// Footer JS
    gulp.task('concat_footer_js', function() {
        return gulp.src([
            path + src + js + footer_js + '**/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('footer.min.js'))
        .pipe(gulp.dest(path + dist + js));
    });

// Libruary JS
    gulp.task('concat_lib_js', function() {
    return gulp.src(
      [
          path + src + js + lib_js + '**/*.js'
      ]
    )
    .pipe(plumber())
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest(path + dist + js));
    });

    // MINIFING
    gulp.task('minify_js', function() {
        return gulp.src(path + dist + js + '*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(path + dist + js));
    });


// JS LINT =====================================================================

    gulp.task('jslint', function() {
        return gulp.src([
            '!' + path + src + js + lib_js + '**/*.js',
            path + src + js + '**/*.js'
        ])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    });

// SPRITEMAPS ==================================================================

    gulp.task('sprite-png', function () {
        var spriteData = gulp.src(path + src + images + sprites_png + '**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '../../../' + src + scss + 'sprite/_sprite.generated.scss'
        }));
    return spriteData.pipe(gulp.dest(path + dist + images + sprites_map))});

// IMAGEMIN ====================================================================

    gulp.task('imagemin', function () {
        var imageDest = path + dist + images;
        gulp.src(
            path + src + images + '**/*'
        )
            .pipe(newer(imageDest))
            .pipe(imagemin())
            .pipe(gulp.dest(imageDest))
    });

// WATCH TASK ==================================================================

    gulp.task('watch', function () {
        gulp.watch([
            path + src + scss + '**/*.s+(a|c)ss',
            path + src + js + '**/*.js'
        ],['sass','sasslint', 'js_dev']);
    });

// JSON MERGE ==================================================================

    gulp.task('merge-json', function () {
        log('From Woodoo-Buildtools: ' + buildtools_core + 'package.json');
        log('From Theme Path: ' + path + 'package.json');
        gulp.src([
            buildtools_core + 'package.json',
            path + 'package.json'
        ])
        .pipe(merge({
            fileName: 'package.json'
        }))
        .pipe(gulp.dest('./'));
    });

// Common usable tasks ==========================================================

gulp.task('default', gulpSequence(
    ['sprite-png'],
    'sass_minified',
    'sasslint',
    'js_minified',
    'imagemin'
));


// Run gulp dev to get all files in a unminified version
gulp.task('dev', [
    'sass',
    'sasslint',
    'js_dev',
    'imagemin'
]);

gulp.task('update-buildtool', [
    'merge-json'
    ], shell.task('npm install'));

gulp.task('syscheck', [

], shell.task(
    [
        'echo Node-Version:', 'node -v',
        'echo NPM-Version:', 'npm -v',
        'echo NPM-Outdated Packages:', 'npm outdated'
    ]
));

// Sequenced tasks ==========================================================

gulp.task('js_minified', gulpSequence(
    ['jslint'], 'concat_footer_js', 'concat_head_js', 'concat_lib_js', 'minify_js'
));

gulp.task('js_dev', function(callback){
    gulpSequence(['jslint'],'concat_head_js','concat_footer_js')(callback)
});
