var gulp = require('gulp')
    , gutil = require('gulp-util')
    , minifycss = require('gulp-minify-css')
    , minifyhtml = require('gulp-minify-html')
    , processhtml = require('gulp-processhtml')
    , jshint = require('gulp-jshint')
    , uglify = require('gulp-uglify')
    , connect = require('gulp-connect')
    , rimraf = require('gulp-rimraf')
    , gulpif = require('gulp-if')
    , streamify = require('gulp-streamify')
    , source = require('vinyl-source-stream')
    , browserify = require('browserify')
    , watchify = require('watchify')
    , watching = false
    , paths;

paths = {
    assets: [
        'src/assets/**/*',
    ],
    css:    [
        'src/css/*.css'
    ],
    libs:  [
        'src/bower_components/phaser-official/build/phaser.js',
        'src/bower_components/jquery/dist/jquery.js',
        'src/bower_components/i18next/i18next.js'
    ],
    locales: [
        'src/locales/**/*',
    ],
    js:     ['src/js/*.js', 'src/js/**/*.js'],
    entry: './src/js/main.js',
    dist:  './dist/'
};

gulp.task('compile', ['clean'], function () {
    var bundler = watching ? watchify(browserify(paths.entry, watchify.args)) : browserify(paths.entry);

    var bundlee = function() {
        return bundler.bundle()
            .pipe(source('main.js'))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(gulpif(!watching, streamify(uglify({outSourceMaps: false}))))
            .pipe(gulp.dest(paths.dist + 'js'))
            .on('error', gutil.log);
    };

    if(watching) {
        bundler.on('update', bundlee);
    }

    return bundlee();
});

gulp.task('clean', function () {
  return gulp.src(paths.dist, {read: false})
    .pipe(rimraf({ force: true }))
    .on('error', gutil.log);
});

gulp.task('copylibs', ['clean'], function () {
    gulp.src(paths.libs)
        .pipe(gulpif(!watching, uglify({outSourceMaps: false})))
        .pipe(gulp.dest(paths.dist + 'js/lib'))
        .on('error', gutil.log);
});

gulp.task('copy', ['clean'], function () {
    gulp.src(paths.assets)
        .pipe(gulp.dest(paths.dist + 'assets'))
        .on('error', gutil.log);
    gulp.src(paths.locales)
        .pipe(gulp.dest(paths.dist + 'locales'))
        .on('error', gutil.log);
});

gulp.task('minifycss', ['clean'], function () {
    gulp.src(paths.css)
        .pipe(gulpif(!watching, minifycss({
            keepSpecialComments: 0,
            removeEmpty: true
        })))
        .pipe(gulp.dest(paths.dist + 'css'))
        .on('error', gutil.log);
});

gulp.task('processhtml', ['clean'], function() {
    gulp.src('src/index.html')
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths.dist))
        .on('error', gutil.log);
});

gulp.task('minifyhtml', ['processhtml'], function() {
    gulp.src('dist/index.html')
        .pipe(minifyhtml())
        .pipe(gulp.dest(paths.dist))
        .on('error', gutil.log);
});

gulp.task('lint', function() {
    gulp.src(paths.js)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .on('error', gutil.log);
});

gulp.task('html', ['build'], function(){
    gulp.src('dist/*.html')
        .pipe(connect.reload())
        .on('error', gutil.log);
});

gulp.task('connect', function () {
    connect.server({
        root: [__dirname + '/dist'],
        port: 9000,
        livereload: true
    });
});

gulp.task('watch', function () {
    watching = true;
    return gulp.watch(['./src/index.html', paths.css, paths.js, paths.assets, paths.locales], ['build', 'lint', 'html']);
});

gulp.task('default', ['connect', 'watch', 'build']);
gulp.task('build', ['copy', 'copylibs', 'compile', 'minifycss', 'processhtml', 'minifyhtml']);
