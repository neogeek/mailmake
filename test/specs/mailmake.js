var fs = require('fs');
var assert = require('assert');

var lib = process.env.COVERAGE ? '../../lib-cov' : '../../lib';

var mailmake = require(lib + '/mailmake');

describe('mailmake', function () {

    before(function () {

        mailmake.seed = 's';

    });

    it('should generate random string', function () {

        assert.equal(mailmake.randomString(10), 'ssssssssss');

    });

    it('should generate random string without passing number', function () {

        assert.equal(mailmake.randomString(), 'ssssssssssssssssssss');

    });

    it('should generate boundary', function (done) {

        fs.readFile('./test/fixture/email.html', 'utf8', function (err, data) {

            assert.equal(mailmake.boundaryString(data), '==============ssssssssssssssssssss==');

            done();

        });

    });

    it('should generate boundary without passing email contents', function (done) {

        assert.equal(mailmake.boundaryString(), '==============ssssssssssssssssssss==');

        done();

    });

    it('should generate mime file from file', function (done) {

        mailmake.generate('./test/fixture/email.html', {
            subject: 'Hello World!',
            from: 'test@example.com',
            to: 'mailing-list@example.com'
        }).then(function (output) {

            // fs.writeFileSync('./test/fixture/email.mime', output, 'utf8');

            fs.readFile('./test/fixture/email.mime', 'utf8', function (err, data) {

                assert.equal(output, data);

                done();

            });

        });

    });

    it('should generate mime file from string', function (done) {

        fs.readFile('./test/fixture/email.html', 'utf8', function (err, email) {

            mailmake.generate(email, {
                subject: 'Hello World!',
                from: 'test@example.com',
                to: 'mailing-list@example.com'
            }).then(function (output) {

                fs.readFile('./test/fixture/email.mime', 'utf8', function (err, data) {

                    assert.equal(output, data);

                    done();

                });

            });

        });

    });

    it('should generate mime file from string (private method)', function (done) {

        fs.readFile('./test/fixture/email.html', 'utf8', function (err, email) {

            fs.readFile('./test/fixture/email.mime', 'utf8', function (err, data) {

                assert.equal(mailmake._generateFromString(email, {
                    subject: 'Hello World!',
                    from: 'test@example.com',
                    to: 'mailing-list@example.com'
                }), data);

                done();

            });

        });

    });

});
