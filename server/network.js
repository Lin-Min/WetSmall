import {
baseURL
} from '/confg.js'

export default function request(options){
  wx.showLoading({
    title:"数据加载中"
  })
  return new Promise((resolve, reject) =>{
    wx.request({
      url:baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject,
      complete:res =>{
        wx.hideLoading();
      }
    })
  })
}