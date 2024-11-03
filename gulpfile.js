const gulp = require("gulp");
const htmlmin = require("gulp-html-minifier-terser");
const csso = require("gulp-csso");
const terser = require("gulp-terser");

const paths = {
  input: {
    assets: "src/public/**/*",
    html: "src/public/**/*.html",
    css: "src/public/**/*.css",
    js: "src/public/**/*.js",
  },
  output: "dist/public",
};

const { input, output } = paths;
const { series, parallel } = gulp;

function copyAssets() {
  return gulp.src(input.assets).pipe(gulp.dest(output));
}

function minHtml() {
  return gulp
    .src(input.html)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(gulp.dest(output));
}

function minCss() {
  return gulp.src(input.css).pipe(csso()).pipe(gulp.dest(output));
}

function minJs() {
  return gulp.src(input.js).pipe(terser()).pipe(gulp.dest(output));
}

exports.build = series(copyAssets, parallel(minHtml, minCss, minJs));
