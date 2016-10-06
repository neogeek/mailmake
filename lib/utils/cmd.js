/* eslint no-param-reassign: 0 */
/* eslint max-statements: 0 */

'use strict';

const path = require('path');

const PROCESS_CMD_LINE_ARGS_LENGTH = 2;
const FLAG_REGEX_PATTERN = /^-{1,2}/;

/**
 * Returns input and flags parsed from command line arguments.
 *
 *     console.log(parseCmdLineArgs());
 *     console.log(parseCmdLineArgs(['--version']));
 *     console.log(parseCmdLineArgs(['-s', 'Test Email']));
 *     console.log(parseCmdLineArgs(['./src/', '-s', 'Test email']));
 *
 * @param {Array} [args] Arguments to parse through.
 * @return {Object} Object with keys for the input string (if supplied) and the flags object.
 * @public
 */

const parseCmdLineArgs = args => {

    let input = process.cwd();

    const flags = {};

    let key = null;
    let value = null;

    if (!args) {

        args = process.argv.slice(PROCESS_CMD_LINE_ARGS_LENGTH);

    }

    if (args.length && !args[0].match(/^\-/)) {

        input = path.resolve(args.shift());

    }

    while (args.length) {

        if (args.length && args[0].match(FLAG_REGEX_PATTERN)) {

            key = args.shift();

        }

        if (args.length && !args[0].match(FLAG_REGEX_PATTERN)) {

            value = args.shift();

        } else {

            value = true;

        }

        flags[key] = value;

    }

    return {
        flags,
        input
    };

};

module.exports = {
    parseCmdLineArgs
};
