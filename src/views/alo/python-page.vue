<template>
  <div id="main">
    <el-card class="box-card"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading">
        <div style="height:40px;">
          <span style="float:left;">信息域</span>
          <el-button type="primary" @click="submit" style="float:right;margin-right:5px;margin-top:4px;">开始运行算法</el-button>
        </div>
        
        <el-divider style="margin:;"></el-divider>

        <el-steps :active="steps" align-center>
          <el-step title="数据处理" icon="el-icon-edit"></el-step>
          <el-step title="运行实验" icon="el-icon-upload"></el-step>
          <el-step title="结果验证" icon="el-icon-picture"></el-step>
        </el-steps>

        <el-form v-if="steps == 1" id="form" ref="form" :model="form" label-position="left" label-width="160px">
          <!-- <el-form-item label="请输入">
            <el-input  v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item> -->
          <el-form-item label="上传文件">
            <el-upload class="upload-demo" drag action="" :file-list="fileList" :on-change="handleupload" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>。</div>
            </el-upload>
          </el-form-item>
          
          <!-- <el-form-item label="算法输出结果">
            <el-input  v-model="form.output" :rows="4" type="textarea" readOnly='true' placeholder="结果"></el-input>
          </el-form-item> -->
        </el-form>

        <div v-if="steps == 2"
          style="height:200px;width: 100%;">
          <span>执行深度神经网络</span>
        </div>
        
        <div v-if="steps == 3"
          style="width: 80%;padding:20px;">
          <el-input type="textarea" :rows="12" v-model="transEVerify" ></el-input>
            
        </div>
    </el-card>
  </div>    
</template>

<script>
  export default {
    data() {
        return {
          steps:1,
          message:"",
          json:"",
          form: {
              username:[],
              input:[],
              output:"",
          },
          fileList:[],
          loading:false,
          request:"",
          transEVerify:"",
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
          this.socket.onmessage = this.getMessage;
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
        this.message = msg;
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
      getUpload(msg) {
        console.log("==websocket接收数据==");
        console.log(msg.data);
        let data = msg.data;
        if(JSON.parse(data).status){
          this.$message({
            message: '成功上传',
            type: 'success'
          }); 
        }
        else this.$message.error("上传失败") 
      },
      getMessage(msg) {
        console.log("==websocket接收数据==");
        console.log(msg.data);
        if(msg.data == undefined) return;
        let data = msg.data;
        this.request = msg.data;
        if(JSON.parse(data).status){
          this.loading=false;
          if(this.steps != 3) this.steps++;
          else{
            this.transEVerify=JSON.parse(msg.data).output;
          }
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
      },
      async UploadFile () {
        if(this.fileList.length <= 0){
            this.$message.error('请选择文件');
            throw new Error('请选择文件');
        }
        var reader = new FileReader();
        reader.readAsText(this.fileList[0].raw);
        let data = JSON.stringify({
                path:this.fileList[0].raw.path,
            })
        this.send(data);
        console.log(data);
      },
      getOutput(msg){
        console.log(msg)
      },
      handleupload(file){
        this.socket.onmessage = this.getUpload;
        this.fileList = [file],
        this.blob = new Blob([JSON.stringify(file)], { type: 'application/json' });
        console.log('blob', this.blob);
        this.send("upload5");
        this.UploadFile();
      },
      submit(){
        if(this.steps == 1){
          if(this.fileList.length <= 0){
            this.$message.error('请选择文件');
            return;
          }
          this.socket.onmessage = this.getMessage;
          this.loading = true;
          this.send("processEntityAndRelation"); 
        }
        else if(this.steps == 2){
          this.send("transE");
          let data={
            name:"transE"
          };
          this.send(JSON.stringify(data));
          this.loading = true;
        }
        else{
          this.send("transEVerify");
        }
      },
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

    .upload-demo{
      float:left;
    }
</style>