<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀活动' : '秒杀活动编辑'"
      :visible.sync="addInfo.dialogIsShow"
      center
      :before-close="cancel"
    >
      <el-form
        :model="seckInfo"
        :rules="rules"
        ref="seckInfo"
        label-width="100px"
      >
        <el-form-item
          label="活动名称:"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="seckInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间:" :label-width="formLabelWidth">
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="timestamp"
            @change="getTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="一级分类:"
          :label-width="formLabelWidth"
          placeholder="请选择一级分类"
        >
          <el-select
            v-model="seckInfo.first_cateid"
            placeholder="请选择"
            @change="cateChange"
          >
            <el-option
              v-for="item in cateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item
          label="二级分类:"
          :label-width="formLabelWidth"
          placeholder="请选择二级分类"
        >
          <el-select
            v-model="seckInfo.second_cateid"
            placeholder="请选择"
            @change="getGoods"
          >
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
              >{{ item.catename }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="商品:" :label-width="formLabelWidth">
          <el-select v-model="seckInfo.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
              >{{ item.goodsname }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="seckInfo.status" label="1">启动</el-radio>
          <el-radio v-model="seckInfo.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isAdd"
          type="primary"
          @click="subInfo('seckInfo')"
          >新 增</el-button
        >
        <el-button v-else type="primary" @click="subInfo('seckInfo')"
          >更 新</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入菜单接口
import {
  getseckAdd,
  getseckInfo,
  getseckEdit,
  getcateList,
  getgoodsList,
  getgoodsInfo
} from "../../util/axios";
import { mapGetters, mapActions } from "vuex";
// import { toTime } from "../../filter/toTime";
export default {
  props: ["addInfo"],
  data() {
    return {
      editId: 0,
      formLabelWidth: "100PX", // label宽度
      cateArr: [], // 一级分类
      secondArr: [], //二级分类
      goodsArr: [], // 商品
      seckInfo: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: "1" //状态1正常2禁用
      },
      dateValue: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
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
    ...mapGetters(["getStateSeckList"])
  },
  mounted() {
    // 组件一加载，就调取接口
    // 触发才调取vuex中的菜单列表
    this.getActionSeckList();
    //组件一加载获取一级
    this.getCatesList();
  },
  methods: {
    // 获取时间
    getTime(e) {
      this.seckInfo.begintime = e[0];
      this.seckInfo.endtime = e[1];
    },
    // 优化
    // 获取分类列表
    getCatesList(pid = 0) {
      getcateList({ pid }).then(res => {
        if (res.data.code == 200) {
          if (pid == 0) {
            this.cateArr = res.data.list;
          } else {
            this.secondArr = res.data.list;
          }
        }
      });
    },
    // 点击一级分类联动出现二级分类
    cateChange(e) {
      console.log(e, "点击一级分类");
      // e是一级分类的id 这个id对应二级分类的pid
      this.secondArr = [];
      this.getCatesList(e);
    },
    // 获取商品
    getGoods() {
      console.log(this.seckInfo.first_cateid, this.seckInfo.second_cateid);
      //调取接口列表数据 根据后台代码，传相应参数
      getgoodsList({
        fid: this.seckInfo.first_cateid,
        sid: this.seckInfo.second_cateid
      }).then(res => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
        }
      });
    },
    ...mapActions(["getActionSeckList"]),
    // 关闭弹框事件
    cancel() {
      // 注意props属性只能用于读取，不能设置
      this.reset();
      // 修改属性，子传父
      this.$emit("cancel", false);
    },
    reset() {
      this.seckInfo = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: "1" //状态1正常2禁用
      };
    },
    update(id) {
      //点击编辑按钮出现弹框并携带数据
      this.editId = id;
      // 调取菜单查询一条数据
      getseckInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.seckInfo = res.data.list;
          this.getCatesList(this.seckInfo.first_cateid);
          this.getGoods();
          this.dateValue = [this.seckInfo.begintime, this.seckInfo.endtime];
          console.log(this.dateValue);
          this.seckInfo.status = this.seckInfo.status.toString(); // 数据库里面是int类型
        }
      });
    },
    // 确定添加或者更新事件
    subInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.seckInfo, "信息");
          let data = this.seckInfo;
          //根据isAdd状态去判断执行接口
          // console.log(data);
          if (this.addInfo.isAdd) {
            //调取添加接口
            getseckAdd(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹框  清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionSeckList();
                this.$message.success(res.data.msg);
              } else if (res.data.code == 500) {
                this.$message.warning(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            // id是必填项
            data.id = this.editId;
            // 调取更新接口
            getseckEdit(data).then(res => {
              if (res.data.code == 200) {
                //关闭弹框  清空输入框
                this.cancel();
                //添加成功重新查询列表
                this.getActionSeckList();
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

<style lang="stylus" scoped>
.line {
  text-align: center;
}
</style>
