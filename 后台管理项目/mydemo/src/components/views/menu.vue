<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button type="primary" size="small" @click="add">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table
      :data="getStateMenuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="pid" label="上级菜单"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item
          label="菜单名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="menuInfo.title"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单"
          :label-width="formLabelWidth"
          prop="pid"
          placeholder="请选择菜单"
        >
          <el-select v-model="menuInfo.pid" placeholder="请选择">
            <el-option label="顶级菜单" :value="0">顶级菜单 </el-option>
            <el-option
              v-for="item in getStateMenuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >{{ item.title }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio
            :disabled="menuInfo.pid != 0"
            v-model="menuInfo.type"
            label="1"
            >目录</el-radio
          >
          <el-radio
            :disabled="menuInfo.pid == 0"
            v-model="menuInfo.type"
            label="2"
            >菜单</el-radio
          >
        </el-form-item>
        <el-form-item
          v-if="menuInfo.type == 1"
          label="菜单图标"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="menuInfo.icon"
            :disabled="menuInfo.pid != 0"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="menuInfo.type == 2"
          label="菜单地址"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="menuInfo.url"
            :disabled="menuInfo.pid == 0"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.status" label="1">启动</el-radio>
          <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('menuInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('menuInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 辅助性函数
import { mapActions, mapGetters } from "vuex";
// 引入菜单接口
import {
  // getMenuList,
  getMenuAdd,
  getMenuInfo,
  getMenuEdit,
  getMenuDelete
} from "../../util/axios";
import breadCrumb from "../common/breadcrumb";
export default {
  data() {
    return {
      editId: 0,
      isAdd: true,
      formLabelWidth: "100PX", // label宽度
      menuInfo: {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1"
      },
      tableData: [],
      dialogIsShow: false,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择菜单", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMenuList"])
  },
  mounted() {
    // 组件一加载，就调取接口
    // 触发才调取vuex中的菜单列表

    // this.getMenuList();
    this.getActionMenuList();
  },
  methods: {
    // 关闭弹框事件
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    reset() {
      this.menuInfo = {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: "1",
        status: "1"
      };
    },
    // 封装一个获取菜单列表事件
    // getMenuList() {
    //   getMenuList({ istree: 1 })
    //     .then(res => {
    //       if (res.data.code == 200) {
    //         this.tableData = res.data.list;
    //       }
    //       console.log(res, "响应结果");
    //     })
    //     .catch(err => {
    //       console.log(err, "错误拦截");
    //     });
    // },
    ...mapActions(["getActionMenuList"]),
    add() {
      // console.log("出现弹框");
      this.dialogIsShow = true;
      this.isAdd = true;
      this.reset();
    },
    update(id) {
      // console.log("弹出编辑窗口");
      this.dialogIsShow = true;
      this.isAdd = false;
      // 编辑给editId赋值
      this.editId = id;
      // 调取菜单查询一条数据
      // this.$http
      //   .get("/api/api/menuinfo", {
      //     params: {
      //       id
      //     }
      //   })
      getMenuInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.menuInfo = res.data.list;
          this.menuInfo.type = this.menuInfo.type.toString(); // 数据库里面是int类型
          this.menuInfo.status = this.menuInfo.status.toString(); // 数据库里面是int类型
        }
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
          // this.$http.post("/api/api/menudelete", { id })
          getMenuDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getActionMenuList(); // 删除成功重新获取数据渲染
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
    // 确定添加或者更新事件
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //根据isAdd状态去判断执行接口
          if (this.isAdd) {
            //调取添加接口
            // this.$http.post("/api/api/menuadd", this.menuInfo)
            getMenuAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionMenuList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            // id是必填项
            let data = this.menuInfo; // menuInfo里面没有id属性
            data.id = this.editId; // 添加id属性后传入后台
            // 调取更新接口
            // this.$http.post("/api/api/menuedit", data)
            getMenuEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionMenuList();
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
</style>
