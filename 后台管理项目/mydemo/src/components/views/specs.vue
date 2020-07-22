<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button type="primary" size="small" @click="add">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table :data="getStateSpecsList" border style="width: 100%">
      <el-table-column prop="id" label="规格编号"></el-table-column>
      <el-table-column prop="specsname" label="规格名称"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <el-tag v-for="val in item.row.attrs" :key="val" type="info">{{
            val
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button size="small" type="primary" @click="update(item.row.id)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="del(item.row.id)"
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
    <!--弹出内容  -->
    <el-dialog
      :title="isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="dialogIsShow"
      center
    >
      <el-form :model="specsInfo" :rules="rules" ref="specsInfo">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="specsInfo.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in specsArr"
          label="规格属性"
          :key="item.value"
          :label-width="formLabelWidth"
        >
          <el-input style="width:70%" v-model="item.value"></el-input>
          <el-button v-if="index == 0" type="primary" @click="addSpecs"
            >新增规格属性</el-button
          >
          <el-button v-else @click="removeSpecs(item)">删除</el-button>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="specsInfo.status" label="1">启用</el-radio>
          <el-radio v-model="specsInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIsShow = false">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('specsInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('specsInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "../common/breadcrumb";
import {
  getspecsAdd,
  getspecsCount,
  getspecsEdit,
  getspecsInfo,
  getspecsDelete
} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 动态表单域
      specsArr: [
        {
          value: ""
        }
      ],
      editId: 0,
      // 接收总条目
      count: 0,
      // 分页数据
      pageInfo: {
        size: 2, // 代表一个页面查询2条数据
        page: 1 // 一共有多少页面。初始值为1
      },
      isAdd: true, // 添加
      specsInfo: {
        specsname: "",
        attrs: "",
        status: "1"
      },
      dialogIsShow: false, //是否出现弹框
      formLabelWidth: "100px",
      rules: {
        specsname: [
          {
            required: true,
            message: "请输入规格名称",
            trigger: "blur"
          }
          // {
          //   min: 2,
          //   max: 16,
          //   message: "长度在 2 到 16 个字符",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateSpecsList"])
  },
  mounted() {
    this.getCount();
  },
  methods: {
    // 添加表单
    addSpecs() {
      // 根据产品需求对添加规格属性进行限制,最多添加6个规格
      if (this.specsArr.length <= 6) {
        // 直接在规格属性数组中添加对象
        this.specsArr.push({
          value: ""
        });
      } else {
        this.$message.warning("最多添加6个规格！");
      }
    },
    // 移除属性
    removeSpecs(item) {
      var index = this.specsArr.indexOf(item);
      if (index !== -1) {
        this.specsArr.splice(index, 1);
      }
    },
    reset() {
      this.specsInfo = {
        specsname: "",
        // attrs: "",
        status: "1"
      };
      // 清除动态表单
      this.specsArr = [{ value: "" }];
    },
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    update(id) {
      this.dialogIsShow = true;
      this.isAdd = false;
      this.editId = id;
      getspecsInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          //对返回的数据类型进行转化
          this.specsInfo = res.data.list[0];
          this.specsInfo.attrs.map((item, i) => {
            if (i == 0) {
              this.specsArr[0].value = item;
            } else {
              this.specsArr.push({
                value: item
              });
            }
          });
          this.specsInfo.status = this.specsInfo.status.toString();
        }
      });
    },
    del(id) {
      this.$confirm("你确定要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除逻辑
          getspecsDelete({ id }).then(res => {
            if (res.data.code == 200) {
              //重新调取接口列表
              this.getCount();
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
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.specsInfo, "表单数据");
          // 对提交数据进行转化 '红色，白色，黑色'
          let data = this.specsInfo;
          // data.attrs = this.specsArr
          // 对规格属性数组进行映射 映射成一个新数组 新数组有value
          let arr = this.specsArr.map(item => {
            return item.value;
          });
          // console.log(arr, "新数组");
          data.attrs = arr ? arr.join(",") : "";
          // console.log(data);
          // 根据isAdd的状态判断执行接口;
          if (this.isAdd) {
            // 调取添加接口
            getspecsAdd(this.specsInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getCount();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let data = this.specsInfo;
            data.id = this.editId;
            //调取更新接口
            getspecsEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getCount();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //封装获取总条目接口
    getCount() {
      //调取总条数接口
      getspecsCount().then(res => {
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          //如果当前不是第一页并且只有一条数据，我就让页面数量--
          if (this.pageInfo.page != 1 && this.getStateSpecsList.length == 1) {
            this.pageInfo.page--;
          }
          //调取获取商品规格接口列表的行动
          this.$store.dispatch("getActionSpecsList", this.pageInfo);
        }
      });
    },
    // 当页面发生变化的时候触发该方法
    getPage(n) {
      // n是当前点击的页码
      console.log(n);
      this.pageInfo.page = n;
      // 重新调取列表页面
      this.$store.dispatch("getActionSpecsList", this.pageInfo);
    }
  },
  components: {
    breadCrumb
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

.el-pagination {
  float: right;
  margin-top: 10px;
}

.newAdd {
  // width: 100px;
  margin-left: 10px;
}
</style>
