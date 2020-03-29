// pages/waitorder/waitorder.js
var Bmob = require("../../dist/Bmob-1.7.1.min.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: Array
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid');
    const query = Bmob.Query("goods");
    query.equalTo("openid", "==", openid);
    query.find().then(res => {
      console.log(res)
      this.setData({
        order: res
      })
    });
  },
  handleSubmit(e) {
    const index = e.detail.index;
    let order = this.data.order[index];
    const query = Bmob.Query('order');
    console.log(order)
    query.set("totalPrice", order.totalPrice)
    query.set("price", order.price)
    query.set("count", order.count)
    query.set("iid", order.iid)
    query.set("openid", order.openid)
    query.set("imageURL", order.imageURL)
    query.set("title", order.title)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    const query1 = Bmob.Query('goods');
    query1.destroy(order.objectId).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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