$(function(){
    //左侧导航效果切换
    $('.left li').click(function(){
        $(this).parent().find('li').removeClass('cur') //删除所有li的cur样式
        $(this).addClass('cur') //为当前标签添加样式
    })

    var arrAllCart = [] //所有的加入购物车的商品数据

    //点击商品购买数量增加按钮
    $('.p-add').click(function(){
        //$(this)获取当前被点击的标签,把它转换为jQuery对象
        var tmpId = $(this).data('pid') //获取当前标签的 data-pid 属性值
        dalPNum('add',tmpId)
    })
    //数量减少时操作
    $('.p-reduce').click(function(){
        var tmpId = $(this).data('pid')
        dalPNum('reduce',tmpId)
    })
    /**
     * 根据操作类型和产品id修改购买数量值
     */
    function dalPNum(type,tmpId){
        var $tagPNum = $('#pNum'+tmpId) //获取当前商品的商品数量标签
        var tmpNum = Number($tagPNum.data('pnum')) //把当前的数量转换为数字
        if(type=="add"){
            tmpNum += 1 //修改数量值
        }
        else{
            tmpNum -= 1 //修改数量值
        }
        if(tmpNum<0){
            return
        }
        $tagPNum.data('pnum',tmpNum) //修改当前订购数量的值
        $tagPNum.text(tmpNum) //修改显示的数量的值
        var obj = {}
        obj.pid = tmpId
        obj.count = tmpNum
        obj.price = Number($tagPNum.data('price')) //取当前商品价格
        var pIndex = arrAllCart.findIndex(function(item){
            return item.pid == obj.pid
        })//获取当前商品在所有购物车商品数组中的索引值
        if(pIndex>-1){
            arrAllCart[pIndex] = obj //存在进行替换操作
        }
        else{
            arrAllCart.push(obj) //不存在进行插入操作
        }
        console.dir(arrAllCart)
    }
})