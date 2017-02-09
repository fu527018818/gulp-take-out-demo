//页面初始化的时候输出cookie数据
// console.log($.cookie("shopcart"))
$(function(){
    $('.order-detail').click(function(){
        $('.order-product').toggle(1500)
    })
    var shopCart = JSON.parse($.cookie("shopcart")) //格式化购物车中的数据
    var strHtml = ''
    var sumPrice = 0
    var sumCount = 0
    var allP = [] //用于存储所有的商品数据
    var totalArr = []  //用户订单信息数组及所相关商品 存储在localstrange存储
    arrAllProducts.forEach(function(item){
        allP = allP.concat(item.products) //商品数据拼接
    })
    // console.dir(allP)
    shopCart.forEach(function(item){
        //当前cookie中的商品id对应的商品信息
        var temProduct = allP.find(function(p){
            return p.id == item.pid
        })
        sumPrice += item.price * item.count
        sumCount += item.count
        strHtml += `<div class="o-p-item">
                    <ul>
                        <li><img class="o-p-img" src="${temProduct.img}" alt="${temProduct.name}"></li>
                        <li>${temProduct.name}</li>
                        <li class="o-p-price"><em>${item.price.toFixed(2)}</em>x${item.count}</li>
                    </ul>
                </div>`
    })
    $('.order-product').html(strHtml)
    $('#orderPrice').text(sumPrice.toFixed(2))
      
    $('#orderBtn').click(function(){
        var regMobile = /^1[3578]{1}\d{9}$/
        var name = $('#txtName').val().trim()
        var mobile = $('#txtMobile').val().trim()
        var address = $('#address').val().trim()
        var remarks = $('#remarks').val().trim()
        if(name==""){
            showTip("errTip","名字不能为空")
            return false
        }
        if(!regMobile.test(mobile)){
            showTip("errTip","手机格式错误")
            return false
        }
        if(address==""){
            showTip("errTip","请输入详细地址")
            return false
        }
        if (remarks==""){
            showTip("errTip","请输入备注")
            return false
        }
        //调用cookie和员数组+表单中的,数据存储在localStorage中
        collect(regMobile,name,mobile,address,remarks)
       
    })
    function collect(regMobile,name,mobile,address,remarks){
        var dataDate = date()
        var useInfo = {} 
        var pList = [] 
        /**
         * 用户选中商品数据
         */  
        useInfo.name = name 
        useInfo.mobile = mobile
        useInfo.address = address
        useInfo.remarks = remarks 
        useInfo.data = dataDate
       //取得商品的信息
        shopCart.forEach(function(item){
            var commodityInfo = {}    // 局部对象,影响变量。只在当前作用有影响
            var temProduct = allP.find(function(p){
                return p.id == item.pid
            })
            /**
             * 储存商品信息
             * @type {[type]}
             */
            commodityInfo.pid = item.pid
            commodityInfo.count = item.count
            commodityInfo.price = item.price
            commodityInfo.name = temProduct.name
            commodityInfo.img = temProduct.img
            commodityInfo.desc = temProduct.desc
            pList.push(commodityInfo)
        })
         useInfo.plist = pList   
         totalArr.push(useInfo)

        window.localStorage.setItem("totalArr",JSON.stringify(totalArr))
        console.log(localStorage.getItem("totalArr"))
        // window.location.href = "index.html"
    }
    function showTip(tag,msg){
        var $tip = $('#'+tag)
        $tip.text(msg)
        $tip.show()
        setTimeout(function(){
            $tip.hide()
        },3000)
    }
    function date(){
        var date = new Date()
        var y = date.getFullYear()
        var M = date.getMonth()
        var m = date.getMinutes()
        var h = date.getHours()
        var s = date.getSeconds()

        y < 10 ? "0" + y : y
        M < 10 ? "0" + M : M
        m < 10 ? "0" + m : m
        h < 10 ? "0" + h : h
        s < 10 ? "0" + s : s
        var dataDate ='' + y + M + m + h + s
        return dataDate
    }
})

/****订单信息 
 * 验证:收货人 手机号 地址不能为空
 * 把订单数据保存在localStorage中
 * [{oid:2017020912192,receiver:"小明",mobile:'15000000000',price:92,address:"",remarks:"",plist:[
 * {pid:121,img:'aaa',name:'xx',count,2,price:12},
 * {pid:122,img:'aaa',name:'xx',count,2,price:12}
 * ]},
 * {oid:2017020912192,receiver:"小明",mobile:'15000000000',price:92,address:"",remarks:"",plist:[
 * {pid:121,img:'aaa',name:'xx',count,2,price:12},
 * {pid:122,img:'aaa',name:'xx',count,2,price:12}
 * ]},
 * {oid:2017020912192,receiver:"小明",mobile:'15000000000',price:92,address:"",remarks:"",plist:[
 * {pid:121,img:'aaa',name:'xx',count,2,price:12},
 * {pid:122,img:'aaa',name:'xx',count,2,price:12}
 * ]}
 * ]
 * 
 * 
*/