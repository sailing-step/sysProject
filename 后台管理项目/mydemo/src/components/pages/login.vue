<template>
  <div class="bg-login">
    <div class="loginBox">
      <h1 class="head">XXXX后台管理系统</h1>
      <!-- 表单视图 -->
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm login"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="userInfo.password"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 获取登录接口
import { getuserLogin } from "../../util/axios";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入6-16正确密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      console.log(this.userInfo, "表单对象");
      //validate 它的验证是基于什么都不填直接登录的一个验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          //调取登录接口
          getuserLogin(this.userInfo).then(res => {
            console.log(res, "返回信息");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //把登录信息存储到本地存储中
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
              //登录成功之后就要跳转到index
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.bg-login {
  width: 100vw;
  height: 100vh;
  background: $bgColorFirst;

  .loginBox {
    width: 450px;
    height: 300px;
    border: 1px solid #778899;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -150px;
    margin-left: -225px;
    background: $bgColorDefault;
    border-radius: 10px;

    .head {
      text-align: center;
      color: #666;
    }

    .login {
      padding: 0 20px;

      .el-input {
        width: 300px;
      }
    }
  }
}
</style>
