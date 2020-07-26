<template>
  <div>
    <top></top>
    <van-cell-group style="margin-top:100px">
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
        :rules="[{ required: true, message: '请填写密码' }]"
        style="margin-bottom:20px;font-size:0.3rem"
      />

      <div style="margin: 16px;">
        <van-button
          block
          color="#f26b11"
          native-type="submit"
          style="font-size:0.35rem; width:3rem;margin:0 auto"
          @click="subInfo"
        >登录</van-button>
      </div>
    </van-cell-group>
    <router-link to="/register" class="jump">去注册></router-link>
  </div>
</template>

<script>
import { login } from "../../util/axios";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    subInfo(userInfo) {
      // 调取接口
      login(this.userInfo).then((res) => {
        if (res.data.code == 200) {
          this.$toast(res.data.msg);
          //把登录信息存储到本地存储中
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.list));
          this.$router.push("/home");
        } else {
          this.$toast(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.jump {
  float: right;
  font-size: 0.3rem !important;
  margin-right: 0.6rem;
  color: #f26b11;
}
.van-field__label {
  width: 4em !important;
}
</style>
