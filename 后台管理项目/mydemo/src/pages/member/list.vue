<template>
  <div>
    <el-table
      :data="getStateMemberList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启动</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button type="primary" size="small" @click="update(item.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getStateMemberList"])
  },
  mounted() {
    this.getActionMemberList();
  },
  methods: {
    ...mapActions(["getActionMemberList"]),
    //点击添加按钮修改父组件数据
    update(uid) {
      console.log(uid);
      this.$emit("edit", {
        dialogIsShow: true,
        uid
      });
    }
  }
};
</script>

<style lang="" scoped></style>
