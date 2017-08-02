'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    cssImport = require('gulp-cssimport'),
    cssNano = require('gulp-cssnano');

var path = {
    sprites : {
        images: 'src/sprite/*.*',
        buildPath: 'src/img/',
        cssPath: 'src/css/'
    },
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        pic: 'build/pic/',
        video: 'build/video/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        pic: 'src/pic/**/*.*',
        fonts: 'src/fonts/**/*.*',
        video: 'src/video/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.*',
        img: 'src/img/**/*.*',
        pic: 'src/pic/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

//   TASKS ------------------

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(plumber()) // Ловим ошибки
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber()) // Ловим ошибки
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        //.pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber()) // Ловим ошибки
        .pipe(sass()) //Скомпилируем
        .pipe(cssImport())
        .pipe(prefixer())
        .pipe(cssNano())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(plumber()) // Ловим ошибки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('pictures:build', function () {
    gulp.src(path.src.pic) //Выберем наши картинки
        .pipe(plumber()) // Ловим ошибки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.pic));
});

gulp.task('sprite:build', function() {
    var spriteData =
        gulp.src(path.sprites.images) // путь, откуда берем картинки для спрайта
            .pipe(plumber()) // Ловим ошибки
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
            }));

    spriteData.img.pipe(gulp.dest(path.sprites.buildPath)); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(path.sprites.cssPath)); // путь, куда сохраняем стили
});

// WATCHER -----------------------

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.pic], function(event, cb) {
        gulp.start('pictures:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'image:build',
    'pictures:build'
]);

gulp.task('default', ['build', 'watch']);
