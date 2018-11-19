var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var historyFallback = require('connect-history-api-fallback');
var connect = require('gulp-connect');
var server = require('gulp-server-livereload');
var autoprefixer = require('gulp-autoprefixer');
var sequence = require('gulp-sequence');
var webpack = require('webpack');
var webpackStream = require('webpack2-stream-watch');
var WebpackBabiliPlugin = require("babili-webpack-plugin");
var path = require('path');
var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var env = process.env.NODE_ENV || 'local';
var shouldWatchJs = false;

gulp.task('styles', function() {
	gulp.src('src/styles/main.scss')
	.pipe(sass())
	.pipe(autoprefixer(autoprefixerOptions))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('enable-watch:js', function() {
	return (shouldWatchJs = true);
});

gulp.task('js', function() {
	return gulp.src('./src/app.js')
		.pipe(webpackStream({
			watch: shouldWatchJs,
			cache: true,
			entry: './src/app.js',
			output: {
				filename: 'app.js'
			},
			devtool: 'source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						loader: 'babel-loader',
						query: {
							presets: [
								['es2015', {
                      'es2015': {
                          loose: true,
                          modules: false
                      }
                  }],
								'react'
							],
							plugins: []
						},
						include: [
							path.join(__dirname, 'src')
						],
						exclude: [
							'node_modules',
							'bower_components'
						]
					}
				]
			},
			plugins: (env === 'local'
          ? []
          : [
              new WebpackBabiliPlugin(),
              new webpack.DefinePlugin({
                  'process.env': {
                      NODE_ENV: JSON.stringify(env)
                  }
              })
          ]
      ),
			resolve: {
				modules: [
					path.join(__dirname, 'src'),
					'node_modules'
				],
				extensions: [
					'.js'
				]
			}
		}, webpack))
		.pipe(gulp.dest('./build/js'))
	;
});

gulp.task('assets', function() {
  gulp.src('src/assets/*/*')
  .pipe(gulp.dest('./build/assets'))
});

gulp.task('connect', function () {
  var isLocal = (env === 'local') ? true : false;
  connect.server({
    root: ['build'],
    port: 3000,
    base: 'http://localhost',
    livereload: isLocal,
    middleware: function(connect, opt) {
      return [
        historyFallback({})
      ]
    }
  });
});

gulp.task('watch:styles', function() {
	gulp.watch('src/styles/**/*.scss', ['styles'])
});

gulp.task('watch:js', sequence(['enable-watch:js'], ['js']));

gulp.task('watch', sequence(['watch:js', 'watch:styles', 'connect']));

gulp.task('build', sequence(['styles', 'js', 'assets']));

gulp.task('default', sequence(['build'], ['watch']));
