var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var rename = require('gulp-rename');
var broswerSync = require('browser-sync').create();

//检查js脚本
gulp.task('lint', function() {
	gulp.src('app/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default')); //对代码进行报错提示
});

//编译sass,读取输出到新文件夹中
gulp.task('sass', function() {
	gulp.src('app/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'));
});

//合并压缩文件
gulp.task('scripts', function() {
	//读取JS文件，合并输出到新的目录，重命名压缩输出
	gulp.src('app/js/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('/dist'))
	.pipe(rename('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/dist'));

	//读取css文件合并压缩输出到新目录，重命名
	gulp.src('app/css/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('app/dist'))
	.pipe(rename('all.min.css'))
	.pipe(cssmin())
	.pipe(gulp.dest('app/dist'));
});

//监听文件并自动刷新
gulp.task('serve', function() {
	broswerSync.init({
		server: {
			baseDir: 'app'
		}
	});

	gulp.watch(['app/js/*.js', 'app/scss/*.scss', 'app/html/*.html'], function() {
		gulp.run('lint', 'sass', 'scripts');
		console.log('ok');
		broswerSync.reload();
	});
	// gulp.watch('app/js/*.js', ['lint']);
	// gulp.watch('app/scss/*.scss', ['sass']);
	// gulp.watch('app/html/*.html', ['scripts']);
});

//默认行为
gulp.task('default', function() {
	gulp.run('serve');
});