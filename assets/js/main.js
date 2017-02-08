$(function(){
    $('.left li').click(function(){
        $(this).parent().find('li').removeClass('cur') //删除所有li的cur样式
        $(this).addClass('cur') //为当前标签添加样式
    })
})