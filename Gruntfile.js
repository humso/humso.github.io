module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // Set up variables for app source and app destination
    app: {
      scss_src:     'src/scss',
      img_src:      'src/images',
      js_src:       'src/js',
      assets_dest:  'dist/assets',
      banner:       '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      archive:      '<%= pkg.name %>-v<%= pkg.version %>'
    },


    // Compile Sass
    sass: {
      dist: {
          options: {
              lineNumbers: true,
              style: 'expanded',
              sourcemap: 'none'
          },
          files: [{
              expand: true,
              cwd: '<%= app.scss_src %>',
              src: ['*.scss'],
              dest: '<%= app.assets_dest %>',
              ext: '.css'
          }]
        }
      },

      // Minify css
      cssmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.assets_dest %>',
            src: ['*.css'],
            dest: '<%= app.assets_dest %>',
            ext: '.css'
          }]
        }
      },

      // Minify Images
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.img_src %>',
            src: ['**/*.{png,jpg,gif}'],
            dest: '<%= app.assets_dest %>'
          }]
        }
      },

      // Concatenate javascript from the plugins folder
      // Also possible to select the order of the files
      concat: {
        options: {
          stripBanners: false,
          banner: '<%= app.banner %>',
        },
        dist: {
          src: ['<%= app.js_src %>/*.js', '<%= app.js_src %>/scripts.js' ],
          dest: '<%= app.assets_dest %>/scripts.js'
        }
      },

      // Uglify - a JavaScript parser/compressor/beautifier
      uglify: {
        options: {
          banner: '<%= app.banner %>'
        },
        dist: {
          files: [{
            expand: true,
            cwd: '<%= app.assets_dest %>',
            src: '**/*.js',
            dest: '<%= app.assets_dest %>'
          }]
        }
      },


      // Watch magic when you type grunt watch in the terminal
      // Also possible to reload the browser
      watch: {
        scripts: {
          files: ['<%= app.js_src %>/*.js'],
          tasks: ['concat']
        },
        styles: {
          files: [ '<%= app.scss_src %>/**/*.scss'],
          tasks: [ 'sass' ]
        },
        images: {
          files: [ '<%= app.img_src %>/*.{png,jpg,gif'],
          tasks: [ 'newer:imagemin' ]
        }
      },


      // Live CSS Reload & Browser Syncing
      browserSync: {
        dist: {
          src : ['<%= app.assets_dest %>/*.css', 'index.html']
        },
        options: {
          watchTask: true,
          server: './'
        }
      },


      // Compress Files, mainly for a Shopify project
      compress: {
        main: {
          options: {
            archive: '<%= app.archive %>.zip'
          },
          expand: true,
          cwd: 'dist',
          src: ['**/*'],
          dest: ''
        }
      }

  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-compress');


  // Builds with default configuration only for development
  grunt.registerTask('default', ['browserSync', 'watch']);
  // Builds with minified, compressed configuration for distribution
  grunt.registerTask('dist', ['sass', 'cssmin', 'imagemin', 'concat', 'uglify']);

};
