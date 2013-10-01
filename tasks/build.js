module.exports = function(grunt) {

  var _ = grunt.util._;

  grunt.task.registerMultiTask('build', 'builds whole project js with psc-cms-js', function() {
    var target = this.target;
    var options = this.options({
      includeMain: []
    });

    var tasks = [], task = function(name, config) {
      grunt.config.set(name+'.'+target, config);
      tasks.push(name+':'+target);
    };

    task('clean', [options.tmp]);

    task('sweepout', {
      options: {
        packageRoot: options['psc-cms-js-src'],
        dir: options.tmp+'/lib',
        configFile: options.tmp+'/lib/shimney/config.js'
      }
    });

    task('copy', {
      files: [
         // das könnte auch sweepout machen (wenn psc-cms-js ein package ist)
         {expand: true, cwd: options['psc-cms-js-src'], src: ['lib/**', 'vendor/**', 'templates/**', 'img/**'], dest: options.tmp},

         {expand: false, src: [options['psc-cms-js-src']+'/vendor/require.min.js'], dest: options.tmp+'/require.js'}, 
         
         // src vom project selber
         {expand: true, cwd: options.src, src: ['**'], dest: options.tmp+'/lib/app'},
       ]
    });

    task('merge-configs', {
      options: {
        configFiles: [
          options['psc-cms-js-src']+'/lib/config.js',
          options.tmp+'/lib/shimney/config.js',
          options.src+'/boot.js'
        ],

        targetFile: options.tmp+'/lib/boot.js',

        modify: function(mergedConfig) {
          mergedConfig.urlArgs = "version="+(new Date()).getTime(); // benutze die zeit einmal für den ganzen build (das ist viel cooler als immer zu busten)
          mergedConfig.baseUrl =  '/js-built/lib';

          delete mergedConfig.paths.app;
        },

        template: 'resources/build-js/boot.template.js'
      }
    });

    task('requirejs', {
      options: _.merge({
        // include other modules that are not found with include
        dir: options.dir,

        appDir: options.tmp,
        baseUrl: "lib",
        mainConfigFile: options.tmp+"/lib/boot.js",

        removeCombined: true,
        keepBuildDir: false,

        uglify2: {
          mangle: true
        },

        findNestedDependencies: true,

        optimize: "uglify2",
        skipDirOptimize: true,
        optimizeCss: "none",
      }, options.requirejs)
    });

    grunt.task.run(tasks);
  });
};
