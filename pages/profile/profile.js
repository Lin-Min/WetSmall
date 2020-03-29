// pages/profile/profile.js
var Bmob = require("../../dist/Bmob-1.7.1.min.js");
Page({
  onTabItemTap(item) {
    // const index = item.index;
    const userInfo = !wx.getStorageSync('userData');
    // console.log(userInfo == true)
    if (userInfo == true){
      wx.redirectTo({
        url: '/pages/login/login?index=3' ,
      })
    }

  },

  /**
   * 页面的初始数据
   */
  data: {
    listFoots: [
      { url: 'cart.png', into: '待收货', href: 'srcimg.png', btn:'handleWait' },
      { url: 'pointer.png', into: '积分商城', href: 'srcimg.png', btn: '' },
      { url: 'vip.png', into: '会员卡', href: 'srcimg.png', btn: '' },
    ],
    listBott: [
      { url: 'order.png', into: '我的订单', href: 'srcimg.png', btn: 'handleOrder' },
      { url: 'collect.png', into: '我的收藏', href: 'srcimg.png', btn: '' },
      { url: 'app.png', into: '下载购物APP', href: 'srcimg.png', btn: '' },
    ],
    userData:Object,
    total:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userData = wx.getStorageSync('userData');
    this.setData({
      userData
    })
    const objectId = wx.getStorageSync('BMobjectId')
    const query = Bmob.Query('total');
    query.get(objectId).then(res => {
      console.log(res);
      this.setData({
        total:res.totals
      })
    }).catch(err => {
      console.log(err)
    })
  },
  backLogin(){
   wx.redirectTo({
     url: '/pages/login/login',
   })
  }

})