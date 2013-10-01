/*
 * grunt-shimney-sweeper
 * https://github.com/webforge-labs/grunt-shimney-sweeper
 *
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    release: {
       options: {
         bump: false,
         add: true, 
         commit: true,
         tag: true, 
         push: true, 
         pushTags: true, 
         npm: true, 
         commitMessage: 'release <%= version %>',
         tagMessage: 'Version <%= version %>'
       }
     }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test', ['jshint']);
};
