// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategorySub
} from '../../server/category.js'
const TOP_DISPANCE = 1300;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    catelists: {},
    currentIndex: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getDatas()
  },

  // ----------网络请求------------
  _getDatas() {
    // 请求左侧数据
    this._getCategory();
  },
  _getCategory() {
    // 网络请求
    getCategory().then(res => {
      // 获取数据数组
      const categorys = res.data.data.category.list;
      // 初始化左侧分组的内容数据
      const catelists = {}
      for (let i = 0; i < categorys.length; i++) {
        catelists[i] = {
          sub: [],
          cat: []
        }
      }
      // 更新data中的数据
      this.setData({
        categorys,
        catelists
      })

      //请求第一个类别的数据
      this._getSubcategory(0)
      this._getCatcategory(0)
    })
  },

// 请求右边的数据
  _getSubcategory(currentIndex){
    // 获取maitKey
    const maitKey = this.data.categorys[currentIndex].maitKey;

    getSubcategory(maitKey).then(res =>{
      const temCatelists = this.data.catelists;
      // 分类数据
      temCatelists[currentIndex].sub = res.data.data.list;

      this.setData({
        catelists: temCatelists
      })
    })
  },

// 右边展示的数据
  _getCatcategory(currentIndex){
    // 获取左边数组中的miniWallkey
    const miniWallkey = this.data.categorys[currentIndex].miniWallkey;
    // 请求数据类型的数据
    this._getReadCategory(currentIndex, miniWallkey, 'pop');
  },
  // 请求数据
  _getReadCategory(index, miniWallkey, type){
    getCategorySub(miniWallkey, type).then(res =>{
      // 获取右边的数据对象
      const catelists = this.data.catelists;
      catelists[index].cat = res.data;
      //更新数据
      this.setData({
        catelists
      })
    })    

  },

  // 左侧点击
  leftClick(e) {
    
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    // 请求对应的数据
    this._getSubcategory(currentIndex)
    this._getCatcategory(currentIndex)

  }

 
})