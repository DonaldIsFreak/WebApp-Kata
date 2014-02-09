
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:    grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                   {
                        expand: true,
                        cwd: 'vendor/',
                        src: ['**'],
                        dest: 'public/',
                    },
                    {
                        expand: true,
                        cwd: 'src/css/',
                        src: ['**'],
                        dest: 'public/css',
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

        concat: {
            dist: {
                src: ['src/js/*'],
                dest: 'public/js/applications.js'
            }
        },

        uglify: {
            target: {
                options: {
                },
                files: {
                    'public/js/applications.js':['src/js/*']
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test',['copy','bower','jshint','uglify','mochaTest']);
    grunt.registerTask('default',['copy','bower','jshint','uglify']);
};
