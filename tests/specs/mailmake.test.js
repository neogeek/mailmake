const assert = require('assert');

const fs = require('fs');

const mailmake = require('../../lib/mailmake');

describe('mailmake', () => {
    beforeAll(() => {
        mailmake.seed = 's';
    });

    it('should generate random string', () => {
        assert.strictEqual(mailmake.randomString(), 'ssssssssssssssssssss');
    });

    it('should generate boundary', () => {
        assert.strictEqual(
            mailmake.boundaryString(),
            '==============ssssssssssssssssssss=='
        );
    });

    it('should generate mime file from file', done => {
        mailmake
            .generate('./tests/fixtures/email.html', {
                from: 'test@example.com',
                subject: 'Hello World!',
                to: 'mailing-list@example.com'
            })
            .then(output => {
                // fs.writeFileSync('./tests/fixtures/email.mime', output, 'utf8');

                fs.readFile(
                    './tests/fixtures/email.mime',
                    'utf8',
                    (err, data) => {
                        assert.strictEqual(output, data);

                        done();
                    }
                );
            });
    });

    it('should generate mime file from string', done => {
        fs.readFile('./tests/fixtures/email.html', 'utf8', (err, email) => {
            mailmake
                .generate(email, {
                    from: 'test@example.com',
                    subject: 'Hello World!',
                    to: 'mailing-list@example.com'
                })
                .then(output => {
                    fs.readFile(
                        './tests/fixtures/email.mime',
                        'utf8',
                        (err, data) => {
                            assert.strictEqual(output, data);

                            done();
                        }
                    );
                });
        });
    });

    it('should generate mime file from string (private method)', done => {
        fs.readFile('./tests/fixtures/email.html', 'utf8', (err, email) => {
            fs.readFile('./tests/fixtures/email.mime', 'utf8', (err, data) => {
                assert.strictEqual(
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
