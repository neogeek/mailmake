const assert = require('assert');

const fs = require('fs');

const mailmake = require('../../lib/mailmake');

describe('mailmake', () => {
    before(() => {
        mailmake.seed = 's';
    });

    it('should generate random string', () => {
        assert.equal(mailmake.randomString(), 'ssssssssssssssssssss');
    });

    it('should generate boundary', () => {
        assert.equal(
            mailmake.boundaryString(),
            '==============ssssssssssssssssssss=='
        );
    });

    it('should generate mime file from file', done => {
        mailmake
            .generate('./test/fixtures/email.html', {
                from: 'test@example.com',
                subject: 'Hello World!',
                to: 'mailing-list@example.com'
            })
            .then(output => {
                // fs.writeFileSync('./test/fixtures/email.mime', output, 'utf8');

                fs.readFile(
                    './test/fixtures/email.mime',
                    'utf8',
                    (err, data) => {
                        assert.equal(output, data);

                        done();
                    }
                );
            });
    });

    it('should generate mime file from string', done => {
        fs.readFile('./test/fixtures/email.html', 'utf8', (err, email) => {
            mailmake
                .generate(email, {
                    from: 'test@example.com',
                    subject: 'Hello World!',
                    to: 'mailing-list@example.com'
                })
                .then(output => {
                    fs.readFile(
                        './test/fixtures/email.mime',
                        'utf8',
                        (err, data) => {
                            assert.equal(output, data);

                            done();
                        }
                    );
                });
        });
    });

    it('should generate mime file from string (private method)', done => {
        fs.readFile('./test/fixtures/email.html', 'utf8', (err, email) => {
            fs.readFile('./test/fixtures/email.mime', 'utf8', (err, data) => {
                assert.equal(
                    mailmake.generateFromString(email, {
                        from: 'test@example.com',
                        subject: 'Hello World!',
                        to: 'mailing-list@example.com'
                    }),
                    data
                );

                done();
            });
        });
    });
});
