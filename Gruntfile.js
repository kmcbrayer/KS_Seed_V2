//ks_seed personal framework
'use strict';

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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
        url: 'http://www.devsite.com:<%= express.options.port %>'
      }
    },
    watch: {
      js: {
        files: ['app/**/*.js'],
        tasks: ['newer:jshint:all'],
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
  
  grunt.registerTask('serve', function (target) {

    grunt.task.run([
      'bower-install',
      'express:dev',
      'open',
      'watch'
    ]);
  });
  grunt.registerTask('test', [
    'karma'
  ]);
}