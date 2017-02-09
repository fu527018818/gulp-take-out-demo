/**
 * 自己创建一个商品数据集合
 * 点击分类时实现商品的切换
 * 切换之后已经选择好的数量需要记录
*/
var arrAllProducts = [
    {
        type: "炒菜",
        products: [
            { id: 10001, name: "土猪肉烧红薯", img: "http://recipe1.hoto.cn/pic/recipe/l/ff/4f/1134591_e480ee.jpg", price: 26.00, desc: "红薯与肉香交互辉映，肥而不腻、酥而不碎、甜而不粘、浓而不咸。" },
            { id: 10002, name: "红烧虾园子", img: "http://recipe1.hoto.cn/pic/recipe/l/c3/66/1140419_19dbfb.jpg", price: 28.00, desc: "传统的《桂花酒酿圆子》有现成的卖，自己做也是简单方便口味很不错" },
            { id: 10003, name: "宫保鸡丁", img: "http://recipe0.hoto.cn/pic/recipe/g_148/6a/da/252522_0d88b3.jpg", price: 20.00, desc: "川菜馆必点" }
        ]
    },
    {
        type: "商务套餐",
        products: [
            { id: 20001, name: "荷叶饭", img: "http://recipe0.hoto.cn/pic/recipe/g_148/72/61/1073522_c9b4af.jpg", price: 12.00, desc: "好吃的荷叶饭" },
            { id: 20002, name: "奢华版荷叶饭", img: "http://recipe0.hoto.cn/pic/recipe/g_148/40/f8/849984_c84667.jpg", price: 15.00, desc: "精装版" }
        ]
    },
    {
        type: "主食",
        products: [
            { id: 30001, name: "燕麦南瓜饼", img: "http://recipe1.hoto.cn/pic/recipe/l/45/67/1140549_2cf776.jpg", price: "12.00", desc: "这款燕麦南瓜饼，外皮软糯，内馅香甜" }
        ]
    },
    {
        type: "其他",
        products: [
            { id: 40001, name: "苏格兰蛋", img: "http://recipe0.hoto.cn/pic/recipe/l/2a/67/1140522_c0045b.jpg", price: "25.80", desc: "据说这叫苏格兰蛋。其实油炸的我吃得少做的更少" }
        ]
    }
]
