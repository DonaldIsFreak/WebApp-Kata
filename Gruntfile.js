
module.exports = function(grunt) {
	grunt.initConfig({
		pkg:	grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			src: [
				"server.js",
				"app/*/*.js",
				"public/js/*.js",
				"test/*.js"
			]
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

	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('default',['jshint','mochaTest']);
};
