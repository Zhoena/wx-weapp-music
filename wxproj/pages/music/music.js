//music.js
var music = require('../../comm/comm')
Page({
  data: {
    // 新歌
    songlist:[],
    // 热歌
    songlisthot:[],
    // 底部状态
    bottomstatus: false
  },
  //事件处理函数
  onLoad: function () {
    var that = this
    //新歌
    music.getmusicnew.call(that)
    //热歌
    music.getmusichot.call(that)
  },
  //事件处理函数
  play:function(ev){
    music.play(ev);
  }
})

