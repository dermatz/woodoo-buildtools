'use strict';

// Extern Config Files =========================================================
var timestamp           = Date.now(),
    vars                = require('./gulp_config.json'),
    packageinfo         = require(vars.buildtools.path + 'package.json'),
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
    newer               = require('gulp-newer');

// Shell Messages ==============================================================

log('💪‍ You are using Woodoo-Buildtools ' + packageinfo.version);
 
// SASS ========================================================================

    gulp.task('sass', function () {
    return gulp.src(vars.project.path_scss + '**/*.s+(a|c)ss')
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
        .pipe(gulp.dest(vars.project.path_dist + 'css'));
    });

    gulp.task('sass_minified', function () {
        return gulp.src(vars.project.path_scss + '**/*.s+(a|c)ss')
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
            .pipe(gulp.dest(vars.project.path_dist + 'css'));
    });

// SASS LINT ===================================================================

    gulp.task('sasslint', function () {
    return gulp.src([
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
    });

// JS CONCAT ===================================================================

    // Head JS
    gulp.task('concat_head_js', function() {
        return gulp.src(
            [
                vars.project.path_head_js + '**/*.js'
            ]
        )
        .pipe(plumber())
        .pipe(concat('head.min.js'))
        .pipe(gulp.dest(vars.project.path_dist + 'js'));
    });

    // Footer JS
    gulp.task('concat_footer_js', function() {
        return gulp.src(
            [
                vars.project.path_footer_js + '**/*.js'
            ]
        )
        .pipe(plumber())
        .pipe(concat('footer.min.js'))
        .pipe(gulp.dest(vars.project.path_dist + 'js'));
    });

    // Libruary JS
    gulp.task('concat_lib_js', function() {
        return gulp.src(
            [
              vars.project.path_lib_js + '**/*.js'
            ]
        )
        .pipe(plumber())
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest(vars.project.path_dist + 'js'));
    });

    // MINIFING
    gulp.task('minify_js', function() {
        return gulp.src(vars.project.path_dist + 'js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(vars.project.path_dist + 'js'));
    });

// JS LINT =====================================================================

    gulp.task('jslint', function() {
        return gulp.src([
            '!' + vars.project.path_lib_js + '**/*.js',
            vars.project.path_js + '**/*.js'
        ])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
    });

// SPRITEMAPS ==================================================================

    gulp.task('sprite-png', function () {
        var spriteData = gulp.src(vars.project.path_sprites_png + '**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: vars.project.path_scss + 'sprite/_sprite.generated.scss'
        }));
    return spriteData.pipe(gulp.dest(vars.project.path_sprites_dist))});

// IMAGEMIN ====================================================================

    gulp.task('imagemin', function () {
        var image_destination = vars.project.path_dist + 'images';
        gulp.src(
            vars.project.path_images + '**/*'
        )
        .pipe(newer(image_destination))
        .pipe(imagemin())
        .pipe(gulp.dest(image_destination))
    });

// WATCH TASK ==================================================================

    gulp.task('watch', function () {
        gulp.watch([ vars.project.path_scss + '**/*.s+(a|c)ss'],['sass','sasslint']);
        gulp.watch([ vars.project.path_js + '**/*.js'],['js_dev']);
    });


// Common usable tasks ==========================================================

    gulp.task('default', gulpSequence(
        ['dependencies-check'], // remove this line if you dont want a npm outdate-check
        ['sprite-png'],
        'sass_minified',
        'sasslint',
        'js_minified',
        'imagemin'
    ));

// Run gulp dev to get all files in a unminified version
    gulp.task('dev', gulpSequence(
        ['dependencies-check'],
        'sass',
        'sasslint',
        'js_dev',
        'imagemin'
    ));

    gulp.task('update-packages', [
        'merge-json'
    ], shell.task('npm install'));

    gulp.task('dependencies-check', () => {
        return gulp.src('*.js', {read: false})
            .pipe(shell([
            'echo ""',
            'echo "Check outdated dependencies from package.json ... please wait"',
            'npm outdated',
            'echo ""'
            ], { ignoreErrors: true }))
    });

// Sequenced tasks ==========================================================

    gulp.task('js_minified', gulpSequence(
        ['jslint'], 'concat_footer_js', 'concat_head_js', 'concat_lib_js', 'minify_js'
    ));

    gulp.task('js_dev', function(callback){
        gulpSequence(['jslint'],'concat_head_js','concat_footer_js')(callback)
    });




// UPDATE BUILDTOOLS & PROJECT ==================================================================

// Get all new depencies
gulp.task('update-dependencies', [], shell.task(
    [
        'echo :::::::: Check for Woodoo Updates 🔎 ...',
        'cd .. && composer update dermatz/woodoo-buildtools',
        'echo :::::::: Update Node Packages'
    ]
));

// Merge WoodooBuildtool package.json and project package-json
gulp.task('merge-json', function () {
    log('From Woodoo-Buildtools: ' + vars.buildtools.path + 'package.json');
    log('From Theme Path: ' + vars.project.path + 'package.json');
    gulp.src([
        vars.buildtools.path + 'package.json',
        vars.project.path + 'package.json'
    ])
        .pipe(merge({
            fileName: 'package.json'
        }))
        .pipe(gulp.dest('./'));
});

// Install the new merged package-json inside the woodoo-folder
gulp.task('install-json', [
    'merge-json'
], shell.task(
    [
        'npm install'
    ]
));

// Run the update-procedure
gulp.task('update',gulpSequence(
    ['update-dependencies'],
    ['install-json']
));

