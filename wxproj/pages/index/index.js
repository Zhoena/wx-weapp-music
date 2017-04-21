//index.js
//获取应用实例
var app = getApp();
var music = require('../../comm/comm')
Page({
  data: {
    motto: '欢迎来到我的音乐',
    userInfo: {}
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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    
    //新歌
    music.getmusicnew.call(that)

    //热歌
    music.getmusichot.call(that)

    //监听音乐播放
    wx.onBackgroundAudioPlay(function() {
      console.log('播放')
      //music.getMusicStauts.call(that)
    })
    //监听音乐暂停
    wx.onBackgroundAudioPause(function() {
      console.log('暂停')
    })
 
    //监听音乐停止
    wx.onBackgroundAudioStop(function() {
      console.log('停止')
      var info= that.data.playInfoMp3
      //单曲循环
      //music.singlePlay(info)
      
    })
    
    
  },
  onShow: function() {
    // Do something when page show.
    var that = this;
    console.log(app.globalData.bottomstatus)
    console.log(app.globalData.onpause)
    //监听音乐播放
  //   wx.onBackgroundAudioPlay(function() {
  //     app.globalData.onpause = true
  //     app.globalData.bottomstatus = true
  //   })
    if(app.globalData.onpause==true){
      app.globalData.bottomstatus = true
    }
  }
})

