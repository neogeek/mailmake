const assert = require('assert');

const parseCmdLineArgs = require('../../lib/utils/cmd').parseCmdLineArgs;

describe('mailmake util cmd', () => {

    describe('parseCmdLineArgs', () => {

        it('parseCmdLineArgs with all valid arguments', () => {

            const args = parseCmdLineArgs([
                '-f',
                'no-reply@test.com',
                '-t',
                'no-reply@test.com',
                '-s',
                'Test email'
            ]);

            assert.deepEqual(args, {
                'flags': {
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                'input': process.cwd()
            });

        });

        it('parseCmdLineArgs with all valid arguments and directory', () => {

            const args = parseCmdLineArgs([
                './src',
                '-f',
                'no-reply@test.com',
                '-t',
                'no-reply@test.com',
                '-s',
                'Test email'
            ]);

            assert.deepEqual(args, {
                'flags': {
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                'input': `${process.cwd()}/src`
            });

        });

        it('parseCmdLineArgs with both valid and invalid arguments', () => {

            const args = parseCmdLineArgs([
                '--flag',
                '-f',
                'no-reply@test.com',
                '-t',
                'no-reply@test.com',
                '-s',
                'Test email',
                '--title'
            ]);

            assert.deepEqual(args, {
                'flags': {
                    '--flag': true,
                    '--title': true,
                    '-f': 'no-reply@test.com',
                    '-s': 'Test email',
                    '-t': 'no-reply@test.com'
                },
                'input': process.cwd()
            });

        });

        it('parseCmdLineArgs with help flag', () => {

            const args = parseCmdLineArgs([
                '--help'
            ]);

            assert.deepEqual(args, {
                'flags': {
                    '--help': true
                },
                'input': process.cwd()
            });

        });

        it('parseCmdLineArgs with version flag', () => {

            const args = parseCmdLineArgs([
                '--version'
            ]);

            assert.deepEqual(args, {
                'flags': {
                    '--version': true
                },
                'input': process.cwd()
            });

        });

        it('parseCmdLineArgs with no arguments', () => {

            const args = parseCmdLineArgs();

            assert.deepEqual(args, {
                'flags': {},
                'input': `${process.cwd()}/test/specs`
            });

        });

    });

});
