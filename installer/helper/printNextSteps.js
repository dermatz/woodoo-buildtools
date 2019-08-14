/**
 * Prints next steps.
 */

const chalk = require( 'chalk' );
const theCWD = process.cwd();

/* eslint-disable no-console */
module.exports = () => {
    console.log( '\n\n✅ ', chalk.black.bgGreen( ' Installation complete! 🦄  Make the web a better place. \n' ) );

    // Support Woodoo-Buildtools
    console.log( '\n✊ ', chalk.black.bgYellow( ' Support Woodoo-Buildtools \n' ) );
    console.log(
        chalk.white.bold('Do you like Woodoo-Buildtools?'),
        '\nYou can now support this open source project: \n'
    );
    console.log(
        `	${chalk.yellow( 'Support with coffee (via PayPal) →' )} paypal.me/dermatz`,
        '\n',
        `	${chalk.yellow( 'Report an issue →' )} https://github.com/dermatz/woodoo-buildtools/issues`,
        '\n',
        `	${chalk.yellow( 'Become a contributor →' )} https://github.com/dermatz/woodoo-buildtools/pulls`
    );

    console.log( '\n\n🎯 ', chalk.black.bgGreen( ' Getting Started... → \n' ) );
    console.log( ' We suggest that you begin by: \n' );

    console.log( ` ${chalk.dim( '1.' )} Editing the ${chalk.green( 'gulp_config.json' )} file` );
    console.log( ` ${chalk.dim( '2.' )} Running ${chalk.green( 'npm' )} start`, '\n\n' );
};
