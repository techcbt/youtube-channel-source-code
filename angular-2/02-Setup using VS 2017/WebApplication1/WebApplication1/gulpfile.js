var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps');

gulp.task("default", function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("app"));
});

gulp.task('dev', function () {
    gulp.watch('app/**/*.ts', ['default']);
});
