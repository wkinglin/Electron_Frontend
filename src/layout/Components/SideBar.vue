<template>
    <div id="app">
      <el-container>
        <el-aside width="auto">
            <el-menu :collapse="isCollapse" default-active="$route.path" router class="el-menu-vertical-demo" background-color="#FFFFFF"  active-text-color="#397cf6">
              <el-menu-item style="margin-top:10px">
                <el-avatar class="imgLogo" :src="require('@/assets/icon.png')"></el-avatar>
                <span>可靠性评估软件</span>
              </el-menu-item>
              <el-menu-item index="/dashboard">
                <i class="el-icon-house"></i>
                  <span>首页</span>
              </el-menu-item>

              <el-menu-item index="/alo">
                <i class="el-icon-s-order"></i>
                <span>知识图谱构建</span>
              </el-menu-item>

              <!-- <el-menu-item index="/matlab">
                <i class="el-icon-s-order"></i>
                <span>多作战因素模型</span>
              </el-menu-item> -->

              <el-menu-item index="/alo-lianhe">
                <i class="el-icon-s-order"></i>
                <span>联合作战模型</span>
              </el-menu-item>

              <el-menu-item index="/alo-python">
                <i class="el-icon-s-order"></i>
                <span>python算法</span>
              </el-menu-item>

              <el-menu-item index="/python">
                <i class="el-icon-s-order"></i>
                <span>信息域</span>
              </el-menu-item>

              <el-menu-item index="/hypo">
                <i class="el-icon-s-order"></i>
                <span>假设检验</span>
              </el-menu-item>

              <el-menu-item index="/combatSystem">
                <i class="el-icon-s-order"></i>
                <span>作战体系验证与评估</span>
              </el-menu-item>

              <el-menu-item index="/atlas">
                <i class="el-icon-s-order"></i>
                <span>图谱补全</span>
              </el-menu-item>

            </el-menu>
        </el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
    data(){
        return {
          isCollapse:true,
        }
    },
    computed:{
      monitor () {
        return this.$store.state.isCollapsed;
      }
    },
    watch:{
      monitor () {
        this.isCollapse = this.$store.state.isCollapsed;
      }
    },
}
</script>

<style>
  
  .logoLink {
    color: white !important;
    font-size: 15px;
    margin-left: 18px;
    display: inline-block;
    font-weight: bold;
    height: 100%;
    line-height: 50px;
  } 
  .imgLogo {
    height: 45px;
    vertical-align: middle;
    float: left;
    margin-right: 5px;
    position: relative;
    margin-top:5px;
  }
  .el-menu {
    height: 100%;
  }
  .el-menu-item {
    font-size: 15px !important;
    height:75 !important;
    font-family: 微软雅黑 !important;
  }
  .el-menu-vertical-demo{
    height: 100%;
    vertical-align: middle;

  }
  .el-container{
    height: 100%;
  }
  .el-aside {
    /* background-color: #D3DCE6; */
    text-align: center;
    line-height: 200px;
    height:100%;
  }
</style>