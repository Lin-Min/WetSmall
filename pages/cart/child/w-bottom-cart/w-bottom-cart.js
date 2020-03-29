// pages/cart/child/w-bottom-cart/w-bottom-cart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean
    },
    price: {
      type: Number
    },
    counter: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    good:Array
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSettle(){
      this.triggerEvent("handButton",{},{});
    }
  }
})
