/**
 * Prints next steps.
 */

const chalk = require( 'chalk' );
const theCWD = process.cwd();

/* eslint-disable no-console */
module.exports = () => {
    console.log( '\n\n✅ ', chalk.black.bgGreen( ' Installation complete! 🦄  Make the web to a better place. \n' ) );

    // Support Woodoo-Buildtools
    console.log( '\n✊ ', chalk.black.bgYellow( ' Support Woodoo-Buildtools \n' ) );
    console.log(
        chalk.white.bold('You like Woodoo-Buildtools?'),
        '\nYou can now support this free and open source project: \n'
    );
    console.log(
        `	${chalk.yellow( 'Support with Coffee (via PayPal) →' )} paypal.me/dermatz`,
        '\n',
        `	${chalk.yellow( 'Report an Issue →' )} https://github.com/dermatz/woodoo-buildtools/issues`,
        '\n',
        `	${chalk.yellow( 'Get a Contributor →' )} https://github.com/dermatz/woodoo-buildtools/pulls`
    );

    // Get started.
    console.log( '\n\n🎯 ', chalk.black.bgGreen( ' Get Started → \n' ) );
    console.log( ' I suggest that you begin by: \n' );
    console.log( ` ${chalk.dim( '1.' )} Editing the ${chalk.green( 'gulp_config.json' )} file` );
    console.log( ` ${chalk.dim( '2.' )} Running ${chalk.green( 'npm' )} start`, '\n\n' );
};
