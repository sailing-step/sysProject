<template>
  <div>
    <div class="container">
      <top></top>
      <div class="content">
        <div class="contact">
          <div class="txt">
            <p class="user">
              收货人：{{ userInfo.nickname }}
              <span>{{ userInfo.phone }}</span>
            </p>
            <p class="address">
              收货地址：
              <span>{{ contact.address }}</span>
            </p>
          </div>
          <a href="javascript:;" class="edit">
            <img :src="contact.img" alt />
          </a>
        </div>
        <div class="mode" v-for="(item,index) in checkGoods" :key="item.id">
          <div class="item">
            <img :src="$imgUrl+item.img" alt />
            <div class="txt">
              <h3>{{item.goodsname }}</h3>
              <p>规格：</p>
            </div>
            <p class="price">
              <span>¥{{ item.price.toFixed(2) }}</span>
            </p>
          </div>
          <div class="amount">
            <p>购买数量：</p>
            <div class="number">
              <i @click="sub(index)"></i>
              <span>{{ item.num }}</span>
              <em @click="add(index)"></em>
            </div>
          </div>
          <div class="way">
            <p class="carry">配送方式</p>
            <p class="carry">顺丰快递</p>
          </div>
        </div>
        <div class="cheapen">
          <div class="coupon">
            <p>优惠券</p>
            <p>无可用</p>
          </div>
          <div class="integration">
            <p class="use">使用积分</p>
            <div class="btn">
              <input type="text" value="输入积分" class="score" />
              <input type="button" value="使用" class="orange" />
            </div>
            <p class="usable">
              可用
              <span>50</span>积分
            </p>
          </div>
        </div>
        <div class="settle-amount">
          <div class="price-list">
            <div class="item">
              <p class="east">商品金额</p>
              <p class="west">¥{{ price }}.00</p>
            </div>
            <div class="item">
              <p class="east">运费</p>
              <p class="west">+¥0.00</p>
            </div>
            <div class="item">
              <p class="east">优惠券</p>
              <p class="west">-¥0.00</p>
            </div>
            <div class="item">
              <p class="east">会员折扣</p>
              <p class="west">-¥0.00</p>
            </div>
            <div class="item">
              <p class="east">积分抵扣</p>
              <p class="west">-¥0.00</p>
            </div>
          </div>
          <div class="last-step">
            <p>
              实付金额：
              <span>¥{{price }}.00</span>
            </p>
            <div class="submit">
              <a href="javascript:;">提交订单</a>
            </div>
          </div>
        </div>
      </div>
      <div class="fixed-menu">
        <div class="con">
          <div class="nav">
            <router-link activeClass="active" to="/home">
              <i></i>首页
            </router-link>
            <router-link activeClass="active" to="/car">
              <i></i>购物车
            </router-link>
            <router-link activeClass="active" to="/mine">
              <i></i>我的
            </router-link>
          </div>
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
        img: require("../../assets/images/public/arrow.jpg"),
      },
      contact: {
        username: "YouSu",
        phone: "17865212608",
        address: "北京市海淀区隐泉路清林苑6号楼中公优就业总部3层",
        img: require("../../assets/images/order/arrow.jpg"),
      },
      mode: {
        img: require("../../assets/images/order/shop.jpg"),
        name: "雅诗兰黛护肤霜",
        size: "50g",
        price: 800,
        count: 1,
      },
      checkGoods: [],
      userInfo: {},
      allPrice: "",
    };
  },
  computed: {
    price() {
      let sum = 0;
      this.checkGoods.map((item) => {
        sum += item.price * item.num;
      });
      return sum;
    },
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : {};
    this.checkGoods = JSON.parse(sessionStorage.getItem("checkGoods"));
    this.allPrice = JSON.parse(sessionStorage.getItem("allPrice")) / 100;
    console.log(this.userInfo);
    console.log(this.checkGoods);
    console.log(this.allPrice);
  },
  methods: {
    sub(i) {
      // console.log(i, "选中的索引");
      if (this.checkGoods[i].num == 1) {
        return;
      }
      this.checkGoods[i].num--;
    },
    add(i) {
      this.checkGoods[i].num++;
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/order.css";
</style>
