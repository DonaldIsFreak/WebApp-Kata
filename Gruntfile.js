
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**'],
                        dest: 'public/',
                    },
                    {
                        expand: true,
                        cwd: 'vendor/',
                        src: ['**'],
                        dest: 'public/',
                    }
                ]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                "server.js",
                "app/*/*.js",
                "src/js/*.js",
                "test/*.js"
            ]
        },

        bower: {
            install: {
            }
        },

        mochaTest: {
            test: {
                options: 'spec'
            },
            src: [
                'test/**/*.js'
            ]
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test',['copy','bower','mochaTest']);
    grunt.registerTask('default',['copy','bower','jshint']);
};
