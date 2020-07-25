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
      :data="getStateCateList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="图片">
        <!-- 需要获取当前单元格 item.row.img  需要外层加template -->
        <template slot-scope="item">
          <img
            class="imgInfo"
            :src="'http://localhost:3000' + item.row.img"
            alt
          />
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
    <!-- 弹框内容 -->
    <el-dialog
      :title="isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form :model="cateInfo" :rules="rules" ref="cateInfo">
        <el-form-item
          label="上级分类"
          :label-width="formLabelWidth"
          prop="pid"
          placeholder="请选择分类"
        >
          <el-select v-model="cateInfo.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0">顶级分类</el-option>
            <el-option
              v-for="item in getStateCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="cateInfo.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <!-- :auto-upload="false" 防止自动上传 -->
          <el-upload
            ref="upload"
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
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
          <el-radio v-model="cateInfo.status" label="1">启动</el-radio>
          <el-radio v-model="cateInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="isAdd" type="primary" @click="subInfo('cateInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('cateInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入分类接口
import {
  getcateAdd,
  getcateInfo,
  getcateEdit,
  getcateDelete
} from "../../util/axios";
//调取辅助性函数
import { mapActions, mapGetters } from "vuex";
import breadCrumb from "../common/breadcrumb";
export default {
  data() {
    return {
      imgUrl: "", // 上传之后的图片地址 接图片地址
      fileList: [],
      dialogImageUrl: "", // 显示图片
      dialogVisible: false, // 开启图片弹框
      editId: 0,
      isAdd: true,
      formLabelWidth: "100PX", // label宽度
      cateInfo: {
        pid: 0, // 上级分类编号
        catename: "",
        img: "",
        status: "1"
      },
      dialogIsShow: false,
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ],
        pid: [{ required: true, message: "请选择菜单", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getStateCateList"])
  },
  mounted() {
    // 组件一加载，就调取接口
    // 触发才调取vuex中的菜单列表
    this.getActionCateList();
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 图片移除
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
    },
    // 图片放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.url, "图片的地址");
      this.dialogVisible = true;
      console.log(file, "文件地址");
    },
    // 需要一半的，直接带路径的，直接显示在表格
    changeInfo(file) {
      console.log(file, "修改文件");
      this.imgUrl = file.raw;
    },
    // 关闭弹框事件
    cancel() {
      this.reset();
      this.dialogIsShow = false;
    },
    //重置输入内容
    reset() {
      (this.imgUrl = ""), (this.fileList = []); // 清空文件列表
      this.$refs.upload.clearFiles();
      this.dialogImageUrl = "";
      this.cateInfo = {
        pid: 0,
        catename: "",
        img: "",
        status: "1"
      };
    },
    //封装一个获取分类列表事件
    ...mapActions(["getActionCateList"]),
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
      getcateInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.cateInfo = res.data.list;
          // 对获取的图片进行格式转化
          this.fileList = this.cateInfo.img
            ? [{ url: `http://localhost:3000${this.cateInfo.img}` }]
            : [];
          this.cateInfo.status = this.cateInfo.status.toString(); // 数据库里面是int类型
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
          getcateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.getActionCateList(); // 删除成功重新获取数据渲染
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
          // console.log(this.cateInfo, "信息");
          let data = this.cateInfo;
          // 如果有上传文件 那我们不能直接传值 需要利用FormData转化
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }

          // 根据isAdd状态去判断执行接口;
          if (this.isAdd) {
            // 单独对图片地址进行操作
            file.append("img", this.imgUrl);
            //调取添加接口
            getcateAdd(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionCateList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
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
            getcateEdit(file).then(res => {
              if (res.data.code == 200) {
                //关闭弹框
                this.dialogIsShow = false;
                //清空输入框
                this.reset();
                //添加成功重新查询列表
                this.getActionCateList();
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

.imgInfo {
  width: 150px;
  height: 180px;
}
</style>
