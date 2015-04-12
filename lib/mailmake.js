var fs = require('fs');

var q = require('q');
var extend = require('extend');
var md = require('markdown-it')({
    html: true,
    linkify: true
});

var defaultOptions = {
    subject: '',
    from: '',
    to: ''
};

module.exports.seed = '0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * Returns a randomly generated string based on seed.
 *
 *     console.log(mailmake.randomString(10));
 *
 * @param {Integer} [num] The length of randomly generated string. Default 20.
 * @return {String} Randomly generated string.
 * @public
 */

module.exports.randomString = function (num) {

    var output = '',
        characters = module.exports.seed,
        length = characters.length;

    if (!num) {

        num = 20;

    }

    while (output.length < num) {

        output += characters[Math.floor(Math.random() * length)];

    }

    return output;

};

/**
 * Returns a valid boundary string based on contents of email.
 *
 *     console.log(mailmake.boundaryString(fs.readFileSync('email.html', 'utf8')));
 *
 * @param {String} [contents] Contents of email.
 * @return {String} Boundary string.
 * @public
 */

module.exports.boundaryString = function (contents) {

    var boundary;

    do {

        boundary = '==============' + module.exports.randomString(20) + '==';

    } while (contents && contents.indexOf(boundary) !== -1);

    return boundary;

};

/**
 * Returns generated mime file contents based on either file or string.
 *
 *     mailmake.generate('email.html', {
 *        subject: 'Hello World!',
 *        from: 'test@example.com',
 *        to: 'mailing-list@example.com'
 *     }).then(function (output) {
 *        console.log(output);
 *     });
 *
 * @param {String} input File path or string of email contents. Can be either HTML or Markdown.
 * @param {String} [options] Options for generating file.
 * @param {String} [options.subject] Subject of email.
 * @param {String} [options.from] From address of email.
 * @param {String} [options.to] To address of email.
 * @return {Object} Promise returns contents of generated mime file.
 * @public
 */

module.exports.generate = function (input, options) {

    var deferred = new q.defer();

    fs.stat(input, function (err, stats) {

        if (stats && stats.isFile()) {

            fs.readFile(input, 'utf8', function (err, data) {

                deferred.resolve(module.exports._generateFromString(data, options));

            });

        } else {

            deferred.resolve(module.exports._generateFromString(input, options));

        }

    });

    return deferred.promise;

};

/**
 * Returns generated mime file contents.
 *
 *     console.log(mailmake._generateFromString('# Hello World!', {
 *         subject: 'Hello World!',
 *         from: 'test@example.com',
 *         to: 'mailing-list@example.com'
 *     }));
 *
 * @param {String} input String of email contents. Can be either HTML or Markdown.
 * @param {String} [options] Options for generating file.
 * @param {String} [options.subject] Subject of email.
 * @param {String} [options.from] From address of email.
 * @param {String} [options.to] To address of email.
 * @return {String} Returns contents of generated mime file.
 * @private
 */

module.exports._generateFromString = function (input, options) {

    var output = '',
        boundary = module.exports.boundaryString(input);

    options = extend(true, {}, defaultOptions, options);

    output += 'Content-Type: multipart/alternative;\n';
    output += ' boundary="' + boundary + '"\n';
    output += 'MIME-Version: 1.0\n';

    if (options.subject) {
        output += 'Subject: ' + options.subject + '\n';
    }

    if (options.from) {
        output += 'From: ' + options.from + '\n';
    }

    if (options.to) {
        output += 'To: ' + options.to + '\n';
    }

    output += '\n';

    output += '--' + boundary + '\n';

    output += 'Content-Type: text/html; charset="us-ascii"\n';
    output += 'MIME-Version: 1.0\n';
    output += 'Content-Transfer-Encoding: 7bit\n';

    output += '\n';

    output += md.render(input) + '\n';

    output += '--' + boundary + '--\n';

    return output;

};
