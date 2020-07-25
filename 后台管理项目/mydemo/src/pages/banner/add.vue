<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '轮播图添加' : '轮播图编辑'"
      :visible.sync="addInfo.dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="bannerInfo" :rules="rules" ref="bannerInfo">
        <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
          <el-input v-model="bannerInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :on-change="changeInfo"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="bannerInfo.status" label="1">启动</el-radio>
          <el-radio v-model="bannerInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          type="primary"
          @click="subInfo('bannerInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('bannerInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入轮播图接口
import { getbannerAdd, getbannerInfo, getbannerEdit } from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["addInfo"],
  data() {
    return {
      editId: 0,
      formLabelWidth: "100PX", // label宽度
      fileList: [], //文件上传列表
      dialogImageUrl: "", //显示图片
      dialogVisible: false, //开启图片的弹框
      imgUrl: "", //上传之后的图片地址
      bannerInfo: {
        title: "", //轮播图标题
        img: "", // 图片(文件)
        status: "1" // 状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateBannerList"])
  },
  mounted() {
    // 组件一加载，就调取接口
    // 触发才调取vuex中的轮播图列表
    this.getActionBannerList();
  },
  methods: {
    //当文件个数被限制时触发的函数
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    //放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url, "图片的地址。。。");
      this.dialogVisible = true;
      console.log(file, "文件地址");
    },
    changeInfo(file) {
      console.log(file, "修改文件");
      this.imgUrl = file.raw;
    },
    ...mapActions(["getActionBannerList"]),
    // 关闭弹框事件
    cancel() {
      // 注意props属性只能用于读取，不能设置
      this.reset();
      // 修改属性，子传父
      this.$emit("cancel", false);
    },
    reset() {
      this.imgUrl = "";
      this.fileList = [];
      this.bannerInfo = {
        title: "", //轮播图标题
        img: "", // 图片(文件)
        status: "1" // 状态1正常2禁用
      };
    },
    update(id) {
      //点击编辑按钮出现弹框并携带数据
      this.editId = id;
      // 调取轮播图查询一条数据
      getbannerInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.bannerInfo = res.data.list;
          this.fileList = this.bannerInfo.img
            ? [{ url: `${this.$imgUrl}${this.bannerInfo.img}` }]
            : [];
          this.bannerInfo.status = this.bannerInfo.status.toString(); // 数据库里面是int类型
        }
      });
    },
    // 确定添加或者更新事件
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 文件上传，需要转化
          let data = this.bannerInfo;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //根据isAdd状态去判断执行接口
          if (this.addInfo.isAdd) {
            file.append("img", this.imgUrl);
            //调取添加接口
            getbannerAdd(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框  清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionBannerList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            // id是必填项
            file.append("id", this.editId);
            // 如果删除图片，进行判断
            if (this.imgUrl == "" && this.fileList.length == 0) {
              this.imgUrl = "";
            } else {
              // 如果图片未修改 沿用上次图片的地址那么on-change不会触发，那么图片就为空 如果图片被修改使用新图片地址
              this.imgUrl = this.imgUrl ? this.imgUrl : this.goodsInfo.img;
            }

            file.append("img", this.imgUrl);
            // 调取更新接口
            getbannerEdit(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框  清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionBannerList();
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
  }
};
</script>

<style lang="" scoped></style>
