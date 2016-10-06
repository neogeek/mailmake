/* eslint max-statements: 0 */
/* eslint handle-callback-err: 0 */

'use strict';

const fs = require('fs');

const md = require('markdown-it')({
    'html': true,
    'linkify': true
});

const RANDOM_STRING_LENGTH = 20;

const seed = '0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * Returns a randomly generated string based on seed.
 *
 *     console.log(mailmake.randomString());
 *
 * @return {String} Randomly generated string.
 * @public
 */

const randomString = () =>
    Array(RANDOM_STRING_LENGTH).fill()
        .map(() => module.exports.seed[Math.floor(Math.random() * module.exports.seed.length)])
        .join('');

/**
 * Returns a boundary string.
 *
 *     console.log(mailmake.boundaryString());
 *
 * @return {String} Boundary string.
 * @public
 */

const boundaryString = () =>
    `==============${randomString()}==`;

/**
 * Returns generated mime file contents.
 *
 *     console.log(mailmake.generateFromString('# Hello World!', {
 *         from: 'test@example.com',
 *         subject: 'Hello World!',
 *         to: 'mailing-list@example.com'
 *     }));
 *
 * @param {String} input String of email contents. Can be either HTML or Markdown.
 * @param {String} [options] Options for generating file.
 * @param {String} [options.from] From address of email.
 * @param {String} [options.subject] Subject of email.
 * @param {String} [options.to] To address of email.
 * @return {String} Returns contents of generated mime file.
 * @private
 */

const generateFromString = (input, options) => {

    let output = '';

    const boundary = boundaryString(input);

    output += `Content-Type: multipart/alternative;
 boundary="${boundary}"
MIME-Version: 1.0\n`;

    if (options.subject) {

        output += `Subject: ${options.subject}\n`;

    }

    if (options.from) {

        output += `From: ${options.from}\n`;

    }

    if (options.to) {

        output += `To: ${options.to}\n`;

    }

    output += `
--${boundary}
Content-Type: text/html; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit

${md.render(input)}
--${boundary}--\n`;

    return output;

};

/**
 * Returns generated mime file contents based on either file or string.
 *
 *     mailmake.generate('email.html', {
 *        from: 'test@example.com',
 *        subject: 'Hello World!',
 *        to: 'mailing-list@example.com'
 *     }).then(function (output) {
 *        console.log(output);
 *     });
 *
 * @param {String} input File path or string of email contents. Can be either HTML or Markdown.
 * @param {String} [options] Options for generating file.
 * @param {String} [options.from] From address of email.
 * @param {String} [options.subject] Subject of email.
 * @param {String} [options.to] To address of email.
 * @return {Object} Promise returns contents of generated mime file.
 * @public
 */

const generate = (input, options) => new Promise((resolve, reject) => {

    fs.stat(input, (err, stats) => {

        if (stats && stats.isFile()) {

            fs.readFile(input, 'utf8', (err, contents) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(generateFromString(contents, options));

                }

            });

        } else {

            resolve(generateFromString(input, options));

        }

    });

});

module.exports = {
    boundaryString,
    generate,
    generateFromString,
    randomString,
    seed
};
