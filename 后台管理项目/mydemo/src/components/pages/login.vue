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
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userInfo.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="userInfo.pass" show-password clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "",
        pass: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        pass: [
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
          if (this.userInfo.name == "admin" && this.userInfo.pass == "123456") {
            this.$message.success("登录成功");
            //登录成功之后就要跳转到index
            this.$router.push("/home");
          } else {
            this.$message.error("用户名或者密码错误");
          }
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
