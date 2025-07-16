<template>
  <div id="main">
    <el-card class="box-card" v-loading="loading">
      <div style="height:40px;">
        <span style="float:left;">作战体系验证与评估</span>
        <el-button type="primary" @click="submit"
          style="float:right;margin-right:5px;margin-top:4px;">开始运行算法</el-button>
      </div>

      <el-divider style="margin:0;"></el-divider>

      <el-form id="form" ref="form" :model="form" label-position="left" label-width="160px">

        <el-form-item label="算法输出结果">
          <el-input v-model="form.output" :rows="6" type="textarea" readOnly='true' placeholder="结果"></el-input>
        </el-form-item>

      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      json: "",
      form: {
        output: "",
      },
      fileList: [],
      loading: false,
    }
  },
  mounted() {
    //初始化
    this.init();
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        console.log("start")
        // 实例化socket
        this.socket = this.global.ws
        console.log(this.socket)
        // this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.send("findAll")
        // 监听socket消息
        this.socket.onmessage = this.getOutput;
      }
    },
    // socket连接成功
    open() {
      console.log("socket连接成功");
      this.send("findAll")
    },
    send(ms) {
      this.socket.send(ms);
    },
    // socket连接失败
    error() {
      console.log("连接错误");
    },
    // 接收消息
    getOutput(msg) {
      console.log("==websocket接收数据==");
      console.log(msg.data);
      let data = msg.data;
      if (JSON.parse(data).status) {
        this.$message({
          message: '成功上传',
          type: 'success'
        });
        this.form.output = JSON.parse(data).ret;
      }
      else if (JSON.parse(data).status == false) {
        this.$message.error("上传失败");
      }
      this.loading = false;
    },
    // 关闭socket
    close() {
      console.log("socket已经关闭");
    },
    async submit() {
      this.send("execTest");
      this.loading = true;
    },
  }
}
</script>

<style>
.el-drawer {
  padding: 20px;
}

.el-tooltip__popper {
  max-width: 40%;
}

.el-tooltip__popper,
.el-tooltip__popper.is-dark {
  background: #3399ff !important;
  color: #fff !important;
  line-height: 24px;
  font-size: 15px;
}

.tableLimit tr td .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /*可以显示的行数，超出部分用...表示 */
  -webkit-box-orient: vertical;
}

body .el-scrollbar__wrap {
  overflow-x: hidden;
}

#main {
  margin-top: 0px;
  font-size: 18px;
  font-family: "微软雅黑";
}

#word {
  width: 20%;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  margin-right: 0px;
}

#form {
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 20px;
  width: 90%
}

.el-form-item__label {
  font-size: 15px !important;
}

.el-form-item__content {
  font-size: 16px !important;
}

.upload-demo {
  float: left;
}
</style>