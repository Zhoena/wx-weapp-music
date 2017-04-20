// 获取新歌列表
function getmusicnew(offset,len){
    var that = this
    var size = 10
    //如果没有歌曲便宜，默认为0
    if(offset==null){
        offset=0
    }
    if(len==null){
        len=3 
    }
    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.billboard.billList&type=1&size='+size+'&offset='+offset,
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
         var list = res.data.song_list
         var songarr = []
         for(var i=0; i<list.length; i+=len){
            songarr.push(list.slice(i,i+len))
         }
         that.setData({
           songlist:songarr
         })
      }
    })
}
// 获取热歌列表
function getmusichot(offset,len){
    
    var that = this
    //console.log(that)
    var size = 10
    //如果没有歌曲便宜，默认为0
    if(offset==null){
        offset=0
    }
    //没几个分为一组
    if(len==null){
        len=3
    }
    wx.request({
      url: 'https://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&method=baidu.ting.billboard.billList&type=2&size='+size+'&offset='+offset,
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
         var list = res.data.song_list
         var songarr = []
         for(var i=0; i<list.length; i+=len){
            songarr.push(list.slice(i,i+len))
         }
         that.setData({
           songlisthot:songarr
         })
      }
    })
}

// 播放
function play(ev){
    var that = this
    // 当前列表中播放索引
    //var playindex = ev.currentTarget.dataset.index
    var url = ""
    // 设置data数据
    that.setData({
        // 设置当前播放信息
        playInfo: ev.currentTarget.dataset.arr,
        // 设置当前播放索引
        //playindex: playindex
    })
    var obj = that.data.playInfo
    wx.request({
        url: 'https://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+obj.song_id,
        header: {
            'content-type': 'application/json'
        },
        success: function (e) {
            url = e.data.bitrate.show_link
            that.setData({
                playInfoMp3: e.data
            })
            wx.playBackgroundAudio({
                dataUrl:url,
                name: obj.title,
                singer:obj.author,
                coverImgUrl: obj.pic_big,
                success:function(e){
                  that.setData({
                    // 设置底部显示隐藏状态
                    bottomstatus:true,
                    // 设置播放按钮播放暂停状态
                    onpause:false,
                  })
                }
            })
            wx.seekBackgroundAudio({
                position: 0
            })
            
           
        }
    })
}
function playbottom(ev){
    var that = this
    // 当前列表中播放索引
    //var playindex = ev.currentTarget.dataset.index
    var url = ""
    // 设置data数据
    that.setData({
        // 设置当前播放信息
        playInfo: ev.currentTarget.dataset.arr,
        // 设置当前播放索引
        //playindex: playindex
    })
    var obj = that.data.playInfo
    wx.request({
        url: 'https://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+obj.song_id,
        header: {
            'content-type': 'application/json'
        },
        success: function (e) {
            url = e.data.bitrate.show_link
            wx.playBackgroundAudio({
                dataUrl:url,
                name: obj.title,
                singer:obj.author,
                coverImgUrl: obj.pic_big,
                success:function(e){
                  that.setData({
                    // 设置底部显示隐藏状态
                    bottomstatus:true,
                    // 设置播放按钮播放暂停状态
                    onpause:false,
                  })
                }
            })
            var currentPosition = that.data.playTime;
            wx.seekBackgroundAudio({
                position: currentPosition
            })
            
            //获取后台音乐播放状态
            // wx.getBackgroundAudioPlayerState({
            //     success: function(res) {
                    
            //     }
            // })
            
           
        }
    })
}

// 暂停
function pause(ev){
    var that = this;
    //console.log(that.data.onpause)
    wx.pauseBackgroundAudio({
        success:function(){
            that.setData({
                onpause:true
            })
        }
    })
    
    //获取后台音乐播放状态
    wx.getBackgroundAudioPlayerState({
        success: function(res) {
            var currentPosition = res.currentPosition
            that.setData({
                playTime: currentPosition
            })
            console.log(currentPosition)
        }
    })
    
}


//单曲循环播放
function singlePlay(info){
    console.log(info)
    var url = info.bitrate.show_link
    var name = info.songinfo.author
    var singer = info.songinfo.title
    var img = info.songinfo.pic_small
    wx.playBackgroundAudio({
        dataUrl:url,
        name: name,
        singer:singer,
        coverImgUrl: img,
        success:function(e){

        }
    })
    wx.seekBackgroundAudio({
        position: 0
    })
}





module.exports = {
  getmusicnew: getmusicnew,
  getmusichot: getmusichot,
  play: play,
  playbottom: playbottom,
  pause: pause,
  singlePlay: singlePlay
}

