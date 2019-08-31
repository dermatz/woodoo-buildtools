/**
 * WOODOO-BUILDTOOLS CONFIGURATION FILE
 */

//================================================================================================================================
// BUILDTOOLS BASIC SETUP
//================================================================================================================================
const woodoo_buildtools_core = './core/';

//================================================================================================================================
// PROJECT OPTIONS AND PATHES
// IMPORTANT: add slash "/" at the end of the path
//================================================================================================================================
const project_path      =   '../test/';
const project_dist      =   project_path + 'dist/';          // destination directory
const project_scss      =   project_path + 'assets/scss/';   // path to the scss source files
const project_images    =   project_path + 'assets/images/'; // path to the image source files
const project_js        =   project_path + 'assets/js/';     // path to the js source files
const project_js_lib    =   project_js + 'lib/';             // path to the lib-js folder (includes 3rd Party lib's)
const project_js_head   =   project_js + 'head/';            // path to the head-js folder (includes files which be loaded in the head)
const project_js_footer =   project_js + 'footer/';          // path to the footer-js folder (includes files close before the </body>)

//================================================================================================================================
// LINTER CONFIG FILES
//================================================================================================================================
const sassLint          =   woodoo_buildtools_core + '.sass-lint.yml';               // Name and Path to the sass-lint config file
const esLint            =   woodoo_buildtools_core + '.eslintrc';
const babelLint         =   woodoo_buildtools_core + '.babelrc';

//================================================================================================================================
// BROWSERSYNC
//================================================================================================================================
const browsersync_support   =   true;                       // enable or disable the BrowserSync functionality
const browsersync_proxyUrl  =   'local.test';               // add you project development url
const browsersync_port      =   3000;
const browsersync_portUI    =   8080;
const browsersync_https     =   false;
const browsersync_notify    =   false;
const browsersync_ghostmod  =   true;
const browsersync_new_tab   =   false;

//================================================================================================================================
// JS CONCATINATION
//================================================================================================================================
const project_js_lib_files = [
    // "node_modules/path/to/libruary/...",                 // Add more locations in this array if you need
    project_js_lib + "**/*.js"
];
const project_js_head_files = [
    project_js_head + "**/*.js"                             // Add more locations in this array if you need
];
const project_js_footer_files = [
    project_js_footer + "**/*.js"                           // Add more locations in this array if you need
];

//================================================================================================================================
// IMAGE OPTIMIZATION
//================================================================================================================================
const imagemin_optimization_level   =   5;                  // default is 5
const imagemin_interlaced           =   true;               // default true
const imagemin_progressive          =   true;               // default true
const imagemin_removeviewbox        =   false;              // default false
const imagemin_collapsegroups       =   true;               // default true

//================================================================================================================================
// BUILD SETTINGS
//================================================================================================================================
const dependency_check              =   true;               // default is true - enable or disable the npm dependency check during build process

//================================================================================================================================
// MODULE EXPORTS
// ⚠️ DO NOT EDIT BELOW THIS LINE !!!
//================================================================================================================================
module.exports = {
    woodoo_core:                woodoo_buildtools_core,
    project_path:               project_path,
    project_js:                 project_js,
    project_scss:               project_scss,
    project_images:             project_images,
    project_dist:               project_dist,
    project_js_lib:             project_js_lib,
    project_js_head:            project_js_head,
    project_js_footer:          project_js_footer,
    sasslint:                   sassLint,
    eslint:                     esLint,
    babellint:                  babelLint,
    concat_JS_lib:              project_js_lib_files,
    concat_JS_head:             project_js_head_files,
    concat_JS_footer:           project_js_footer_files,
    browsersync_support:        browsersync_support,
    browsersync_proxyUrl:       browsersync_proxyUrl, // add you project development url
    browsersync_port:           browsersync_port,
    browsersync_portUI:         browsersync_portUI,
    browsersync_https:          browsersync_https,
    browsersync_notify:         browsersync_notify,
    browsersync_ghostmode:      browsersync_ghostmod,
    browsersync_new_tab:        browsersync_new_tab,
    imagemin_optimization_level:imagemin_optimization_level,
    imagemin_interlaced:        imagemin_interlaced,
    imagemin_progressive:       imagemin_progressive,
    imagemin_removeviewbox:     imagemin_removeviewbox,
    imagemin_collapsegroups:    imagemin_collapsegroups,
    dependency_check:           dependency_check
};
