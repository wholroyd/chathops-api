/**
 * Created by William.Holroyd on 7/4/2015.
 */

// This was borrowed from the chathops-ui project and has not been modified for this project/repository
    
var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    minifyHTML = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    del = require('del');

var paths  = {
    scripts: 'js/**.js',
    images: 'img/**/*.*',
    index: 'index.html',
    fonts: 'fonts/**.*',
    fonts_bower: 'bower_components/**/*.{ttf,woff,eof,svg}',
    styles: 'less/*.less',
    styles_theme: 'less/themes/*.less',
    styles_bower: 'bower_components/**/*.css'
};

/*
 * Serve the files out of /dist
 */
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

/*
 * Reload the web server
 */
gulp.task('livereload', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});

/*
 * Cleans the distribution directory
 */
gulp.task('clean', ['clean-css', 'clean-images', 'clean-fonts', 'clean-dist']);

gulp.task('clean-css', function (cb) {
    del('dist/css/*', cb);
});

gulp.task('clean-images', function (cb) {
    del('dist/img/*', cb);
});

gulp.task('clean-fonts', function (cb) {
    del('dist/fonts/*', cb);
});

gulp.task('clean-dist', function (cb) {
    del('dist/*', cb);
});

/*
 * Copy fonts to dist directory
 */

gulp.task('copy-assets', ['copy-index', 'copy-images', 'copy-fonts']);

gulp.task('copy-index', function () {
    return gulp.src(paths.index)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-fonts', function () {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'));

    return gulp.src(paths.fonts_bower)
        .pipe(gulp.dest('dist/fonts'));
});

/**
 * Compile less
 */
gulp.task('less', function () {
    gulp.src(paths.styles)
        .pipe(less())
        .pipe(concat('chathops-base.css'))
        .pipe(gulp.dest('dist/css'));

    gulp.src(paths.styles_theme)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));

    return gulp.src('dist/css/chathops-base.css')
        .pipe(minifyCss())
        .pipe(rename('chathops-base.min.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('usemin', function () {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/*
 * Watch src and execute tasks when changes are made
 */
gulp.task('watch', function () {
    gulp.watch([paths.fonts], ['copy-fonts', 'livereload']);
    gulp.watch([paths.fonts_bower], ['copy-fonts']);
    gulp.watch([paths.index], ['usemin', 'livereload']);
    gulp.watch([paths.scripts], ['usemin', 'livereload']);
    gulp.watch([paths.styles], ['less', 'usemin', 'livereload']);
    gulp.watch([paths.styles_theme], ['less', 'usemin', 'livereload']);
    gulp.watch([paths.styles_bower], ['less', 'usemin', 'livereload']);
    gulp.watch([paths.images], ['copy-images', 'livereload']);
});

/*
 * Copy assets and compile less.
 */
gulp.task('build', ['less', 'usemin', 'copy-assets']);

gulp.task('default', ['build', 'connect', 'livereload', 'watch']);