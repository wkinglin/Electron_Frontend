<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
const {ipcRenderer} = require('electron');

export default {
  data(){
    return {
      flag:0,
    }
  },
  mounted() {
      console.log('yes')
      this.init();
  },
  methods: {
    init() {
        console.log("start");
        // 实例化socket
          this.socket = new WebSocket("ws://127.0.0.1:9090/");
          console.log(this.socket);

          //刷新连接
          if(!this.flag){
            setTimeout(()=>{
              this.init();
            },5000);
          }
          
          this.global.setWs(this.socket);
          this.socket.onopen = this.open;
          // 监听socket错误信息
          this.socket.onerror = this.error;
          this.socket.onclose = this.close;
          if(this.flag){
            ipcRenderer.send('close-loading-window',{
              isClose:true
            })
          }
      },
      open() {
        this.flag=1;
        console.log("socket连接成功");
      },
      // socket连接失败
      error() {
        console.log("连接错误");
        
      },
      close () {
        console.log("socket已经关闭")
      },
  }

}
</script>

<style>
  #app {
    font-family: "微软雅黑";
    text-align: center;
    color: #2c3e50;
    
  }
  html, body,#app {
    overflow: hidden;
  }
  .box-card {
    margin:50px;
  }
</style>