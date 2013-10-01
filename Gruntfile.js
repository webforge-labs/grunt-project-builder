/*
 * grunt-shimney-sweeper
 * https://github.com/webforge-labs/grunt-shimney-sweeper
 *
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    clean: {
      test: ['tmp-output', 'tmp']
    },
    
    build: {
      cms: {
        options: {
          src: 'fixtures/src',
          dir: "tmp-output/js-built",

          requirejs: {
            modules: [
              {
                name: "boot",
                include: [
                  "Psc/UI/GridPanel",

                  'Psc/UI/SingleImage',
                  'Psc/UploadService',

                  'Psc/UI/DateTimePicker',
                  
                  'Psc/UI/jqx/I18nWrapper',
                  'Psc/UI/Navigation',

                  'Psc/UI/DropBox',
                  'Psc/UI/ComboDropBox',
                  'Psc/UI/PagesMenu',

                  'Psc/UI/LayoutManager/Control' // muss in diesen layer, weil es asynchron zu layoutmanager geladen wird
                ]
              },
              {
                name: 'Psc/UI/LayoutManager',
                exclude: ['boot']
              }
            ]
          }
        }
      },

      options: {
        'psc-cms-js-src': 'D:\\www\\psc-cms-js',
        tmp: 'Umsetzung/base/cache/js-tmp',
      }
    },

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
         bump: true,
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
