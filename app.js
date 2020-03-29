var Bmob = require("/dist/Bmob-1.7.1.min.js");
Bmob.initialize("##", "aeeab8cbb330a4d4b0e8d554f18e62c9","43402f392e1b6c15101d021b961c4e05");
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  globalData:{
    userInfo:null
  },

  addToCart(obj) {
    const isInfo = this.globalData.cartLists.find((item) => item.iid === obj.iid)
    if (isInfo) {
      isInfo.count += 1
      wx.setStorageSync('goods', this.globalData.cartLists)
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartLists.push(obj)
    }
    wx.setStorageSync('goods', this.globalData.cartLists)

    // 购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
    console.log(this)
  },

  globalData: {
    cartLists: []
  }

  
})
