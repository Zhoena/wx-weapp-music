var app = getApp();
Page({
  data: {
    display:true
  },
  setDisplay:function(e){
   console.log("222");
    this.setData({
        display : false
    })
    console.log(e)
  }
})