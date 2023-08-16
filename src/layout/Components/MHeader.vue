<template>
    <div>
      <div class="mHeader">
        <i class="el-icon-back" style="float:left;margin: 22px 0 20px 20px;-webkit-app-region: no-drag;cursor:pointer;" @click="returnPage()"></i>
        <i class="el-icon-s-operation" style="float:left;margin: 22px 0 20px 20px;-webkit-app-region: no-drag;cursor:pointer;" @click="changeCollapse()"></i>
        <BreadCrumb class="bread"></BreadCrumb>
        <!-- <el-avatar icon="el-icon-user-solid" style="float: right;margin-top:15px;margin-right:30px"></el-avatar> -->
        <i class="el-icon-close" style="float:right;margin: 22px 20px 0 20px;-webkit-app-region: no-drag;cursor:pointer;" @click="closeWin()"></i>
        <i class="el-icon-minus" style="float:right;margin: 22px 0 20px 20px;-webkit-app-region: no-drag;cursor:pointer;" @click="minimizeWin()"></i>
      </div>
    </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb/bread-crumb.vue";
const ipcRenderer = require('electron').ipcRenderer;

export default {
  components: {
    BreadCrumb,
  },
  methods: {
    // toggleMsgShow() {
    //   this.$store.commit("app/SET_MSGISOPEN");
    // }
    changeCollapse(){
      this.$store.commit('changeCollapsed',!this.$store.state.isCollapsed);
    },
    minimizeWin(){
      ipcRenderer.send('request-window-minimize')
    },
    maximizeWin(){
      // const win=remote.getCurrentWindow();
      // if(win.isMaximized()){ // 判断 窗口是否已最大化 
      //   win.restore();// 恢复原窗口大小
      // }else{
      //    win.maximize();  //最大化窗口
      // }
    },
    closeWin(){
      ipcRenderer.send('request-window-close')
    },
    returnPage(){
      this.$router.go(-1);
    }
  }
};
</script>
<style>
  .bread{
    height: 100%; 
  }
  .mHeader{
    position: fixed;
    height: 55px;
    width: 95%;
    z-index:99;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s; 
    -webkit-app-region: drag; 
    -webkit-user-select: none; 

  }
</style>
