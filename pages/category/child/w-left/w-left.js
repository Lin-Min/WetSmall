// pages/category/w-left/w-left.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categorys:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e){
      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })

      // 将索引值传递出去
      this.triggerEvent('leftClick',{currentIndex},{})
    }
  }
})
