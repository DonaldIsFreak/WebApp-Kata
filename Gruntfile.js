
module.exports = function(grunt) {
	grunt.initConfig({
		pkg:	grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			src: [
				"server.js",
				"routes/*.js",
				"models/*.js",
				"public/js/*.js",
				"test/*.js"
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default',['jshint']);
};
