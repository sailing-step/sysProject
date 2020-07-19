<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            :index="item.id.toString()"
            v-for="item in getStateMenuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="menu.url"
              v-for="menu in item.children"
              :key="menu.id"
              >{{ menu.title }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMenuList } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home"
    };
  },
  computed: {
    ...mapGetters(["getStateMenuList"])
  },
  mounted() {
    //   组件挂载
    // 更改选中的默认值
    console.log(this.$route, "路由元信息");
    // 地址是什么就默认选中什么
    this.defaultActive = this.$route.path;
    // 页面一加载就调取菜单列表
    // getMenuList({ istree: 1 }).then(res => {
    //   if (res.data.code == 200) {
    //     this.navList = res.data.list;
    //   }
    // });
    this.getActionMenuList();
  },
  methods: {
    // bug 第一次启动服务，侧边栏不显示， 因为默认是home页。第一次加载的时候先触发一次，先渲染一下
    // vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，vuex里面的数据就会被重新赋值
    ...mapActions(["getActionMenuList"])
  }
};
</script>

<style lang="stylus" scoped>
.el-menu {
  min-height: 500px;
}
</style>
