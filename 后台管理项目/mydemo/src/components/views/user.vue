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
      :data="
        getStateUserList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      border
      style="width: 100%"
    >
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="roleid" label="所属角色"></el-table-column>
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
      :total="getStateUserList.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!--弹出内容  -->
    <el-dialog
      :title="isAdd ? '添加管理员' : '修改管理员'"
      :visible.sync="dialogIsShow"
      center
    >
      <el-form :model="menuInfo" :rules="rules" ref="menuInfo">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="menuInfo.roleid" placeholder="请选择">
            <el-option label="超级管理员" value></el-option>
            <el-option label="普通管理员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="menuInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="menuInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="menuInfo.status" label="1">启用</el-radio>
          <el-radio v-model="menuInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIsShow = false">取 消</el-button>
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
import breadCrumb from "../common/breadcrumb";
import { getUserAdd, getUserCount } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isAdd: true, // 添加
      tableData: [
        {
          uid: 0,
          username: "admin",
          roleid: "超级管理员",
          status: "1"
        },
        {
          uid: 1,
          username: "saaa",
          roleid: "普管理员",
          status: "1"
        },
        {
          uid: 2,
          username: "hhhh",
          roleid: "通管理员",
          status: "1"
        },
        {
          uid: 3,
          username: "wwww",
          roleid: "管理员",
          status: "1"
        },
        {
          uid: 3,
          username: "wwww",
          roleid: "管理员",
          status: "1"
        },
        {
          uid: 3,
          username: "wwww",
          roleid: "管理员",
          status: "1"
        },
        {
          uid: 3,
          username: "wwww",
          roleid: "管理员",
          status: "1"
        },
        {
          uid: 3,
          username: "wwww",
          roleid: "管理员",
          status: "1"
        }
      ],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 2, // 每页的数据条数
      menuInfo: {
        roleid: "",
        username: "",
        password: "",
        status: "1"
      },
      dialogIsShow: false, //是否出现弹框
      formLabelWidth: "100px",
      rules: {
        roleid: [
          {
            required: true,
            message: "请输入所属角色",
            trigger: "blur"
          },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          },
          {
            min: 2,
            max: 16,
            message: "长度在 2 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateUserList"])
  },
  methods: {
    ...mapActions(["getActionUserList"]),
    reset() {
      this.menuInfo = {
        roleid: "",
        username: "",
        password: "",
        status: "1"
      };
    },
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
    },
    update() {
      this.dialogIsShow = true;
      this.isAdd = false;
    },
    del() {},
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 根据isAdd的状态判断执行接口
          if (this.isAdd) {
            getUserCount().then(res => {
              if (res.data.code == 200) {
                this.total = res.data.list.total;
              }
            });
            // 调取添加接口
            getUserAdd(this.menuInfo).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionUserList({
                  size: this.total,
                  page: this.currentPage
                });
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
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
</style>
