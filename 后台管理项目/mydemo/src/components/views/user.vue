<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb></bread-crumb>
    <!-- 按钮 -->
    <div>
      <el-button type="primary" size="small" @click="add">添加</el-button>
    </div>
    <!-- 表格信息 -->
    <el-table :data="getStateUserList" border style="width: 100%">
      <el-table-column prop="uid" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
          <el-tag v-if="item.row.status == 2" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button size="small" type="primary" @click="update(item.row.uid)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(item.row.uid)">删除</el-button>
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
    <el-dialog :title="isAdd ? '添加管理员' : '修改管理员'" :visible.sync="dialogIsShow" center>
      <el-form :model="userInfo" :rules="rules" ref="userInfo">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          placeholder="请选择所属角色"
          prop="roleid"
        >
          <el-select v-model="userInfo.roleid" placeholder="请选择">
            <el-option
              v-for="item in getStateRoleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="userInfo.status" label="1">启用</el-radio>
          <el-radio v-model="userInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogIsShow = false">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('userInfo')">新 增</el-button>
        <el-button v-else type="primary" @click="subInfo('userInfo')">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "../common/breadcrumb";
import {
  getuserAdd,
  getuserCount,
  getuserEdit,
  getuserInfo,
  getuserDelete
} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      editId: 0,
      // 接收总条目
      count: 0,
      // 分页数据
      pageInfo: {
        size: 2, // 代表一个页面查询2条数据
        page: 1 // 一共有多少页面。初始值为1
      },
      isAdd: true, // 添加
      userInfo: {
        uid: 0, // 用户编号
        roleid: 0,
        username: "",
        password: "",
        status: "1"
      },
      dialogIsShow: false, //是否出现弹框
      formLabelWidth: "100px",
      rules: {
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
        ],
        roleid: [
          {
            required: true,
            message: "请选择所属角色",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateUserList", "getStateRoleList"])
  },
  mounted() {
    this.getCount();
    // this.$store.dispatch("getActionUserList", this.pageInfo);
  },
  methods: {
    // ...mapActions(["getActionUserList"]), 传参数不能用辅助性函数
    ...mapActions(["getActionRoleList"]),
    reset() {
      this.userInfo = {
        uid: 0,
        roleid: 0,
        username: "",
        password: "",
        status: "1"
      };
    },
    add() {
      this.dialogIsShow = true;
      this.isAdd = true;
      // 调取角色列表
      this.getActionRoleList();
    },
    update(uid) {
      this.dialogIsShow = true;
      this.isAdd = false;
      this.editId = uid;
      getuserInfo({ uid }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          //对返回的数据类型进行转化
          this.userInfo = res.data.list;
          this.userInfo.status = this.userInfo.status.toString();
          // this.userInfo.uid = this.userInfo.uid.toString()
        }
      });
    },
    del(uid) {
      this.$confirm("你确定要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除逻辑
          getuserDelete({ uid }).then(res => {
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
          console.log(this.userInfo, "管理员信息");
          // 根据isAdd的状态判断执行接口;
          if (this.isAdd) {
            // 调取添加接口
            getuserAdd(this.userInfo).then(res => {
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
            let data = this.userInfo;
            data.uid = this.editId;
            //调取更新接口
            getuserEdit(data).then(res => {
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
    // 封装获取总条目接口
    getCount() {
      getuserCount().then(res => {
        if (res.data.code == 200) {
          this.count = res.data.list[0].total;
          // 如果当前不是第一页，并且只有一条数据，我们就让页面的数量--
          // 当前页面的数据在vuex里面,当前getStateUserList.length ==1 ,当前页面只有一条数据
          if (this.pageInfo.page != 1 && this.getStateUserList.length == 1) {
            this.pageInfo.page--;
          }
          // 调取获取用户接口列表的行动
          this.$store.dispatch("getActionUserList", this.pageInfo);
        }
      });
    },
    // 当页面发生变化的时候触发该方法
    getPage(n) {
      // n是当前点击的页码
      console.log(n);
      this.pageInfo.page = n;
      // 重新调取列表页面
      this.$store.dispatch("getActionUserList", this.pageInfo);
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
