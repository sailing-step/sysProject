<template>
  <div>
    <el-container>
      <el-header>XXXX大型后台管理项目</el-header>
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
  }
};
</script>

<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.el-header {
  background-color: $bgColorSecond;
}

.el-menu {
  min-height: 500px;
}
</style>
