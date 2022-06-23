import gulp from "gulp";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import del from "del";
import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import babel from "gulp-babel";
import uglify from "gulp-uglify"; // зменшує файл
import concat from "gulp-concat";
import sourcemaps from 'gulp-sourcemaps'; // можна змінити шлях до стилів чи джаваскріпта. index.html буде підтягувати файли з якими ми працюємо, а не зкомпільовані - ті що на виході   (від dist до src)
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import fileinclude from "gulp-file-include";

const sass = gulpSass(dartSass);

const paths = {
  html: {
    src: "./*.html",
    dest: "dist/"
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img'
  }
};

function html() {
  return gulp.src(paths.html.src)
    .pipe(fileinclude())
    .pipe(gulp.dest(paths.html.dest))
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true
		}))
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
  )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, {
      sourcemaps: true,
  })
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest))
}

function img() {
  return gulp.src(paths.images.src)
		.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimization: 5
        }))
		.pipe(gulp.dest(paths.images.dest))
}

function clean() {
  return del(["dist"]);
}

function watch() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
}

const dev = gulp.series(clean, gulp.parallel(html, styles, scripts, img), watch);

gulp.task('default', dev);
