/**
 * Install WPGulp
 */
const fs = require('fs');
const theCWD = process.cwd();
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];
const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const download = require('download');
const handleError = require('./helper/handleError.js');
const clearConsole = require('./helper/clearConsole.js');
const printNextSteps = require('./helper/printNextSteps.js');

// module.exports = () => {

// Files.
clearConsole();
const filesToDownload = [
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/gulpfile.example.js',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/CHANGELOG.md',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.nvmrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.jshintrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.sass-lint.yml',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.gitignore',
];
// include hidden Dotfiles.
const dotFiles = ['.nvmrc', '.sass-lint.yml', '.jshintrc', '.gitignore'];

// Install Process ...
console.log('\n');
console.log(
    '📦 ',
    chalk.black.bgBlueBright(` Downloading Woodoo-Buildtools source in: → ${chalk.black.bgYellowBright(` ${theDir} `)}\n`),
    chalk.dim(`\n The current install directory is: ${chalk.yellow(theCWD)}\n`),
    chalk.dim('This might take a moment...\n')
);

const spinner = ora({text: ''});
spinner.start(`Install Woodoo-Buildtools source in → ${chalk.black.bgGreenBright(` ${theDir} `)}`);


// Download.
Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
    dotFiles.map(x => fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err => handleError(err)));
    spinner.succeed();


    var setup = {
        gulpfile: function () {
            spinner.start('Search gulfile.js');
            fs.access('./gulpfile.js', fs.F_OK, (err) => {
                if (err) {
                    fs.rename('./gulpfile.example.js', './gulpfile.js', function (err) {
                        if (err) console.log('ERROR: ' + err);
                    });
                    spinner.succeed(`${chalk.yellow('gulpfile.example.js')} was renamed to ${chalk.green('gulpfile.js')}`);
                } else {
                    spinner.succeed('gulpfile.js found!');
                }
            });
            return this;
        },

        gulpfileConfig: function () {
            spinner.start('Search gulp_config.json');
            fs.access('./gulp_config.json', fs.F_OK, (err) => {
                if (err) {
                    const ext_download = [
                        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/gulp_config.json',
                    ];
                    Promise.all(ext_download.map(x => download(x, `${theCWD}`)));
                    spinner.succeed('gulp_config.json downloaded!');
                } else {
                    spinner.succeed('gulp_config.json found');
                }
            });
            return this;
        },
        npmInstall: function () {
            // spinner.start('Installing npm packages ...');

            function installing() {
                return new Promise(resolve => {
                    execa('npm', ['install']);
                    spinner.succeed();
                });
            };

            async function asyncCall() {
                await installing();
            }

            asyncCall();



            return this;
        }
    };

    setup
        .gulpfile()
        .gulpfileConfig()
        .npmInstall();

});



// function npmInstaller() {
//     setTimeout(function () {
//         spinner.start('Installing npm packages ...');
//         execa('npm', ['install']);
//     }, 2000);
//     spinner.succeed();
// }
//
// first();
// second();
// npmInstaller();


//     printNextSteps();
// new Promise(function(resolve, reject) {
//     spinner.start('Search gulpfile.js');
//     setTimeout(function () {
//          fs.access(gulpfile, fs.F_OK, (err) => {
//             if (err) {
//                 fs.rename('./gulpfile.example.js', './gulpfile.js', function (err) {
//                     if (err) console.log('ERROR: ' + err);
//                 });
//                 spinner.succeed(`${chalk.yellow('gulpfile.example.js')} was renamed to ${chalk.green('gulpfile.js')}`);
//             } else {
//                 spinner.succeed('gulpfile.js found!');
//             }
//         }, 14000);
//     });
// })


