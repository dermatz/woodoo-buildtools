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
const theCWDArray = theCWD.split('/');
const theDir = theCWDArray[theCWDArray.length - 1];

module.exports = () => {
    clearConsole();
    const filesToDownload = [
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/gulpfile.example.js',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/CHANGELOG.md',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.nvmrc',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.jshintrc',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.sass-lint.yml',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.gitignore',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/README.md',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',
        'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/LICENSE',
    ];

// include hidden Dotfiles
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
    spinner.start(`1. Downloading Woodoo-Buildtools source in → ${chalk.black.bgGreenBright(` ${theDir} `)}`);

// Download
    Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
        dotFiles.map(x => fs.rename(`${theCWD}/${x.slice(1)}`, `${theCWD}/${x}`, err => handleError(err)));
        spinner.succeed();

        // The npm install.
        spinner.start(`2. Copy ${chalk.yellow('package.json')} Woodoo-Buildtools Core ...`);
        await fs.copyFile('./core/package.json', 'package.json', () => {
        });
        spinner.succeed();

        // CHECK GULP CONFIG
        const packages = new Promise(function (resolve, reject) {
            spinner.start('3. Check if all Woodoo-Buildtools files are ready ...');
            setTimeout(function () {
                fs.access(theCWD +'/core/package.json', fs.F_OK, (notexist) => {
                    if (notexist) {
                        download('https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',theCWD +'/core');
                        spinner.succeed(`3. Moew! Packages are installed successfully`);
                        resolve('Packages downloadet');
                    } else {
                        fs.unlink(theCWD + '/core/package.json',function(){});
                        download('https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',theCWD + '/core');
                        spinner.succeed(`3. Moew! Core-Dependencies are up to date now`);
                        resolve('Packages renewed');
                    }
                });
            }, 3000);
        });

        await packages.then(function whenOk(response) {
            return response;
        });

        spinner.start('4. Install Woodoo-Buildtools dependencies ...');
        await execa('npm', ['--prefix', 'woodoo-buildtools', 'install', 'woodoo-buildtools']);
        spinner.succeed();

        // CHECK GULPFILE
        const check_gulpfile = new Promise(function (resolve, reject) {
            spinner.start('Check Gulpfile ...');
            setTimeout(function () {
                fs.access(theCWD + '/gulpfile.js', fs.F_OK, (notFound) => {
                    if (notFound) {
                        fs.rename(theCWD + '/gulpfile.example.js', theCWD + '/gulpfile.js', function () {
                        });
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
                fs.access(theCWD + '/gulp_config.json', fs.F_OK, (exist) => {
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
}
