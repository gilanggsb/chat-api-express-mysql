module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      default: {
        files: ['./src/**/*.js'],
        tasks: ['express:server'],
        options: {
          spawn: false
        }
      }
    },
    express: {
      server: {
        options: {
          script: './app.js'
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:server','watch:default']);
};