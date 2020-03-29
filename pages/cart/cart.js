// pages/cart/cart.js
var Bmob = require("../../dist/Bmob-1.7.1.min.js");
const app = getApp();
Page({
  // 跳转登录界面
  onTabItemTap(item) {
    // const index = item.index;
    const userInfo = !wx.getStorageSync('userData');
    // console.log(userInfo == true)
    if (userInfo == true) {
      wx.redirectTo({
        url: '/pages/login/login?index=2',
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次加载
    const cartList =wx.getStorageSync('goods');
    this.setData({
      cartList
    })
    // console.log(this.data.cartList)

    // 设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartLists
      })
      this.changeData()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  handButton(){
    let openid = wx.getStorageSync('openid')
    let nickName = wx.getStorageSync('userData').nickName;
    let totals = 0;
    for (let item of this.data.cartList) {
      if (item.checked) {
       let totalPrice = item.price * item.count;
        totals += totalPrice;
        const query = Bmob.Query('goods');
        query.set("totalPrice", totalPrice)
        query.set("price", item.price)
        query.set("count", item.count)
        query.set("iid", item.iid)
        query.set("openid", openid)
        query.set("imageURL", item.imageURL)
        query.set("title", item.title)
        query.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }

    const query1 = Bmob.Query('total');
    query1.equalTo("openid", "==", openid);
    query1.find().then(res => {
      console.log(res);
      const objectId = res[0].objectId;
      wx.setStorage({
        key: 'BMobjectId',
        data: objectId,
      })
      if(res.length > 0){
        let total = res[0].totals;
        total =  total + totals;
        query1.get(objectId).then(res => {
          console.log(res)
          res.set('totals', total)
          res.save()
        }).catch(err => {
          console.log(err)
        })
      }else if(res.length == 0){
        query1.set("totals",totals);
        query1.set("openid", openid);
        query1.set("nickName",nickName);
        query1.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
      cosole.log(res)
    });
    wx.redirectTo({
      url: '/pages/btnscuss/btnsuss',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 设置页面显示
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    }),
    this.changeData()
    // console.log(this.data.cartList)
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      });
      this.changeData();
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
      this.changeData();
    }
  },
  changeData() {
    // 获取所有选中数据
    let totalPrice = 0;
    let counter = 0;
    
    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }
    // console.log(counter, totalPrice)
    // 修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})