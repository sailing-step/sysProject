<template>
  <div>
    <div class="container">
      <!-- <header class="header">
        <div class="wrap">
          <a href="javascript:;" @click="$router.go(-1)" class="arrow">
            <img :src="head.img" alt="" />
          </a>
          <h2>商品详情</h2>
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>-->
      <top></top>
      <div class="content">
        <div class="proinfo">
          <img :src="proInfo.img" alt />
          <h3>{{ proInfo.name }}</h3>
          <p>
            <span>¥{{ proInfo.price.toFixed(2) }}</span>(此价格不与套装优惠同时享受)
          </p>
        </div>
        <div class="choose">
          <div class="wrap">
            <div class="head">
              <div class="east">
                <p class="first">促销：</p>
                <p></p>
                <p class="second">满减</p>
                <p class="discount">满2件九折；三件8折</p>
              </div>
              <img :src="choose.img" alt />
            </div>
            <div class="count">
              <div class="amount">
                <span>购买数量</span>
              </div>
              <div class="number">
                <a href="javaScript:;">
                  <i @click="sub()"></i>
                  {{ choose.num }}
                  <em @click="add()"></em>
                </a>
              </div>
            </div>
            <div class="last">
              <div class="attr">
                <h3>商品属性</h3>
                <img :src="choose.img" alt />
              </div>
              <div class="size">
                <span>规格</span>
                <p class="prev">30g</p>
                <p class="next">5g</p>
              </div>
            </div>
          </div>
        </div>
        <div class="proDetail">
          <div class="head">
            <p>商品详情</p>
          </div>
          <div class="picInfo">
            <img :src="item.img" alt class="one" v-for="item in proDetail" :key="item.id" />
          </div>
        </div>
        <div class="comment">
          <div class="wrap">
            <div class="head">
              <p>商品评价</p>
            </div>
            <div class="buyerComment">
              <p class="name">{{ comment.username }}</p>
              <p class="discuss">{{ comment.coms }}</p>
              <img
                :src="item.img"
                alt
                :class="[idx == 1 ? 'two' : 'one']"
                v-for="(item, idx) in comment.imgList"
                :key="item.id"
              />
              <p class="date">2020-04-11</p>
            </div>
            <div class="findComment">
              <span>共1000+条评论</span>
              <a href="#">查看更多 ></a>
            </div>
          </div>
        </div>
        <div class="fixed-footer">
          <a href="#">
            <div class="car">
              <img :src="footer.img" alt />
              <p>购物车</p>
              <div class="count">
                <span>{{ choose.num }}</span>
              </div>
            </div>
          </a>
          <a href="#" class="prev">加入购物车</a>
          <a href="#" class="next">立即购买</a>
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
      proInfo: {
        img: require("../../assets/images/detail_images/pic01.jpg"),
        name: " 娅芝贵妇素颜霜 贵妇膏神仙膏补水保湿懒人霜遮瑕珍珠膏",
        price: 123
      },
      choose: {
        img: require("../../assets/images/detail_images/arrow.jpg"),
        num: 1
      },
      proDetail: [
        {
          id: 1,
          img: require("../../assets/images/detail_images/pic_3.jpg")
        },
        {
          id: 2,
          img: require("../../assets/images/detail_images/pic_4.jpg")
        },
        {
          id: 3,
          img: require("../../assets/images/detail_images/pic_5.jpg")
        },
        {
          id: 4,
          img: require("../../assets/images/detail_images/pic_6.jpg")
        },
        {
          id: 5,
          img: require("../../assets/images/detail_images/pic_7.jpg")
        }
      ],
      comment: {
        username: "1235668fg",
        coms: "效果很好，物流到位，下次继续来!",
        imgList: [
          {
            id: 1,
            img: require("../../assets/images/detail_images/pic_8.jpg")
          },
          {
            id: 2,
            img: require("../../assets/images/detail_images/pic_09.jpg")
          },
          {
            id: 3,
            img: require("../../assets/images/detail_images/pic_10.jpg")
          }
        ],
        img1: require("../../assets/images/detail_images/pic_8.jpg"),
        img2: require("../../assets/images/detail_images/pic_09.jpg"),
        img3: require("../../assets/images/detail_images/pic_10.jpg"),
        allComs: 1000
      },
      footer: {
        img: require("../../assets/images/public/icon_7.jpg")
      }
    };
  },
  methods: {
    sub() {
      if (this.choose.num == 1) {
        this.choose.num = 1;
        return;
      }
      this.choose.num--;
    },
    add() {
      this.choose.num++;
    }
  }
};
</script>
<style scoped>
@import "../../assets/css/proDetail.css";
.header h2 {
  font-size: 0.36rem;
  color: #fff;
}
</style>
