//页面初始化的时候输出cookie数据
console.log($.cookie("shopcart"))
$(function(){
    $('.order-detail').click(function(){
        $('.order-product').toggle(1500)
    })
    var shopCart = JSON.parse($.cookie("shopcart"))
    var strHtml = ''
    var sumPrice = 0
    var sumCount = 0
    var allP = [] //用于存储所有的商品数据
    arrAllProducts.forEach(function(item){
        console.log(item)
        allP = allP.concat(item.products) //商品数据拼接
    })
    console.dir(allP)
    shopCart.forEach(function(item){
        //当前cookie中的商品id对应的商品信息
        var temProduct = allP.find(function(p){
            return p.id == item.pid
        })
        sumPrice += item.price*item.count
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
})