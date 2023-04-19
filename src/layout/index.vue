<template>
      <el-container>
          <side-Bar></side-Bar>
          <el-main class="main">
              <template>
                  <m-Header class="header"></m-Header>
                  <app-Main class="appMain"></app-Main>
              </template>
          </el-main>
      </el-container>
</template>

<script>
import SideBar from "./Components/SideBar.vue";
import MHeader from "./Components/MHeader.vue";
import AppMain from "./Components/AppMain.vue";
export default {
    name: "layout-index",
    methods: {
      
    },
    components: {
    SideBar,
    MHeader,
    AppMain,
  }
  }
</script>

<style>
    .el-main  {
        /* background-color: #E9EEF3; */
        color:#3a3f51;
        text-align: center;
        line-height: 50px;
        padding: 0px !important;
        background-color: #f0f3f4;
        /* background-image: url(./icon.png);
        background-repeat:no-repeat;
        background-position:bottom;
        background-size: 200px 200px; */
        overflow: hidden;
    }
    .header{
        height: 55px;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
        transition: all 0.3s; 
         -webkit-app-region: drag; 
         -webkit-user-select: none; 
    }
    .appMain{
        overflow: hidden;
    }
</style>


