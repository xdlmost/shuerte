// components/square/square.js

var reTimer;  //定时器
var timer;
const colors=[
  '239,52,42','246,143,38','75,169,70','3,118,194','192,119,175','248,210,157','181,168,127','208,228,169','77,199,236'];
Component({

  properties: {
    jie:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    isStarted:"noStart",
    font:"100px",
    opacity:1,
    stepText:"",
    _timer_num:0,
    timer_str:"",
    _targetindex:1
  },
  attached: function() {
    let tlist=[]
    let jie=this.properties.jie
    let tmplist=[]
    for(var i=0;i<jie*jie;i++){
      tmplist.push({
        index:i+1,
        value:i+1,
        color:"white",
        step:1,
        _color:""
      })
    }
    while(tmplist.length!=0)
    {
      var t=Math.floor(Math.random()*tmplist.length)
      tlist.push(tmplist[t])
      tmplist.splice(t,1)
    }
    this.setData({
      jie:this.properties.jie,
      tlist: tlist,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    ItemTap: function(a) {
      let value=a.currentTarget.dataset.value
      console.log(value)
      if (value==this.data._targetindex){
        if (value==this.data.jie*this.data.jie)
        {
          clearInterval(timer)
          this.triggerEvent('Win', {time:this.dataset._timer_num}, {})
        }
        else
        {
          var tlist=this.data.tlist
          tlist.map(item=>{
            if (value==item.index)
            {
              item.step=41
              item._color=colors[Math.floor(Math.random()*colors.length)];
              return item
            }
            return item
          })
          this.setData({
            _targetindex:value+1,
            tlist:tlist
          })
        }
      }
      else
      {
        clearInterval(timer)
        this.triggerEvent('Fail', {}, {})
      }
    },
    ToStart: function(a) {
      var that = this
      var step = 3.99 ;  
      reTimer = setInterval(function(){
        step = (step - 0.01).toFixed(2)
        that.setData({
          stepText: parseInt(step),
          opacity:step-parseInt(step),
          font:200-parseInt((step-parseInt(step))*100) +'px'
      })
      if(step<=1){
        clearInterval(reTimer)  //销毁定时器
        that.setData({
          isStarted:"Started",
      })
      timer=setInterval(function(){
        var num=that.data._timer_num;
        var tlist=that.data.tlist.map(item=>{
          if (item.step>0)
          {
            item.step-=1
            var step=item.step
            item.color="radial-gradient(rgba("+item._color+","+(step)/100+") "+(1+101-step)+"%, white "+(1+101-step)+"% );"
            return item
          }
          return item
        });
        num+=0.01
        that.setData({
          _timer_num:num,
          timer_str:'已经耗时：'+num.toFixed(2),
          tlist:tlist
        })
      },10);
      }
    },10);
    },
  }
})
