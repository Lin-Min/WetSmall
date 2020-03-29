import request from './network.js'

export function getDetail(iid) {
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}

export function getRecommends() {
  return request({
    url: '/recommend'
  })
}

export class GoodsBasicBlog {
  constructor(itemInfo, columns, services) {
    // 商品标题
    this.title = itemInfo.title
    // 商品信息
    this.desc = itemInfo.desc
    // 价格范围
    this.newPrice = itemInfo.price
    // 旧的价格
    this.oldPrice = itemInfo.oldPrice
    // 折扣
    this.discount = itemInfo.discountDesc
    // 销量, 收藏等信息
    this.columns = columns
    // 七天无理由...等数据
    this.services = services
    // 获取lowPrice
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class ShopBlog {
  constructor(shopInfo) {
    // 店铺Logo
    this.logo = shopInfo.shopLogo;
    // 店铺名称
    this.name = shopInfo.name;
    // 总销售
    this.sells = shopInfo.cSells;
    // 店铺总评
    this.score = shopInfo.score;
    // 全部宝贝数据
    this.goodsCount = shopInfo.cGoods
  }
}

export class ParamBlog {
  constructor(info, rule) {
      // 商品出材质等信息
    this.infos = info.set;
    // 商品尺码
    this.sizes = rule.tables;
  }
}