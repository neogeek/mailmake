module.exports = function (grunt) {

    'use strict';

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-doxdox');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        doxdox: {

            readme: {

                input: 'lib/mailmake.js',
                output: 'README.md',
                config: {
                    title: '<%= pkg.name %>',
                    description: '<%= pkg.description %>',
                    layout: 'templates/README.hbs'
                }

            }

        },

        watch: {

            default: {
                files: ['lib/mailmake.js'],
                tasks: ['doxdox']
            }

        }

    });

    grunt.registerTask('default', ['doxdox']);

};
