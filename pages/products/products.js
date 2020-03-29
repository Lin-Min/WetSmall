// pages/products/products.js
import {
  getDetail,
  getRecommends,
  GoodsBasicBlog,
  ShopBlog,
  ParamBlog,
} from '../../server/products.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLower: false,
    topNum: {
      type: Number
    },
    iid: '',
    topImages: [],
    baseBlog: {},
    // 店铺信息
    shopBlog: {},
    // 商品介绍
    detailInfo: {},
    // 商品尺码
    paramBlog: {},
    // 用户评论
    rateInfo: {},
    // 商品推荐
    recommends: {},
    showBackTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取传入的iid
    this.setData({
      iid: options.iid
    })

    // 请求商品信息
    this._getProductData();

    this._getRecommends();
  },
  _getProductData() {
    getDetail(this.data.iid).then(res => {
      // 获取商品详情页的数据
      const result = res.data.result;
      // 取出轮播图的图片
      const topImages = result.itemInfo.topImages;
      // 创建BaseBlog对象(商品标题具体信息)
      const baseBlog = new GoodsBasicBlog(result.itemInfo, result.columns, result.shopInfo.services);
      // 获取商品介绍信息
      const detailInfo = result.detailInfo;
      // 创建(店铺信息)对象
      const shopBlog = new ShopBlog(result.shopInfo);
      // 创建(尺码)对象
      const paramBlog = new ParamBlog(result.itemParams.info, result.itemParams.rule)

      // 获取用户评论数据
      let rateInfo = {};
      const rate = result.rate;
      if (rate && rate.cRate > 0) {
        rateInfo = rate.list[0]
      }
      this.setData({
        topImages,
        baseBlog,
        shopBlog,
        detailInfo,
        paramBlog,
        rateInfo
      })

    })

  },

  // 商品推荐信息
  _getRecommends() {
    getRecommends().then(res => {
      const recommends = res.data.data.list;
      this.setData({
        recommends
      })
    })
  },

  // 将信息添加到购物车
  toAddCart() {
    // 获取商品对象
    const obj = {};
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseBlog.title;
    // 商品介绍
    obj.desc = this.data.baseBlog.desc;
    // 价格
    obj.price = this.data.baseBlog.realPrice;
    

    // 加入到购物车列表
    app.addToCart(obj)

    //成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  // 获取滚动条当前的位置
    scrollToupper(e) {
    const flg = e.detail.scrollTop > 2000;
    if (flg != this.data.showBackTop) {
      this.setData({
        showLower: flg
      })
    }
  },
  // 回到顶部
  backtap(e) {
    this.setData({
      topNum: 0
    });
  }

})