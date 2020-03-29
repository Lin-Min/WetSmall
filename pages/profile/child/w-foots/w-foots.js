// pages/profile/child/w-foots/w-foots.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fots: {
      type: Array,
      value: []
    },
    
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
    handleOrder(){
      wx.navigateTo({
        url: '/pages/order/order',
      })
    },
    handleWait() {
      wx.navigateTo({
        url: '/pages/waitorder/waitorder',
      })
    }
  }
})
