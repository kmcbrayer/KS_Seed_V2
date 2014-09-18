//ks_seed personal framework
'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'browserify': {
      watchClient:{
        src:['app/js/*.js'],
        dest: 'app/bundle.js',
        options: {
          external: ['jquery'],
          watch: true
        }
      }
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      js: {
        files: ['app/bundle.js'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          'app/{,*//*}*.{html,jade,css,js}',
          'app/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
        ],
      
        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'server.js',
          'lib/{,*//*}*.{js,json}'
        ],
        tasks: ['express:dev'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },
    //bower install command
    'bower-install': {
      app: {
        html: 'app/index.html',
        ignorePath: 'app/'
      }
    },
    //karma 
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });
  grunt.registerTask('default', ['browserify:watchClient']);
  
  grunt.registerTask('serve', function (target) {

    grunt.task.run([
      'bower-install',
      'browserify:watchClient',
      'express:dev',
      'open',
      'watch'
    ]);
  });
  grunt.registerTask('test', [
    'karma'
  ]);
}