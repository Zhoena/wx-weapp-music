//music.js
var music = require('../../comm/comm')
Page({
  data: {

  },
  //事件处理函数
  //播放
  play:function(ev){
    var that = this;
    music.play.call(that,ev);
  },
  playbottom:function(ev){
    var that = this;
    music.playbottom.call(that,ev);
  },
  //暂停
  pause:function(ev){
    var that = this;
    music.pause.call(that,ev);
  },
  onLoad: function () {
    var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
    
    //新歌
    music.getmusicnew.call(that)

    //热歌
    music.getmusichot.call(that)    
    
  },
  onShow: function() {
    var that = this;
    console.log(getApp().globalData.bottomstatus)
    console.log(getApp().globalData.onpause)
    //监听音乐播放
  //   wx.onBackgroundAudioPlay(function() {
  //     getApp().globalData.onpause = true
  //   })
    if(getApp().globalData.onpause==true){
      getApp().globalData.bottomstatus = true
    }
  }
})

