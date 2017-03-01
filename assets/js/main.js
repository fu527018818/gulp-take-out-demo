$(function(){

    //左侧导航效果切换
    $('.left li').click(function(){
        $(this).parent().find('li').removeClass('cur') //删除所有li的cur样式
        $(this).addClass('cur') //为当前标签添加样式
        
        var tmpType = $(this).find('a').data('type') //获取商品分类值
        var tmpPdata = arrAllProducts.find(function(item){
            if(item.type == tmpType){
                return item
            }
        })
        initPList(tmpPdata.products)//初始化页面html代码
    })

    var cook = $.cookie('shopcart') || '[]'
    var arrAllCart = JSON.parse(cook)  //所有的加入购物车的商品数据

    //点击商品购买数量增加按钮
    // $('.p-add').click(function(){
    //     //$(this)获取当前被点击的标签,把它转换为jQuery对象
    //     var tmpId = $(this).data('pid') //获取当前标签的 data-pid 属性值
    //     dalPNum('add',tmpId)
    // })
    //数量减少时操作
    // $('.p-reduce').click(function(){
    //     var tmpId = $(this).data('pid')
    //     dalPNum('reduce',tmpId)
    // })
    ///通过on添加事件 可以处理动态添加的标签
    $('#pList').on('click','.p-add', function () {
        var tmpId = $(this).data('pid')
        dalPNum('add',tmpId)
    })
    $('#pList').on('click','.p-reduce', function () {
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
        var sumCount = 0 //总数量
        var sumPrice = 0 //总价格
        arrAllCart.forEach(function(item){
            sumCount += item.count
            sumPrice += (item.count * item.price)
        })
        $('#sumPCount').text(sumCount)
        $('#sumPPrice').text(sumPrice.toFixed(2)) //显示的时候保留两位小数点
    }

    /**
     * 初始化页面html代码
     */
    function initPList(data){
        var strHtml = ''
        data.forEach(item=>{
            var tmpP = arrAllCart.find(function(p){
                return p.pid == item.id
            })
            var tmpCount = 0 //记录的商品数量值 默认为0 如果购物车中存在那么使用购物车中的值
            if(tmpP){
                tmpCount = tmpP.count
            }
            strHtml += `<li>
                        <div class="product-item">
                            <img class="product-img" src="${item.img}" alt="${item.name}">
                            <h4 class="product-title">${item.name}</h4>
                            <p class="product-desc">${item.desc}</p>    
                            <span class="product-price"><i>${item.price}</i>元</span>                        
                            <div class="action">
                                <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-reduce">-</a>
                                <span class="p-num" id="pNum${item.id}" data-pid="${item.id}" data-price="${item.price}" data-pnum="${tmpCount}">${tmpCount}</span>
                                <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-add">+</a>
                            </div>
                        </div>
                    </li>`
        })
        $('#pList').html(strHtml)  
    }
    initPList(arrAllProducts[0].products) //页面初始化的时候加载炒菜的数据

    //确认提交订单按钮点击事件
    $('.btn-sure-order').click(function(){
        //把所选择的购物商品信息加入cookie
        //此处使用jquery-cookie插件
        //地址为:https://github.com/carhartl/jquery-cookie
        //path      路径,此处设置在整个网站有效
        //expires   存在时间,此处设置有效期为7天
        $.cookie('shopcart',JSON.stringify(arrAllCart),{path:'/',expires:7})
        window.location.href = "order.html"//页面跳转
    })
})