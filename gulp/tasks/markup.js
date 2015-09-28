var gulp = require('gulp');
var newer = require('gulp-newer');
var config = require('../config').markup;
var reload = require('../util/bs').reload;

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(newer(config.dest))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}));
});
