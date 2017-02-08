$(function(){
    //左侧导航效果切换
    $('.left li').click(function(){
        $(this).parent().find('li').removeClass('cur') //删除所有li的cur样式
        $(this).addClass('cur') //为当前标签添加样式
    })
    //点击商品购买数量增加按钮
    $('.p-add').click(function(){
        var tmpId = $(this).data('pid')
        var $tagPNum = $('#pNum'+tmpId) //获取当前商品的商品数量标签
        var tmpNum = Number($tagPNum.data('pnum')) //把当前的数量转换为数字
        tmpNum += 1 //修改数量值
        $tagPNum.data('pnum',tmpNum) //修改当前订购数量的值
        $tagPNum.text(tmpNum) //修改显示的数量的值
    })
    //数量减少时操作
    $('.p-reduce').click(function(){
        var tmpId = $(this).data('pid')
        var $tagPNum = $('#pNum'+tmpId) //获取当前商品的商品数量标签
        var tmpNum = Number($tagPNum.data('pnum')) //把当前的数量转换为数字
        tmpNum -= 1 //修改数量值
        if(tmpNum<0){
            return
        }
        $tagPNum.data('pnum',tmpNum) //修改当前订购数量的值
        $tagPNum.text(tmpNum) //修改显示的数量的值
    })
})