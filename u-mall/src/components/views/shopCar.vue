<template>
  <div>
    <div class="container">
      <top></top>
      <ul class="pro-list">
        <li
          v-for="(item, i) in goodsList"
          :key="item.id"
          :class="[item.checked ? 'active' : '']"
        >
          <input
            type="checkbox"
            class="checkOne"
            v-model="item.checked"
            :value="item.checked"
          />
          <img :src="item.img" alt />
          <p>
            <span class="pro-name">{{ item.goodsName }}</span>
            <span class="pro-des">规格：{{ item.goodsDes }}</span>
            <span class="pro-price">¥{{ item.goodsPrice.toFixed(2) }}</span>
          </p>
          <div class="count-group">
            <input type="button" value="-" @click="sub(i)" />
            <span class="number">{{ item.num }}</span>
            <input type="button" value="+" @click="add(i)" />
          </div>
          <div class="del" @click="del(i)">删除</div>
        </li>
      </ul>
      <div class="count">
        <div class="all">
          <div class="select">
            <input type="checkbox" v-model="checkAll" @change="allCheck" />
          </div>
          <span>全选</span>
        </div>
        <div class="price">
          <h3>
            总计：
            <span>¥{{ allPrice.toFixed(2) }}</span>
          </h3>
          <p>不含邮费，已优惠¥0.00</p>
        </div>
        <div class="payAll">
          <a href="javascript:;" @click="goOrder">去结算(2件)</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      head: {
        img: require("../../assets/images/public/arrow.jpg")
      },
      num: 0,
      goodsList: [
        {
          id: 1,
          num: 1,
          img: require("../../assets/images/index_images/shop_4.jpg"),
          goodsName: "雅诗兰黛面霜",
          goodsDes: "50g",
          goodsPrice: 800,
          checked: false
        },
        {
          id: 2,
          num: 1,
          img: require("../../assets/images/index_images/shop_7.jpg"),
          goodsName: "科颜氏面霜",
          goodsDes: "50g",
          goodsPrice: 315,
          checked: false
        },
        {
          id: 3,
          num: 1,
          img: require("../../assets/images/shoping_car_images/shop.jpg"),
          goodsName: "欧莱雅面霜",
          goodsDes: "50g",
          goodsPrice: 199,
          checked: false
        }
      ],
      checkAll: false
    };
  },
  computed: {
    allPrice() {
      let sum = 0;
      this.goodsList.map((item, index, arr) => {
        sum += item.goodsPrice * item.num;
      });
      return sum;
    }
  },
  methods: {
    sub(i) {
      if (this.goodsList[i].num == 1) {
        return;
      }
      this.goodsList[i].num--;
    },
    add(i) {
      this.goodsList[i].num++;
    },
    allCheck() {
      this.goodsList.map(item => {
        item.checked = this.checkAll;
      });
    },
    del(i) {
      this.goodsList.splice(i, 1);
    },
    goOrder() {
      this.$router.push("/order");
    }
  },
  watch: {
    goodsList: {
      deep: true,
      handler() {
        this.checkAll = this.goodsList.every(item => item.checked);
      }
    }
  }
};
</script>
<style scope>
@import "../../assets/css/shop.css";

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
</style>
