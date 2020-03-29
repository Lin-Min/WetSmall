// pages/login/login.js
var Bmob = require("../../dist/Bmob-1.7.1.min.js");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    index: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const index1 = options.index;
    const index = this.data.index;
    if(index1 != index ){
      this.setData({
        index: index1
      })
    }
    // loginto();
  },
  onGotUserInfo(e){
    wx.getSetting({
      success: (res) =>{
        const flg = res.authSetting['scope.userInfo'];
        console.log(flg)
        if(flg == true){
          app.globalData.userInfo = e.detail.userInfo;
          Bmob.User.upInfo(e.detail.userInfo)
            Bmob.User.auth().then(res => {
              console.log('一键登陆成功')
              var userData = {
              nickName: res.nickName,
              objectId: res.objectId,
              openid: res.openid,
              userPic: res.userPic,
              username: res.username
            };
             wx.setStorageSync('userData', userData);
            wx.setStorageSync('openid', res.openid);
            })
           wx.showToast({
             title: '登录成功',
             icon: "success",
             duration:2500,
             mask: true,
             success: () =>{
               const index = this.data.index;
               if(index == 3){
                 wx.switchTab({
                   url: '/pages/profile/profile',
                 })
               }else{
                 wx.switchTab({
                   url: '/pages/cart/cart',
                 })
               }
             }
           })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})