<template>
  <div>
    <top></top>
    <van-cell-group style="margin-top:100px">
      <van-field
        v-model="userInfo.nickname"
        name="昵称"
        label="昵称:"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
        style="margin-bottom:20px;font-size:0.3rem"
      />
      <van-field
        v-model="userInfo.phone"
        name="手机号"
        label="手机号:"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
        style="margin-bottom:20px;font-size:0.3rem"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码:"
        placeholder="密码"
        right-icon="question-o"
        @click-right-icon="$toast('密码必须是数字、字母、下划线')"
        :rules="[{ required: true, message: '请填写密码' }]"
        style="margin-bottom:20px;font-size:0.3rem"
      />
      <van-field
        v-model="ccode"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        style="margin-bottom:20px;font-size:0.3rem"
      >
        <template #button>
          <van-button size="middle" plain type="primary" @click="handleCode">{{
            ccode
          }}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button
          block
          color="#f26b11"
          native-type="submit"
          @click="subInfo()"
          style="font-size:0.35rem; width:3rem;margin:0 auto"
          >注册</van-button
        >
      </div>
    </van-cell-group>
    <router-link to="/login" class="jump">已有账号，去登录></router-link>
  </div>
</template>

<script>
// 引入轻提示框
import { Toast } from "vant";
import { register } from "../../util/axios";
export default {
  data() {
    return {
      ccode: "",
      userInfo: {
        nickname: "",
        phone: "",
        password: ""
      }
    };
  },
  // 随机生成验证码，在页面一加载完毕就执行该函数生成一个验证码。
  mounted() {
    this.generatedCode();
  },
  methods: {
    subInfo(userInfo) {
      console.log(this.userInfo);
      // 调取接口
      register(this.userInfo).then(res => {
        if (res.data.code == 200) {
          Toast.success(res.data.msg);
          this.userInfo = {
            nickname: "",
            phone: "",
            password: ""
          };
          this.$router.push("/login");
        } else if (res.code == 500) {
          Toast.fail(res.data.msg);
        } else {
          Toast.fail(res.data.msg);
        }
      });
    },
    // 生成验证码
    generatedCode() {
      const random = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let code = "";
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.ccode = code;
    },
    // 点击生成验证码
    handleCode() {
      this.generatedCode();
    }
  }
};
</script>

<style lang="" scoped>
.jump {
  float: right;
  font-size: 0.3rem !important;
  margin-right: 0.6rem;
  color: #f26b11;
}
.van-field__label,
.van-cell__title {
  width: 0.4rem;
}
</style>
