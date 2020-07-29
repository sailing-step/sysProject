<template>
  <div>
    <div class="container" style="padding-top:0.88rem">
      <top></top>
        <van-swipe-cell v-for="(item, i) in carList" :key="item.id">
        <van-checkbox v-model="item.status" ></van-checkbox>
          <van-card
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            class="goods-card"
            :thumb="$imgUrl + item.img"
          >
            <template #footer>
              <van-stepper v-model="item.num"/>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(i, item.id)"
            />
          </template>

        </van-swipe-cell>
        <van-empty
          v-if="carList == null"
          description="购物车空空如也，快去买买买。。。"
        />
      </div>

      <div class="count">
        <van-submit-bar
          :price="allPrice"
          button-text="提交订单"
          @submit="onSubmit"
        >
          <input  type="checkbox" v-model="checkAll" @change="selectAll">全选</input>
        </van-submit-bar>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { getcartList, getcartDelete } from "../../util/axios";

export default {
  data() {
    return {
      head: {
        img: require("../../assets/images/public/arrow.jpg")
      },
      checkAll: false,
      carList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      next();
    } else {
      // 组件进来之前没有this
      Toast.fail("请先登录,才能查看购物车");
      next("/login");
    }
  },
  computed: {
    allPrice() {
      let sum = 0;
      if(this.carList){
       this.carList.map((item, index, arr) => {
         if(item.status){
             sum += item.price * item.num;
         }
        // this.checkAll = this.carList.every(item => item.status);
        // console.log(this.checkAll)
      });
      return sum * 100;
      } 
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    onSubmit() {
      this.$router.push('/order')
    },
    // 调取购物车列表渲染
    getList() {
      getcartList({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid
      }).then(res => {
        if (res.data.code == 200) {
          console.log(res, "返回值");
          this.carList = res.data.list;
          console.log(this.carList);
          if(this.carList){
              this.carList.map(item=>{
                  item.status = item.status==1 ? true :false
          })
          }         
        } else {
          Toast(res.data.msg);
        }
      });
    },
    //封装一个全选事件
    selectAll() {
      
      if(this.carList){
          this.carList.map(item => {
            item.status = this.checkAll
              });
      }
      
      
    },
    del(i, id) {
      console.log(id);
      this.carList.splice(i, 1);
      //调取删除接口
      getcartDelete({ id }).then(res => {
        if (res.data.code == 200) {
          this.getList();
        }
      });
    },
  },
  watch:{
      carList:{
          deep:true,
          handler(){
              this.checkAll = this.carList.every(item=>item.status)
                console.log(this.checkAll)
                }
          }
      },
 
};
</script>
<style scoped>
@import "../../assets/css/shop.css";
/* 复选框 */
.van-checkbox {
  /* display: inline-block; */
  /* float: left; */
}
.van-checkbox__icon .van-icon {
  position: absolute;
  left: 0.1rem;
  top: 0.3rem;
  /* margin: 0.3rem 0.1rem; */
}
.goods-card {
  margin: 0;
  background-color: #fff;
}
.van-swipe-cell:nth-child(1) {
  margin-top: 0.88rem;
}
.van-swipe-cell {
  position: relative;
  margin-top: 0.3rem;
  box-shadow: 0px 0px 0.2rem #e0e0e0;
}
.delete-button {
  height: 100%;
}
.count .all .select input {
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 50%;
}
.checkOne {
  margin-right: 0.1rem;
}
.number {
  display: inline-block;
  width: 0.84rem;
  flex-shrink: 1;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
  font-size: 0.3rem;
  text-align: center;
}
.van-submit-bar {
  bottom: 1.2rem;
}
</style>
