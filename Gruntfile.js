
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
                    },
                    {
                        expand: true,
                        cwd: 'src/js/test/',
                        src: ['**'],
                        dest: 'public/js/test',
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
                "src/js/test/*.js",
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
                    'public/js/applications.js':['src/js/*.js']
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

        watch: {
            options: {
                livereload: true,
            },

            js: {
                files: ['src/js/*.js','src/js/test/*.js'],
                tasks: ['jshint','copy','uglify']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('test',['jshint','copy','bower','uglify','mochaTest']);
    grunt.registerTask('default',['jshint','copy','bower','uglify']);
};
