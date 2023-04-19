<template>
  <div class="breadDiv" id="domBread">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for='(name,index) in matchedArr' :key='index'>
        {{`${name}`}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name:"bread-crumb",
    data() {
      return {
        breadList: []
      };
    },
    computed:{
        matchedArr(){
            let temp = [],temps = [];
            this.$route.matched.filter((item) => {
                // if(item.meta.title){
                //     const title = item.meta.title;
                //     temp.push(title);
                // }
                if(item.name&&item.name!='Home'){
                    const name = item.name;
                    temp.push(name);
                }
            });
            temp.filter((item) => {
                if(!temps.includes(item)){
                    temps.push(item);
                }
            })
            return temps;
        }
    }
    // watch: {
    //   $route: {
    //     handler(route) {
    //       let allList = route.matched.filter(item => {
    //         if (item.meta && item.meta.title) {
    //           if (item.redirect) {
    //             item.path = "";
    //           }
    //           return true;
    //         }
    //       });
    //       if (allList[0].path !== "/" && allList[0].path !== "/dashbord") {
    //         allList.unshift({ path: "/", meta: { title: "首页" } });
    //       }
    //       this.breadList = allList;
    //     },
    //     immediate: true
    //   }
    // }
};
</script>

<style>
    .breadDiv{
      float: left;
      margin: 22px 0 0 20px;
    }
    .el-breadcrumb{
      font-size: 16px;
      line-height: 1;
      font-family: "微软雅黑" !important;
    }
    .el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color: #397cf6 !important;		
        font-size: 16px !important;		
    }
</style>
