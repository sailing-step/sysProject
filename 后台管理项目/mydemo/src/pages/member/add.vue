<template>
  <div>
    <el-dialog
      title="会员编辑"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="memberInfo" :rules="rules" ref="memberInfo">
        <el-form-item
          label="手机号:"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="memberInfo.phone"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称:"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="memberInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码:" :label-width="formLabelWidth">
          <el-input v-model="memberInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="memberInfo.status" label="1">启动</el-radio>
          <el-radio v-model="memberInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="subInfo('memberInfo')"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入会员管理接口
import { getmemberInfo, getmemberEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["dialogIsShow"],
  data() {
    return {
      editId: 0,
      formLabelWidth: "100PX", // label宽度
      memberInfo: {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: "1" //状态1正常2禁用
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" }
          // { min: 2, max: 6, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateMemberList"])
  },
  mounted() {
    // 组件一加载，就调取接口
    // 触发才调取vuex中的菜单列表
    this.getActionMemberList();
  },
  methods: {
    ...mapActions(["getActionMemberList"]),
    // 关闭弹框事件
    cancel() {
      // 注意props属性只能用于读取，不能设置
      this.reset();
      // 修改属性，子传父
      this.$emit("cancel", false);
    },
    reset() {
      this.memberInfo = {
        nickname: "", //昵称
        phone: "", //手机号
        password: "", //密码
        status: "1" //状态1正常2禁用
      };
    },
    update(uid) {
      //点击编辑按钮出现弹框并携带数据
      this.editId = uid;
      // 调取菜单查询一条数据
      getmemberInfo({ uid }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.memberInfo = res.data.list;
          this.memberInfo.status = this.memberInfo.status.toString(); // 数据库里面是int类型
        }
      });
    },
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // id是必填项
          let data = this.memberInfo; // memberInfo里面没有id属性
          data.uid = this.editId;
          console.log(data);
          // 调取更新接口
          getmemberEdit(data).then(res => {
            if (res.data.code == 200) {
              //关闭弹框  清空输入框
              this.cancel();
              //添加成功重新查询列表
              this.getActionMemberList();
              this.$message.success(res.data.msg);
            } else if (res.data.code == 500) {
              this.$message.warning(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="" scoped></style>
