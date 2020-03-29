// components/w-goods-item/w-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type:Object,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url:'/assets/common/favor.png',
    act: false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    proClick(e){
      // 获取iid
      const iid = this.data.item.iid;
      console.log(iid)
      // 跳转 对应的商品页面
      wx.navigateTo({
        url: '/pages/products/products?iid=' + iid,
      })
    },

    handleImg(){
      const act = !this.data.act;
      this.setData({
        act
      })
      const btnImg1 = "/assets/common/favor_active.png";
      const btnImg2 = "/assets/common/favor.png";
      if(act){
        this.setData({
            url: btnImg1
        })
      }else{
        this.setData({
          url: btnImg2
        })
      }
    }
  }
})
