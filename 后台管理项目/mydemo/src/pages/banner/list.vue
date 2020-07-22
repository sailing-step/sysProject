<template>
  <div>
    <el-table
      :data="getStateBannerList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>
      <el-table-column prop="url" label="图片">
        <template slot-scope="item">
          <img class="imgInfo" :src="$imgUrl + item.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启动</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" size="small" @click="update(item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(item.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入菜单接口
import { getbannerDelete } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getStateBannerList"])
  },
  mounted() {
    this.getActionBannerList();
  },
  methods: {
    ...mapActions(["getActionBannerList"]),
    //点击添加按钮修改父组件数据
    update(id) {
      this.$emit("edit", {
        isAdd: false,
        dialogIsShow: true,
        id
      });
    },
    del(id) {
      console.log(id, "删除事件");
      this.$confirm("你确定删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getbannerDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getActionBannerList(); // 删除成功重新获取数据渲染
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="" scoped>
.imgInfo {
  width: 150px;
}
</style>
