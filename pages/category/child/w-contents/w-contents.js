// pages/category/child/w-contents/w-contents.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sub:{
      type:Array,
      value:[]
    },
    cat:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLower:false,
    topNum: {
      type: Number
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取滚动条当前的位置
    scrollToupper(e){
      const flg = e.detail.scrollTop > 2000;
      if (flg != this.data.showBackTop){
        this.setData({
          showLower: flg
        })
      }

    },
    // 回到顶部
    backtap: function(e) {
      this.setData({
        topNum: 0
      });
    }
  }
})
