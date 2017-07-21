var gulp 		= require('gulp'),
  jshint 		= require('gulp-jshint'),
  nodemon 	= require('gulp-nodemon');


gulp
	.task('scripts', scripts)
	.task('watch', watch)
	.task('default', monitor);


function scripts() {
	return gulp.src(['index.js', 'app/*.js', 'app/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
}


function watch() {
	gulp.watch(['index.js', 'app/*.js', 'app/**/*.js'], ['scripts']);
}


function monitor() {
	nodemon({
		script : 'index.js',
		ext : 'js less html'
	})
	// .on('start', ['watch'])
	.on('change', ['watch'])
	.on('restart', function() {
		console.log('Restarted!');
	})
}