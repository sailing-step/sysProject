<template>
  <div>
    <div class="container">
      <top></top>
      <div class="content">
        <div class="proinfo">
          <img :src="$imgUrl + goodsDetail.img" alt />
          <h3>{{ goodsDetail.goodsname }}</h3>
          <p>
            <span>¥{{ goodsDetail.price }}.00</span>(此价格不与套装优惠同时享受)
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
                <span>{{ goodsDetail.specsname }}</span>
                <p
                  v-for="(item, i) in goodsDetail.specsattr"
                  :key="item.id"
                  @click="color(i)"
                  :class="[idx == i ? 'prev' : '']"
                >
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="proDetail">
          <div class="head">
            <p>商品详情</p>
          </div>
          <div
            class="picInfo"
            ref="desc"
            v-html="goodsDetail.description"
          ></div>
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
        <!-- 商品导航 -->
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            @click="onClickIcon"
          />
          <van-goods-action-icon icon="shop-o" text="店铺" />
          <van-goods-action-button
            type="danger"
            text="加入购物车"
            @click="onClickButton"
          />
        </van-goods-action>
        <!-- <div class="fixed-footer">
          <a href="javascript:;" @click="$router.push('/car')">
            <div class="car">
              <img :src="footer.img" alt />
              <p>购物车</p>
              <div class="count">
                <span>{{ choose.num }}</span>
              </div>
            </div>
          </a>
          <a href="#" class="prev" @click="addToCar">加入购物车</a>
          <a href="#" class="next">立即购买</a>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { getgoodsinfo } from "../../util/axios";

export default {
  data() {
    return {
      idx: 0,
      goodsDetail: {},
      id: 0,
      head: {
        img: require("../../assets/images/public/arrow.jpg")
      },
      choose: {
        img: require("../../assets/images/detail_images/arrow.jpg"),
        num: 1
      },
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
  mounted() {
    console.log(this.$route.query.id);
    this.id = this.$route.query.id;
    this.getgoodsInfo(this.id);
  },
  methods: {
    color(i) {
      this.idx = i;
    },
    sub() {
      if (this.choose.num == 1) {
        this.choose.num = 1;
        return;
      }
      this.choose.num--;
    },
    add() {
      this.choose.num++;
    },
    getgoodsInfo(id) {
      getgoodsinfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list);
          this.goodsDetail = res.data.list[0];
          this.goodsDetail.specsattr = this.goodsDetail.specsattr.split(",");
          // this.$refs.desc.html(this.goodsDetail.description);
        }
      });
    },
    onClickIcon() {
      this.$router.push("/car");
      // Toast("点击图标");
    },
    onClickButton() {
      //调取加入购物车的方法
      let isLogin = JSON.parse(sessionStorage.getItem("userInfo"))
        ? true
        : false;
      if (isLogin) {
        //调取加入购物车方法
        console.log("加入购物车");
      } else {
        Toast("请先登录");
      }
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
