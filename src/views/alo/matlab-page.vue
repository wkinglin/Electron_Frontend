<template>
  <div id="main">
    <el-card class="box-card">
        <div style="height:40px;">
          <span style="float:left;">联合作战</span>
          <div>
            <el-button type="primary" @click="clearVariables" style="float:right;margin-right:5px;margin-top:4px;">清空变量域</el-button>
            <el-button type="primary" @click="UploadFile" style="float:right;margin-right:5px;margin-top:4px;">开始运行算法</el-button>
          </div>
        </div>
        
        <el-divider></el-divider>

        <el-form id="form" ref="form" :model="form" label-position="left" label-width="160px">
          
          <el-form-item label="请选择算法">
            <el-select style="float:left;height:auto" v-model="form.name" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上传文件">
            <el-upload class="upload-demo" drag action="" :file-list="fileList" :on-change="handleChange" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>。</div>
            </el-upload>
          </el-form-item>
          
          <!-- <el-form-item label="算法输出结果">
            <el-input  v-model="form.output" :rows="4" type="textarea" readOnly='true' placeholder="结果"></el-input>
          </el-form-item> -->
        </el-form>

    </el-card>
  </div>    
</template>

<script>
  export default {
    data() {
        return {
          message:"",
          json:"",
          form: {
              name:"",
              output:"",
          },
          fileList:[],
          options: [
            {
              key:0,
              value: 'lianhe',
              label: '联合作战'
            }, 
            {
              key:1,
              value: 'feiji',
              label: '飞机'
            }, 
            {
              key:2,
              value: 'quzhu',
              label: '驱逐舰'
            }],
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
          this.socket=this.global.ws
          console.log(this.socket)
          // this.socket = new WebSocket(this.path);
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
      receive(msg){
        console.log("==websocket接收数据==");
        console.log(msg.data);
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
      getUploadOutput(msg){
        console.log("==websocket接收数据==");
        console.log(msg.data);

        let returnData = JSON.parse(msg.data);

        if(returnData.status == "success"){
          this.$message({
            message: '成功上传',
            type: 'success'
          });
        }
        else{
          this.$message.error(returnData.cause);
        }
        
      },
      getAloOutput(msg){
        console.log("==websocket接收数据==");
        console.log(msg.data);

        let returnData = JSON.parse(msg.data);

        if(returnData.status == "success"){
          this.$message({
            message: '成功上传',
            type: 'success'
          });
          this.form.output = returnData.ret;
        }
        else{
          this.$message.error(returnData.cause);
        }
      },
      // 关闭socket
      close() {
        console.log("socket已经关闭");
      },
      async handleChange (file) {
        
        this.fileList = [file],
        this.blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
        console.log('blob', this.blob);

        this.socket.onmessage = this.getUploadOutput;

        if(this.fileList.length <= 0){
            this.$message.error('请选择文件');
            return
        }
        var reader = new FileReader();

        this.send("upLoadTxt");
        reader.readAsText(this.fileList[0].raw);
        console.log(this.fileList[0].raw.path);
        let data = JSON.stringify({
                name:this.form.name,
                path:this.fileList[0].raw.path,
            })
        this.send(data);
        console.log(data);
      },
      async UploadFile () {
        this.socket.onmessage = this.getAloOutput;
        let data = JSON.stringify({
          name: this.form.name,
        })

        this.send("execLianhe");
        this.send(data);
      },
      getOutput(msg){
        console.log(msg)
      },
      clearVariables(){
        this.send("clearMatlab")
        this.send(JSON.stringify(this.form.x))
      }
    }
  }
</script>

<style>
    .el-drawer{
      padding:20px;
    }
    .el-tooltip__popper{
      max-width:40%;
    }
    .el-tooltip__popper,.el-tooltip__popper.is-dark{
      background:#3399ff !important;
      color: #fff !important;
      line-height: 24px;
      font-size: 15px;
    }
    .el-scrollbar__wrap{
      margin-bottom:0px !important;
    }
    .tableLimit tr td .cell{
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;      /*可以显示的行数，超出部分用...表示 */
      -webkit-box-orient: vertical; 
    }
    body .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    #main{
        margin-top: 0px;
        font-size: 18px;
        font-family: "微软雅黑";
    }
    #word {
      width: 20%;
      height: 50px;
      line-height:50px;
      font-size: 15px;
      margin-right:0px ;
    }
    #form {
        margin-top:40px;
        margin-right: 20px;
        margin-left:20px;
        width:90%
    }
    .el-form-item__label{
      font-size: 15px!important;
    }
    .el-form-item__content{
      font-size: 16px!important;
    }
</style>