// pages/products/child/w-bottom-g/w-bottom-g.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '/assets/products/collect.png',
    url1:'/assets/products/collect.png',
    url2:'/assets/common/favor_active.png',
    flg: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImg() {
      const flg = !this.data.flg;
      this.setData({
        flg
      })
      const btnImg1 = this.data.url2;
      const btnImg2 = this.data.url1;
      if (flg) {
        this.setData({
          url: btnImg1
        })
      }else{
        this.setData({
          url: btnImg2
        })
      }
    },
    toAddCart() {
      this.triggerEvent('addCart', {}, {});
    }
  }
})
