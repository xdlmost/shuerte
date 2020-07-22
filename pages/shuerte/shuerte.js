//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  OnWin: function(a) {
    console.log(a)
  },
  OnFail: function(a) {
    console.log(a)
  },
  onLoad: function (a) {
    let tlist=[]
    let jie=this.data.jie
    let tmplist=[]
    for(var i=0;i<jie*jie;i++){
      tmplist.push(i)
    }
    while(tmplist.length!=0)
    {
      var t=Math.floor(Math.random()*tmplist.length)
      tlist.push(tmplist[t])
      tmplist.splice(t,1)
    }
    this.setData({
      tlist: tlist,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
