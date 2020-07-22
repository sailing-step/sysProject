<template>
  <div>
    <el-table
      :data="getStateGoodsList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="图片"></el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="item">
          <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
          <el-tag v-if="item.row.isnew == 2" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
          <el-tag v-if="item.row.ishot == 2" type="danger">否</el-tag>
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
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="pageInfo.size"
      @current-change="getPage"
    ></el-pagination>
  </div>
</template>

<script>
// 引入菜单接口
import { getgoodsDelete, getgoodsCount } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      count: 0, //总条目
      pageInfo: {
        //分页数据
        size: 2, //代表一个页面查询2条数据
        page: 1 //一共有多少页面
      }
    };
  },
  computed: {
    ...mapGetters(["getStateGoodsList"])
  },
  mounted() {
    //组件一加载就调取商品接口
    //触发才调取vuex中的商品列表
    this.getCount();
  },
  methods: {
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
          getgoodsDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getActionGoodsList(); // 删除成功重新获取数据渲染
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
    },
    //封装获取总条目接口
    getCount() {
      //调取总条数接口
      getgoodsCount().then(res => {
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          //如果当前不是第一页并且只有一条数据，我就让页面数量--
          if (this.pageInfo.page != 1 && this.getStateGoodsList.length == 1) {
            this.pageInfo.page--;
          }
          //调取获取商品规格接口列表的行动
          this.$store.dispatch("getActionGoodsList", this.pageInfo);
        }
      });
    },
    getPage(n) {
      // n是当前点击的页码
      this.pageInfo.page = n;
      // 重新调取列表页面
      this.$store.dispatch("getActionGoodsList", this.pageInfo);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-pagination {
  float: right;
  margin-top: 10px;
}
</style>
