$(function(){
    /**
     * 自己创建一个商品数据集合
     * 点击分类时实现商品的切换
     * 切换之后已经选择好的数量需要记录
     */
    var arrAllProducts = [
        {
            type:"炒菜",
            products:[
                {id:10001,name:"回锅肉",img:"...",price:26.00,desc:"川菜馆必点"},
                {id:10002,name:"鱼香肉丝",img:"...",price:28.00,desc:"川菜馆必点"},
                {id:10003,name:"宫保鸡丁",img:"...",price:20.00,desc:"川菜馆必点"}
            ]
        },
        {
            type:"商务套餐",
            products:[
                {id:20001,name:"荷叶饭",img:"...",price:12.00,desc:"好吃的荷叶饭"},
                {id:20002,name:"奢华版荷叶饭",img:"...",price:15.00,desc:"精装版"}
            ]
        }
    ]

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
        var sumCount = 0 //总数量
        var sumPrice = 0 //总价格
        arrAllCart.forEach(function(item){
            sumCount += item.count
            sumPrice += (item.count * item.price)
        })
        $('#sumPCount').text(sumCount)
        $('#sumPPrice').text(sumPrice.toFixed(2)) //显示的时候保留两位小数点
    }
})