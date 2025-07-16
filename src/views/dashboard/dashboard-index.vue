<template>
  <div>
    <el-card class="box-card" style="border-radius: 12px">
      <h2>实验室软件</h2>
      <p>本软件集成了多种功能,包括大数据分析,图分析等等</p>
    </el-card>
    <!-- <div class="small-box">
      <el-row class="rowLayout" :gutter="20">
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('algTable')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">查看算法</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('newTable')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">新建数据库</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/create')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">创建算法</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="small-box">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/flowChart')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">查看流程</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/upLoad')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">上传文件</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/flowChart')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">查看产品树</span>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>

    <div class="small-box">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/seePicture')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">自定义框图</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/calHotAndCold')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">计算冷热备份可靠度</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style = "border-radius: 12px;cursor:pointer;" @click="goTo('/document')">
            <i class="el-icon-more" style = "float:right"></i>
            <div style = "float:left;margin-bottom:20px;">
              <span>
                <el-image style="width: 40px; height: 40px;vertical-align: middle;" :src="require('@/assets/icon.png')"></el-image>
              </span>
              <span class="image-font">查看用户手册</span>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "ws://127.0.0.1:9090/",
    }
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      }
      else {
        console.log("start")

        this.socket = new WebSocket(this.path);
        this.global.setWs(this.socket);
        this.socket = this.global.ws;
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
      }
    },
    open() {
      console.log("socket连接成功");
    },
    // socket连接失败
    error() {
      console.log("连接错误");
    },
    close: function () {
      this.send("close");
      console.log("socket已经关闭")
    },
    goTo(pa) {
      this.$router.push({
        path: pa,
      })
    }
  }
}
</script>

<style>
.rowLayout {
  width: auto;
}

.small-box {
  margin-left: 50px;
  margin-top: 20px;
  margin-right: 50px;
}

.image-font {
  font-family: "宋体";
  font-size: 16px;
  font-weight: bold;
}
</style>