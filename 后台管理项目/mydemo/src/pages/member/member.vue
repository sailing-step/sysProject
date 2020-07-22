<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 表格信息 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹框内容 -->
    <v-add ref="vAdd" :dialogIsShow="dialogIsShow" @cancel="cancel"></v-add>
  </div>
</template>

<script>
//引入面包屑组件
import breadCrumb from "../../components/common/breadcrumb";
//引入list组件
import vList from "./list";
//引入弹框
import vAdd from "./add";
export default {
  data() {
    return {
      dialogIsShow: false //是否出现弹框
    };
  },
  methods: {
    // 关闭弹框事件
    // add 子传父，修改父级数据
    cancel(e) {
      this.dialogIsShow = e;
    },
    //list组件传值并修改数据
    edit(e) {
      this.dialogIsShow = e.dialogIsShow;
      this.$refs.vAdd.update(e.uid);
    }
  },
  components: {
    breadCrumb,
    vList,
    vAdd
  }
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin-bottom: 10px;
}

.el-input {
  width: 85%;
}
</style>
