'use strict';

<<<<<<< HEAD
var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    through = require('through'),
    gutil = require('gulp-util'),
    plugins = gulpLoadPlugins(),
    coffee = require('gulp-coffee'),
    paths = {
        js: ['./*.js', 'config/**/*.js', 'gulp/**/*.js', 'tools/**/*.js', 'packages/**/*.js', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**', '!packages/**/assets/**/js/**'],
        html: ['packages/**/*.html', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
        css: ['packages/**/*.css', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**', '!packages/core/**/public/assets/css/*.css'],
        less: ['packages/**/*.less', '!packages/**/_*.less', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
        sass: ['packages/**/*.scss', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
        coffee: ['packages/**/*.coffee', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**']
    };

/*var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'devServe', 'watch'];*/

var defaultTasks = ['coffee','clean', 'less', 'sass', 'csslint', 'devServe', 'watch'];

gulp.task('env:development', function () {
    process.env.NODE_ENV = 'development';
});

gulp.task('jshint', function () {
    return gulp.src(paths.js)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
        .pipe(count('jshint', 'files lint free'));
});

gulp.task('csslint', function () {
    return gulp.src(paths.css)
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
        .pipe(count('csslint', 'files lint free'));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(plugins.less())
        //.pipe(console.log(plugins.less()))
        .pipe(gulp.dest('./packages'));
});
=======
/* jshint -W040 */

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var through = require('through');
var gutil = require('gulp-util');
var plugins = gulpLoadPlugins();
var path = require('path');
var paths = {
  js: ['./*.js', 'config/**/*.js', 'gulp/**/*.js', 'tools/**/*.js', 'packages/**/*.js', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**', '!packages/**/assets/**/js/**'],
  html: ['packages/**/*.html', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
  css: ['packages/**/*.css', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
  less: ['packages/**/*.less', '!packages/**/_*.less', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**'],
  sass: ['packages/**/*.scss', '!packages/**/node_modules/**', '!packages/**/assets/**/lib/**']
};
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

/** General watch/restart flow **/
// .less / .scss files are watched by less/sass and produce .css files
// .js / .css files are watched by nodemon, invoke webpack,csslint, and jshint as needed before restarting and invoking livereload after
// .html files are watched by livereload explicitly

var startupTasks = ['devServe'];

gulp.task('development', startupTasks);
gulp.task('devServe', ['env:development', 'webpack:build-dev', 'jshint', 'csslint', 'watch'], devServeTask);
gulp.task('env:development', envDevelopmentTask);
gulp.task('webpack:build-dev', ['sass', 'less'], webpackBuild);
gulp.task('sass', sassTask);
gulp.task('less', lessTask);
gulp.task('jshint', jshintTask);
gulp.task('csslint', csslintTask);

gulp.task('webpack:rebuild-dev', webpackBuild);
gulp.task('watch', watchTask);
gulp.task('livereload', livereloadTask);

////////////////////////////////////////////////////////////////////

// modify some webpack config options
var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(devConfig);

function webpackBuild (callback) {
  // run webpack
  devCompiler.run(function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpackBuild', err);
    }
    gutil.log('webpackBuild', stats.toString({
      colors: true
    }));
    callback()
  })
}

function jshintTask (callback) {
  gulp.src(paths.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(count('jshint', 'files lint free'));
  callback();
}

function envDevelopmentTask (callback) {
  process.env.NODE_ENV = 'development';
  callback();
}

function csslintTask () {
  return gulp.src(paths.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.formatter())
    .pipe(count('csslint', 'files lint free'));
}

function lessTask () {
  return gulp.src(paths.less)
    .pipe(plugins.less())
    .pipe(gulp.dest('./packages'));
}
>>>>>>> linnovate/master

function sassTask () {
  return gulp.src(paths.sass)
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest('./packages'));
}

<<<<<<< HEAD
    plugins.nodemon({
        script: 'server.js',
        ext: 'html js',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: [
      'node_modules/',
      'bower_components/',
      'logs/',
      'packages/*/*/public/assets/lib/',
      'packages/*/*/node_modules/',
      '.DS_Store', '**/.DS_Store',
      '.bower-*',
      '**/.bower-*',
      '**/tests'
    ],
        nodeArgs: ['--debug'],
        stdout: false
    }).on('readable', function () {
        this.stdout.on('data', function (chunk) {
            if (/Mean app started/.test(chunk)) {
                setTimeout(function () {
                    plugins.livereload.reload();
                }, 500);
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('coffee', function () {
    gulp.src(paths.coffee)
        .pipe(coffee({
            bare: true
        }).on('error', gutil.log))
        .pipe(gulp.dest('./packages'));
});

gulp.task('watch', function () {
    plugins.livereload.listen({
        interval: 500
    });
=======
function devServeTask () {
  plugins.nodemon({
      script: 'server.js',
      ext: 'js css',
      env: {
        'NODE_ENV': 'development'
      },
      ignore: [
        'node_modules/',
        'bower_components/',
        'bundle/',                          // Causes infinite loop since webpack is tasked to run
        'logs/',
        'packages/*/*/public/assets/lib/',
        'packages/*/*/public/**/*.scss',    // Trigger off resulting css files not before scss finishes
        'packages/*/*/public/**/*.less',    // Trigger off resulting css files not before less finishes
        'packages/*/*/node_modules/',
        '.DS_Store', '**/.DS_Store',
        '.bower-*',
        '**/.bower-*',
        '**/tests'
      ],
      tasks: function (changedFiles) {
        var tasks = [];
        changedFiles.forEach(function (file) {
          if (path.extname(file) === '.css' && tasks.indexOf('csslint') === -1) {
            tasks.push('csslint');
          }
          if (path.extname(file) === '.js' && tasks.indexOf('jshint') === -1) {
            tasks.push('jshint');
          }
          if (path.extname(file) === '.js' || path.extname(file) === '.css' && tasks.indexOf('webpack:rebuild-dev') === -1) {
            tasks.push('webpack:rebuild-dev');
          }
        });
        return tasks;
      },
      nodeArgs: ['--debug'],
      stdout: false
    })
    .on('readable', function () {
      this.stdout.on('data', function (chunk) {
        if (/Mean app started/.test(chunk)) {
          setTimeout(function () {
            plugins.livereload.reload();
          }, 500)
        }
        process.stdout.write(chunk)
      });
      this.stderr.pipe(process.stderr)
    })
    .on('restart', function () {
      plugins.livereload.reload();
    });
}

function watchTask (callback) {
  plugins.livereload.listen({
    interval: 500
  });
>>>>>>> linnovate/master

  gulp.watch(paths.html, ['livereload']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.sass, ['sass']);
  callback();
}

function livereloadTask (callback) {
  plugins.livereload.reload();
  callback();
}

<<<<<<< HEAD
function count(taskName, message) {
    var fileCount = 0;

    function countFiles(file) {
        fileCount++; // jshint ignore:line
    }

    function endStream() {
        gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
        this.emit('end'); // jshint ignore:line
    }
    return through(countFiles, endStream);
}

gulp.task('development', defaultTasks);
=======
function count (taskName, message) {
  var fileCount = 0;

  function countFiles (file) {
    fileCount++;
  }

  function endStream () {
    gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
    this.emit('end');
  }

  return through(countFiles, endStream);
}
>>>>>>> linnovate/master
