// pages/cart/child/w-head-cart/w-head-cart.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckClick(e) {
      // 查找到对应的商品
      const goods = app.globalData.cartLists.find(item => item.iid == this.properties.goods.iid)
      console.log(goods);
      goods.checked = !goods.checked

      // 获取当前商品的index
      const index = e.currentTarget.dataset.index;
      console.log(index)
      //回调
      app.changeGoodsState(index, goods)
    }
  }
})
