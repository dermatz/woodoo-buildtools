#!/usr/bin/env node
'use strict';
const fs = require('fs');
const ora = require('ora');
const execa = require('execa');
const chalk = require('chalk');
const download = require('download');

const handleError = require('./handleError.js');
const clearConsole = require('./clearConsole.js');
const printNextSteps = require('./printNextSteps.js');

const theCWD = process.cwd() + '/woodoo-buildtools';
const core = process.cwd() + '/woodoo-buildtools/core';
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

module.exports = () => {
    clearConsole();
    const filesToDownload = [
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/LICENSE',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/README.md',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/CHANGELOG.md',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/gulpfile.example.js',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/gulp.config.js',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/.sass-lint.yml',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/.eslintrc',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/.babelrc',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/core/.browserslistrc',
    ];

    // include hidden Dotfiles
    const dotFiles = ['.sass-lint.yml', '.babelrc', '.browserslistrc', '.eslintrc'];

    // Install Process ...
    console.log('\n');
    console.log(
        '📦 ',
        chalk.black.bgBlueBright(` Downloading Woodoo-Buildtools source in: → ${chalk.black.bgYellowBright(` ${theDir} `)}\n`),
        chalk.dim(`\n The current install directory is: ${chalk.yellow(theCWD)}\n`),
        chalk.dim('This might take a moment...\n')
    );

    const spinner = ora({text: ''});
    spinner.start(`1. Downloading Woodoo-Buildtools source in → ${chalk.black.bgGreenBright(` ${theDir} `)}`);

    // Download
    Promise.all(filesToDownload.map(x => download(x, `${core}`))).then(async () => {
        dotFiles.map(x => fs.rename(`${core}/${x.slice(1)}`, `${core}/${x}`, err => handleError(err)));
        spinner.succeed();

        const packages = new Promise(function (resolve, reject) {
            spinner.start('2. Check if all Woodoo-Buildtools files are ready ...');
            setTimeout(function () {
                fs.access(theCWD +'/package.json', fs.F_OK, (notexist) => {
                    if (notexist) {
                        fs.copyFile( core + '/package.json', theCWD + '/package.json', () => {});
                        spinner.succeed(`2. Packages are installed successfully`);
                        resolve('Packages downloadet');
                    } else {
                        spinner.succeed(`2. Core-Dependencies already downloaded.`);
                        resolve('Packages renewed');
                    }
                });
            }, 3000);
        });

        await packages.then(function whenOk(response) {
            return response;
        });

        // The prepare files.
        spinner.start(`3. Copy files from Woodoo-Buildtools Core ...`);
        await fs.copyFile(core + '/.browserslistrc', theCWD + '/.browserslistrc', () => {});
        spinner.succeed();

        // The npm install.
        spinner.start('4. Install Woodoo-Buildtools dependencies ...');
        await execa('npm', ['--prefix', theCWD, 'install', theCWD]);
        spinner.succeed();

        // CHECK GULPFILE
        const check_gulpfile = new Promise(function (resolve, reject) {
            spinner.start('Check Gulpfile ...');
            setTimeout(function () {
                fs.access(theCWD + '/gulpfile.js', fs.F_OK, (notFound) => {
                    if (notFound) {
                        fs.rename(theCWD + '/core/gulpfile.example.js', theCWD + '/gulpfile.js', function () {
                        });
                        spinner.succeed(`4. All right. The ${chalk.yellow('gulpfile.js')} is ready now.`);
                        resolve('renamed');
                    } else {
                        spinner.succeed(`4. The ${chalk.yellow('gulpfile.js')} is already there!`);
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
            spinner.start('Check the new Gulp Config file ...');
            setTimeout(function () {
                fs.access(theCWD + '/gulp.config.js', fs.F_OK, (notFound) => {
                    if (notFound) {
                        fs.copyFile(core + '/gulp.config.js', theCWD + '/gulp.config.js', () => {});
                        spinner.succeed(`4. Yeah. The new s${chalk.yellow('gulp.config.js')} is ready now.`);
                        resolve('renamed');
                    } else {
                        spinner.succeed(`4. The ${chalk.yellow('gulp.config.js')} found!`);
                        resolve('found');
                    }
                });
            }, 2000);
        });

        await check_gulp_config.then(function whenOk(response) {
            return response;
        });

        printNextSteps();
    });
}
