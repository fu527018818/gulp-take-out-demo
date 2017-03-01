var gulp = require('gulp')//gulp模块
var browserSync = require('browser-sync')//浏览器自动刷新

var uglify = require('gulp-uglify')//引入js压缩插件
var concat = require('gulp-concat') //代码合并
var htmlmin = require('gulp-minify-html') //html压缩
var cheerio = require('gulp-cheerio') // 把html代码转换为$对象的形式 实现link和script标签的替换
var cssmin = require('gulp-minify-css') //css压缩
var order = require('gulp-order') //排序
const babel = require('gulp-babel') //babel使用

var postcss    = require('gulp-postcss') //postcss引入
var autoprefixer = require('autoprefixer') //css加前缀

gulp.task('default',['build'],function(){
    browserSync.init({
        server:'./'
    })
    gulp.watch('./*.*',browserSync.reload) //监听根目录下的文件
    gulp.watch('./assets/**/*.*',browserSync.reload) //监听当前根目录下所有文件的变化,自动刷新浏览器
})

//生成发行版本的文件
//生成在build build/css build/js
gulp.task('build',['mincss','minjs','minhtml'])

// html文件压缩合并生成文件
gulp.task('minhtml',function(){
    gulp.src('./index.html')
        .pipe(htmlmin())
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('body').append('<script src="js/main.js"></script>');
            $('head').append('<link rel="stylesheet" href="css/dist.css">');
        }))
        .pipe(gulp.dest('./build'))

    gulp.src('./order.html')
        .pipe(htmlmin())
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('body').append('<script src="js/order.js"></script>');
            $('head').append('<link rel="stylesheet" href="css/dist.css">');
        }))
        .pipe(gulp.dest('./build'))
})

// gulp.task('minjs',function(){
//     gulp.src('./assets/js/*.js')
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./build/js'))
// })

// 把es6语法转译为es2015 使js能够兼容老版本的浏览器
gulp.task('babel',function(){
    gulp.src('./assets/js/*.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(gulp.dest('./assets/js/es2015'))
})
// js文件压缩合并生成文件

//.pipe(order([],{base:'./'})) //排序时添加第二个参数保证排序顺序可用  
gulp.task('minjs',['babel'],function(){
    gulp.src(['./assets/lib/*.js','./assets/js/es2015/common.js','./assets/js/es2015/main.js'])
        .pipe(order(['assets/lib/jquery.min.js','assets/lib/jquery.cookie.min.js','assets/js/es2015/common.js','assets/js/es2015/main.js'],{base:'./'}))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))

    gulp.src(['./assets/lib/*.js','./assets/js/es2015/common.js','./assets/js/es2015/order.js'])
        .pipe(order(['assets/lib/jquery.min.js','assets/lib/jquery.cookie.min.js','assets/js/es2015/main.js','assets/js/es2015/order.js'],{base:'./'}))
        .pipe(concat('order.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
})
// css压缩合并生成文件
gulp.task('mincss', function () {
    gulp.src('assets/css/*.css')
        .pipe(concat('dist.css'))
        .pipe(postcss([
            autoprefixer(
                {
                    browsers:['last 2 versions','Firefox > 20','iOS 7'],
                    cascade:true //是否美化代码
                })
            ]))        
        .pipe(cssmin())
        .pipe(gulp.dest('./build/css'));
});