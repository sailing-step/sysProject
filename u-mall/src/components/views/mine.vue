<template>
  <div>
    <div class="container">
      <top></top>
      <div class="content">
        <div class="member">
          <div class="wrap">
            <div class="pic">
              <div class="circle">
                <img :src="member.img" alt />
              </div>
              <div class="txt">
                <p>悠溯</p>
                <span>v1</span>
              </div>
            </div>
            <div class="sign">
              <a href="#">每日签到</a>
            </div>
          </div>
        </div>
        <div class="shop-nav">
          <div class="wrap">
            <ul class="icon-nav">
              <li v-for="item in iconList" :key="item.id">
                <a href="javascript:;">
                  <img :src="item.img" alt />
                  <br />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="lookup">
          <div class="operate">
            <div class="item" v-for="item in infoList" :key="item.id">
              <div class="right">
                <img :src="item.img1" alt />
                <span>{{ item.name }}</span>
              </div>
              <div class="left">
                <a href="#">
                  <img :src="item.img2" alt />
                </a>
              </div>
            </div>
            <!-- <div class="item item1">
              <div class="right">
                <img src="./images/mine_images/icon_5.jpg" alt="" />
                <span>我的钱包</span>
              </div>
              <div class="left">
                <span>200余额</span>
                <a href="#">
                  <img src="./images/order/arrow.jpg" alt="" />
                </a>
              </div>
            </div>
            <div class="item item2">
              <div class="right">
                <img src="./images/mine_images/icon_6.jpg" alt="" />
                <span>我的优惠券</span>
              </div>
              <div class="left">
                <a href="#">
                  <img src="./images/order/arrow.jpg" alt="" />
                </a>
              </div>
            </div>
            <div class="item item3">
              <div class="right">
                <img src="./images/mine_images/icon_7.jpg" alt="" />
                <span>我的二维码</span>
              </div>
              <div class="left">
                <a href="#">
                  <img src="./images/order/arrow.jpg" alt="" />
                </a>
              </div>
            </div>
            <div class="item item4">
              <div class="right">
                <img src="./images/mine_images/icon_8.jpg" alt="" />
                <span>我的小伙伴</span>
              </div>
              <div class="left">
                <a href="#">
                  <img src="./images/order/arrow.jpg" alt="" />
                </a>
              </div>
            </div>-->
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
        img: require("../../assets/images/public/arrow.jpg")
      },
      member: {
        img: require("../../assets/images/mine_images/head.jpg")
      },
      iconList: [
        {
          id: 1,
          img: require("../../assets/images/mine_images/icon_1.jpg"),
          name: "全部订单"
        },
        {
          id: 2,
          img: require("../../assets/images/mine_images/icon_1.jpg"),
          name: "待付款"
        },
        {
          id: 3,
          img: require("../../assets/images/mine_images/icon_1.jpg"),
          name: "待收货"
        }
      ],
      infoList: [
        {
          id: 1,
          img1: require("../../assets/images/mine_images/icon_4.jpg"),
          img2: require("../../assets/images/order/arrow.jpg"),
          name: "地址管理"
        },
        {
          id: 2,
          img1: require("../../assets/images/mine_images/icon_5.jpg"),
          img2: require("../../assets/images/order/arrow.jpg"),
          name: "我的钱包"
        },
        {
          id: 3,
          img1: require("../../assets/images/mine_images/icon_6.jpg"),
          img2: require("../../assets/images/order/arrow.jpg"),
          name: "我的优惠券"
        },
        {
          id: 4,
          img1: require("../../assets/images/mine_images/icon_7.jpg"),
          img2: require("../../assets/images/order/arrow.jpg"),
          name: "我的二维码"
        },
        {
          id: 5,
          img1: require("../../assets/images/mine_images/icon_8.jpg"),
          img2: require("../../assets/images/order/arrow.jpg"),
          name: "我的小伙伴"
        }
      ]
    };
  }
};
</script>
<style scope>
@import "../../assets/css/mine.css";
</style>
