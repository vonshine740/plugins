'use strict';

module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,

		jshint: {
			files: ['Gruntfile.js', 'app/sys/**/*.js', 'app/sys/*.js', 'app/plugins/**/**/*.js', 'dist/sys/**/*.js', 'dist/sys/*.js', 'dist/plugins/**/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},

		uglify: {
			files: {
				'<%= dist %>/plugins/**/js/*.min.js': ['<%= app %>/plugins/**/js/*.js'],
				'<%= dist %>/app/sys/**/*.min.js': ['<%= app %>/sys/**/*.js']
			}
		},

		copy: {
			files: {
				'<%= dist %>/plugins/**/js/*.js': ['<%= app %>/plugins/**/js/*.js'],
				'<%= dist %>/app/sys/**/*.js': ['<%= app %>/sys/**/*.js']
			}
		},

		clean: {
			dist: {
				src: '<%= config.dist %>/index.html'
			}
		}
	});
};