const chalk = require('chalk');

module.exports = () => {
console.log('\n\n✅ ', chalk.black.bgGreen(' Installation complete! 🦄  Make the web a better place. \n'));
console.log('\n✊ ', chalk.black.bgYellow(' Support Woodoo-Buildtools \n'));
console.log(
    chalk.white.bold('Do you like Woodoo-Buildtools?'),
    '\nYou can now support this open source project: \n'
);
console.log(
    `	${chalk.yellow('Support with coffee (via PayPal) →')} paypal.me/dermatz`,
    '\n',
    `	${chalk.yellow('Report an issue →')} https://github.com/dermatz/woodoo-buildtools/issues`,
    '\n',
    `	${chalk.yellow('Become a contributor →')} https://github.com/dermatz/woodoo-buildtools/pulls`
);

console.log('\n\n🎯 ', chalk.black.bgGreen(' Getting Started...\n'));
console.log(' Next Steps → \n');
console.log(` ${chalk.dim('👉')} ${chalk.green('cd woodoo-buildtools')} and ..`);
console.log(` ${chalk.dim('1.')} Editing the ${chalk.green('gulp_config.json')} file to specify your theme structure.`);
console.log(` ${chalk.dim('2.')} Run ${chalk.green('npm run woodoo-init')} to complete the Woodoo Buildtools installation.`, '\n');
console.log('\n\n🎯 ', chalk.black.bgGreen(' Updates ...\n'));
console.log('📦 ', ` If you want to update Woodoo-Buildtools in the future, just run ${chalk.green('npm run woodoo-update')} to get the newest version.`, '\n\n');
};
