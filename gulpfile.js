const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const htmlbeautify = require('gulp-html-beautify');
const removeEmptyLines = require('gulp-remove-empty-lines');
const rename = require("gulp-rename");
const { data_contents, data_topics, data_courses } = require('./data');

const config_template = {
    base_url: 'http://127.0.0.1:5500/dist/',
    asset_url: 'http://127.0.0.1:5500/assets/',
    site_name: 'Cendhi LMS',
    data_topics: data_topics,
    data_courses: data_courses,
    data_contents: data_contents,
}

const compile = (fn) => {
    gulp.src(['./src/**/*.njk', '!./src/_**/*.njk'])
        .pipe(nunjucks.compile(config_template))
        .pipe(htmlbeautify())
        .pipe(removeEmptyLines())
        .pipe(rename(function (path) {
            path.extname = ".html"
        }))
        .pipe(gulp.dest('dist'))
    fn()
}

exports.default = compile
exports.watch = gulp.series(compile, () => {
    gulp.watch(['./src/**/*.njk'], compile)
}) 