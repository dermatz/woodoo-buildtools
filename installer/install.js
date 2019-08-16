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
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/CHANGELOG.md',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.nvmrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.jshintrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.sass-lint.yml',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.gitignore',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/README.md',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/LICENSE',
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
spinner.start(`1. Install Woodoo-Buildtools source in → ${chalk.black.bgGreenBright(` ${theDir} `)}`);


// Download.
Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
    dotFiles.map(x => fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err => handleError(err)));
    download('https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json', 'core');
    spinner.succeed();

    // The npm install.
    spinner.start(`2. Copy ${chalk.yellow('package.json')} Woodoo-Buildtools Core ...`);
    await fs.copyFile('./core/package.json', 'package.json', () => {});
    spinner.succeed();

    spinner.start('3. Install Woodoo-Buildtools dependencies ...');
    await execa('npm', ['install']);
    spinner.succeed();

    // CHECK GULPFILE
    const check_gulpfile = new Promise(function (resolve, reject) {
        spinner.start('Check Gulpfile ...');
        setTimeout(function () {
            fs.access('./gulpfile.js', fs.F_OK, (notFound) => {
                if (notFound) {
                    fs.rename('./gulpfile.example.js', './gulpfile.js', function () {});
                    spinner.succeed(`4. All right. The ${chalk.yellow('gulpfile.example.js')} was renamed to ${chalk.green('gulpfile.js')}`);
                    resolve('renamed');
                } else {
                    spinner.succeed(`4. All right, the ${chalk.yellow('gulpfile.example.js')} was found!`);
                    resolve('found');
                }
            });
        }, 2000);
    });

    await check_gulpfile.then(function whenOk(response) {
        return response;
    });

    // CHECK GULP CONFIG
    const check_gulp_config = new Promise(function (resolve, reject) {
        spinner.start('Check Gulp Config file ...');
        setTimeout(function () {
            fs.access('./gulp_config.json', fs.F_OK, (exist) => {
                if (exist) {
                    const ext_download = [
                        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/gulp_config.json',
                    ];
                    Promise.all(ext_download.map(x => download(x, `${theCWD}`)));
                    spinner.succeed(`5. Perfect! The ${chalk.yellow('gulp_config.json')} was downloaded!`);
                    resolve('Config-File does not exist');
                } else {
                    spinner.start('Search gulp_config.json');
                    spinner.succeed(`5. Yes! ${chalk.yellow('gulp_config.json')} was found!`);
                    resolve('Config-File found');
                }
            });
        }, 2000);
    });

    await check_gulp_config.then(function whenOk(response) {
        return response;
    });

    printNextSteps();


});

//
// function checkGulpfile(param, callback) {
//
//     callback();
// }
//
// function gulpfileConfig(param, callback) {

//     callback();
// }
//
// function nextSteps(param, callback) {
//     console.log(` ${chalk.dim('2.')} Running ${chalk.green('npm')} start`, '\n\n');
//     callback();
// }


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


