//index.js
//获取应用实例
var app = getApp();
var music = require('../../comm/comm')
Page({
  data: {
    motto: '欢迎来到我的音乐',
    userInfo: {},
    // 新歌
    songlist:[],
    // 热歌
    songlisthot:[],
    // 底部状态
    bottomstatus: false,
    //暂停播放按钮
    onpause: false,
    //当前播放歌曲索引
    playindex: "",
    //当前播放歌曲信息
    playInfo: {},
    //播放时长
    playTime: 0,
    //歌曲id
    songId:""
  },
  //事件处理函数
  //播放
  play:function(ev){
    var that = this;
    music.play.call(that,ev);
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
      //music.getMusicStauts.call(that)
    })
 
    //监听音乐停止
    wx.onBackgroundAudioStop(function() {
      console.log('停止')
      //music.getMusicStauts.call(that)
    })
    
    
  },
  onShow: function() {
    // Do something when page show.
  }
})

