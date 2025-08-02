<template>
  <div id="main">
    <el-card class="box-card" v-loading="loading">
      <div style="height:40px;">
        <span style="float:left;">python算法</span>
        <div>
          <el-button type="primary" @click="runAlgorithm"
            style="float:right;margin-right:5px;margin-top:4px;">开始运行算法</el-button>
        </div>
      </div>

      <el-divider></el-divider>

      <el-form id="form" ref="form" :model="form" label-position="left" label-width="160px">

        <el-form-item label="选择模型">
          <el-select v-model="form.name" placeholder="请选择模型">
            <el-option label="1-3" value="1-3"></el-option>
            <el-option label="3-1-2" value="3-1-2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结果">
          <el-input v-model="form.output" type="textarea" :rows="10" disabled></el-input>
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
      loading: false,
      form: {
        name: "1-3",
        output: "",
      },
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
        // 监听socket连接
        this.send("findAll")
        // 监听socket消息
        this.socket.onmessage = this.getInput;
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
    getInput(msg) {
      console.log("==websocket接收数据==");
      console.log(msg.data);
    },
    getAloOutput(msg) {
      console.log("==websocket接收数据==");
      console.log(msg.data);

      try {
        let returnData = JSON.parse(msg.data);

        if (returnData.status) {
          this.$message({
            message: '算法运行成功',
            type: 'success'
          });
          this.form.output = returnData.ret;
        }
        else {
          this.$message.error(returnData.cause);
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false;
      }
    },
    // 关闭socket
    close() {
      console.log("socket已经关闭");
    },
    async runAlgorithm() {
      this.loading = true;
      this.socket.onmessage = this.getAloOutput;
      let data = JSON.stringify({
        name: this.form.name,
      })

      this.send("execAloPython");
      this.send(data);
    },
    clearVariables() {
      this.send("clearMatlab")
      this.send(JSON.stringify(this.form.x))
    }
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

.el-scrollbar__wrap {
  margin-bottom: 0px !important;
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
  margin-left: 20px;
  width: 70%;
  text-align: left;
}

.el-form-item__label {
  font-size: 15px !important;
}

.el-form-item__content {
  font-size: 16px !important;
}
</style>