//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    // 新歌
    songlist:[],
    // 热歌
    songlisthot:[],
    // 底部状态
    bottomstatus: false,
    // 暂停播放按钮
    onpause: false,
    // 当前播放歌曲信息
    playInfo: {},
    //带链接的歌曲信息
    playInfoMp3: {},
    // 播放时长
    playTime: 0,
    // 歌曲id
    songId:""
  }
})