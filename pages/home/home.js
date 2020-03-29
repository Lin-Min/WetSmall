import {
  getMultiData,
  getGoodsData
} from '../../server/home.js'
const types = ['pop', 'new', 'sell'];
const TOP_DISPANCE = 1300;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topHeight: 0,
    showBackTop: false,
    isFixed: false,
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: [],
      },
      new: {
        page: 0,
        list: [],
      },
      sell: {
        page: 0,
        list: [],
      }
    },
    currentType: 'pop'

  },
  // ---------事件监听-----------
  tabClick(event) {
    const index = event.detail.index;
    this.setData({
      currentType: types[index]
    })
  },

  // 监听页面滚动
  // 修改showBackTop
  onPageScroll(e) {
    const scrollTop = e.scrollTop;
    const flag1 = scrollTop > TOP_DISPANCE;
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }

    // 修改isFixed属性
    const flag2 = scrollTop >= this.data.topHeight;
    if (flag2 != this.data.topHeight){
      this.setData({
        isFixed: flag2
      })
    }
  },
  handleImageLoad() {
    wx.createSelectorQuery().select("#tab-control")
      .boundingClientRect().exec(rect => {
        // console.log(rect)
         this.data.topHeight  = rect[0].top;
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 请求轮播图和推荐数据
    this._getMultiData();

    // 请求商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
    // console.log(this.data.goods)

  },

  // ----------网络请求函数----------
  _getMultiData() {
    getMultiData().then((res) => {
      // 取出轮播图和推荐数据
      console.log(res)
      const banners = res.data.data.banner.list;
      // 推荐数据
      const recommends = res.data.data.recommend.list;
      // 将数据存入data
      this.setData({
        banners,
        recommends
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  // 请求商品数据
  _getGoodsData(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1;

    // 发送网络请求
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list;
      // 获取的list数据设置到对应的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list);
      const typeKey = `goods.${type}.list`;
      const typePage = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [typePage]: page,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //  上拉更多
    wx.showLoading({
      title: '加载中',
      success: () => {
        this._getGoodsData(this.data.currentType);
        wx.hideLoading();
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(event) {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})