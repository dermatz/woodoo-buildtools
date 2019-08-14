/**
 * Install WPGulp
 */
console.log('start');
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
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/gulp_config.json',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/package.json',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/CHANGELOG.md',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.nvmrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.jshintrc',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.sass-lint.yml',
    'https://raw.githubusercontent.com/dermatz/woodoo-buildtools/master/.gitignore',
];
// include hidden Dotfiles.
const dotFiles = ['.nvmrc','.sass-lint.yml','.jshintrc','.gitignore'];

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
    spinner.succeed();

    // The npm install.
    spinner.start('2. Installing npm packages...');
    // await execa('npm', ['install', '--silent']);
    await execa('npm', ['install']);
    spinner.succeed();

    // Done.
    printNextSteps();
});
// };
