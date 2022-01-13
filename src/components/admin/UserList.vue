<template>
  <div>用户列表
<!--  面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    用户列表主体部分-->
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!--      搜索区域-->
          <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!--      搜索按钮-->
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
<!--      用户列表 border边框 stripe隔行变色-->
      <el-table :data="loginList" border stripe>
<!--        索引页-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户id" prop="id"></el-table-column>
        <el-table-column label="用户密码" prop="passwd"></el-table-column>
        <el-table-column label="用户类别" prop="identity"></el-table-column>
        <el-table-column label="用户状态" prop="state">
<!--          作用域插槽-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column lable="操作">
          <template slot-scope="scope">
<!--            修改-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
<!--            删除-->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
<!--            权限-->
            <el-tooltip type="dark" content="分配权限" placement="top-start" :enterable="false">
              <el-button type="waring" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
<!--      分页组件-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 100]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </el-card>
<!--    新增用户区域-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="addForm.passwd"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="identity">
          <el-input v-model="addForm.identity"></el-input>
        </el-form-item>
      </el-form>
<!--      内容底部操作-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>
<!--    修改对话框-->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="id" disabled>
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="editForm.passwd"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="identity">
          <el-input v-model="editForm.identity"></el-input>
        </el-form-item>
      </el-form>
      <!--      内容底部操作-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserList();
  },
  data(){
    return{
      //查询信息实体
      queryInfo:{
        query:"",
        pageNum:1,
        pageSize:10,
      },
      loginList:[],//用户列表
      total:0,//总记录数
      addDialogVisible:false,//对话框状态
      //添加表单信息
      addForm:{
        id:'',
        passwd:'',
        identity:''
      },
      //修改用户信息
      editForm:{},
      //显示/隐藏修改用户栏
      editDialogVisible:false,
      //添加表单验证
      addFormRules:{
        id: [
          {required:true,message:"请输入用户名",trigger:'blur'},//必须验证项
          {min:1,max:10,message: '长度在1到10个字符',trigger: 'blur'}//长度验证
        ],
        passwd: [
          {required:true,message:"请输入密码",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到10个字符',trigger: 'blur'}//长度验证
        ],
        identity: [
          {required:true,message:"请输入身份",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到10个字符',trigger: 'blur'}//长度验证
        ],
      },
      //修改表单验证
      editFormRules:{
        passwd: [
          {required:true,message:"请输入密码",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到10个字符',trigger: 'blur'}//长度验证
        ],
        identity: [
          {required:true,message:"请输入身份",trigger:'blur'},//必须验证项
          {min:0,max:10,message: '长度在0到10个字符',trigger: 'blur'}//长度验证
        ],
      },
    };
  },
  methods: {
    //获取所有用户
    async getUserList() {
      console.log(123)
      const {data: res} = await this.$http.get("alllogin", {params: this.queryInfo});
      this.loginList = res.data;
      this.total = res.numbers;
    },
    //最大数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    //pagenumber的触发动作
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    // 修改用户状态
    async userStateChanged(userinfo) {
      const {data: res} = await this.$http.put(
          `userState?id=${userinfo.id}&state=${userinfo.state}`
      );
      if (res != "success") {
        userinfo.state = !userinfo.state;
        return this.$message.error("操作失败！！！");
      }
      this.$message.success("操作成功！！！");
    },
    //监听添加用户
    addDialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    addUser(){
      this.$refs.addFormRef.validate(async valid=>{
        if(!valid)
          return;
        const {data:res} = await this.$http.post("addUser",this.addForm);
        if(res!= "success"){
          return this.$message.error("操作失败！！！");
        }
        this.$message.success("操作成功！！！");
        this.addDialogVisible=false;
        this.getUserList();
      });
    },
    //根据主键删除用户信息
    async deleteUser(id){
      const confirmResult=await this.$confirm('此操作将永久删除用户，是否继续?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'waring'
      }).catch(err=>err)
      if(confirmResult!='confirm'){
        return this.$message.info("已取消删除");
      }
      const {data:res}=await this.$http.delete("deleteUser?id="+id);
      if(res!= "success"){
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功！");
      this.getUserList();
    },
    //显示对话框
    async showEditDialog(id){
      const {data:res}=await this.$http.get("getupdate?id="+id);
      this.editForm=res;//查询出用户信息反填回编辑表单
      this.editDialogVisible=true;//开启编辑对话框
    },
    //关闭窗口
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();//重置信息
    },
    //确认修改
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid =>{
        if(!valid) return;
        //发起修改请求
        const {data:res}=await this.$http.put("edituser",this.editForm);
        if(res!="success")
          return this.$message.error("操作失败!");
        this.$message.success("操作成功");
        //隐藏
        this.editDialogVisible=false;
        this.getUserList();
      })
    },
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 17px;
}
</style>