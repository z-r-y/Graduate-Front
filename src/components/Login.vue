<template>
<div class="login_container">
<!--登录块-->
  <div class="login_box">
<!--头像-->
    <div class="avatar_box">
      <img src="../assets/logo.png" alt/>
    </div>
<!--表单区域-->
    <el-form ref="loginformRef" :rules="loginRules" class="login_form" :model="loginform" label-width="0">
<!--用户名-->
      <el-form-item prop="id">
        <el-input v-model="loginform.id" prefix-icon="iconfont icondenglu"></el-input>
      </el-form-item>
<!--密码-->
      <el-form-item prop="passwd">
        <el-input v-model="loginform.passwd" prefix-icon="iconfont iconmima" type="password"></el-input>
      </el-form-item>
<!--按钮-->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">提交</el-button>
        <el-button type="info" @click="resetLoginForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      //表单数据对象
      loginform:{
        id:"",
        passwd:""
      },
      //验证对象
      loginRules:{
        username: [
          {required:true,message:"请输入用户名",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到5个字符',trigger: 'blur'}//长度验证
        ],
        password: [
          {required:true,message:"请输入密码",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到5个字符',trigger: 'blur'}//长度验证
        ],
      },
    }
  },
  methods:{
    //重置
    resetLoginForm(){
      this.$refs.loginformRef.resetFields();
    },
    //登录方法
    login(){
      //校验规则
      this.$refs.loginformRef.validate(async valid => {
        if (!valid)
          return;
        const {data:res}=await this.$http.post("login",this.loginform);
        if(res.flag == "ok"){
          this.$message.success("操作成功！！！");
          this.$router.push({path:"/home"});
          window.sessionStorage.setItem("login",res.l);
        }else {
          this.$message.error("操作失败");
        }
      })
    }
  },
}
</script>

<style  scoped>
/*根节点样式*/
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.avatar_box{
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 2px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #0ee;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>