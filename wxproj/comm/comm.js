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
    console.log(that)
    var size = 10
    //如果没有歌曲便宜，默认为0
    if(offset==null){
        offset=0
    }
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
    var obj = ev.currentTarget.dataset.arr[ev.currentTarget.dataset.index]
    //console.log(obj)
    var url = ""
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
                complete: function (obj) {
                  //console.log(res)
                },
                success:function(obj){
                  that.setData({
                    bottomstatus:true
                  })
                }
            })
        }
    })
}

// 暂停
function pause(ev){
    var that = this;
    console.log(that.data.onoff)
    
    wx.pauseBackgroundAudio()
    that.setData({
        onoff:!that.data.onoff
    })
}

function getstatus(ev){
    wx.getBackgroundAudioPlayerState({
        success: function(res) {
            var status = res.status
            var dataUrl = res.dataUrl
            var currentPosition = res.currentPosition
            var duration = res.duration
            var downloadPercent = res.downloadPercent
            console.log(status+"============="+dataUrl+"============="+currentPosition+"=============="+duration+"==========="+downloadPercent)
        }
    })
    
}



module.exports = {
  getmusicnew: getmusicnew,
  getmusichot: getmusichot,
  play:play,
  pause:pause,
  getstatus:getstatus
}

