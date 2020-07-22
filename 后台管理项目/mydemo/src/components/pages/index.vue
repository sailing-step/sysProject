<template>
  <div>
    <el-container>
      <el-header
        >XXXX大型后台管理项目
        <div class="info">
          <div class="username">
            {{ getName }}
          </div>
          <el-button type="danger" size="small" @click="logOut">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <navbar></navbar>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navbar from "../common/nav.vue";
export default {
  data() {
    return {};
  },
  components: {
    navbar
  },
  computed: {
    getName() {
      let data = "";
      data = sessionStorage.getItem("userInfo")
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : "";
      return data.username;
    }
  },
  methods: {
    // 退出事件
    logOut() {
      sessionStorage.removeItem("userInfo");
      // 跳转到登录页
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-header {
  background-color: $bgColorSecond;
  color #333
  line-height 60px
}
.info
  float right
  margin-right 20px
  color #fff
  .username
    float left
.el-button {
  float left
  margin 15px
}
.el-menu {
  min-height: 500px;
}
</style>
