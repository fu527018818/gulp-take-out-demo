var gulp = require('gulp')//gulp模块
var browserSync = require('browser-sync')//浏览器自动刷新

gulp.task('default',function(){
    browserSync.init({
        server:'./'
    })
    gulp.watch('./*.*',browserSync.reload) //监听根目录下的文件
    gulp.watch('./**/*.*',browserSync.reload) //监听当前根目录下所有文件的变化,自动刷新浏览器
})