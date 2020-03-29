// pages/order/child/w-order-item/w-order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order:{
      type:Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    indexNum:Number
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleSubmit(e){
      const index = e.currentTarget.dataset.index;
      this.setData({
        indexNum:index
      })
      this.triggerEvent("handleSubmit",{index},{});
    }
  }
})
