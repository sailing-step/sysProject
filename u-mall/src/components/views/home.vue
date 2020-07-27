<template>
  <div>
    <div class="container">
      <header class="header">
        <div class="wrap">
          <h1>
            <a href="#">
              <img :src="img" alt />
            </a>
          </h1>
          <input type="text" placeholder="寻找商品" />
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <nav class="nav">
        <div class="wrap">
          <ul>
            <li class="first"><a href="#">推荐</a></li>
            <li
              @click="sel(i, item.id)"
              v-for="(item, i) in navList"
              :key="item.id"
            >
              <a href="#">{{ item.catename }}</a>
            </li>
          </ul>
          <span class="arrow">
            <img :src="img2" @click="show" ref="show" alt />
          </span>
        </div>
      </nav>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in bannerList" :key="item.id">
          <a href="javascript:;">
            <img :src="$imgUrl + item.img" alt />
          </a>
        </mt-swipe-item>
      </mt-swipe>
      <div class="icon-nav">
        <div
          class="item"
          v-for="(item, index) in iconList"
          :key="item.id"
          @click="goList(index)"
        >
          <a href="javascript:;">
            <img :src="item.img" alt />
            <p>{{ item.name }}</p>
          </a>
        </div>
      </div>
      <div class="sale">
        <div class="left">
          <a href="#">
            <h3><img :src="sale[0].img1" alt />{{ title }}</h3>
            <p class="des">每天零点场 好货秒不停</p>
            <p class="time">
              <!-- <span>19</span>： <span>30</span>：
              <span>29</span> -->
              <van-count-down :time="timer">
                <template v-slot="timeData">
                  <span class="block">{{ timeData.hours }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.minutes }}</span>
                  <span class="colon">:</span>
                  <span class="block">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
              <!-- <i>秒杀</i> -->
            </p>
            <img class="pic" :src="sale[1].img2" alt />
            <div class="price">
              ¥
              <span>14.8</span>
            </div>
          </a>
        </div>
        <div class="right">
          <div class="top">
            <div class="brand">
              <div class="title">
                <a href="#">
                  <h3>品牌上新</h3>
                  <span class="discount">折</span>
                </a>
              </div>
              <a href="#">
                <p>每日九点 抢大牌</p>
                <img :src="sale[2].img3" alt class="first" />
              </a>
            </div>
            <div class="pic-Info">
              <a href="#">
                <img :src="sale[3].img4" alt class="second" />
              </a>
            </div>
          </div>
          <div class="bottom">
            <div class="same east">
              <a href="#">
                <h3>每日十件</h3>
                <p>只为你挑选好货</p>
                <img :src="sale[4].img5" alt class="first" />
              </a>
            </div>
            <div class="same west">
              <a href="#">
                <h3>拼啊</h3>
                <p>超级好价拼团</p>
                <img :src="sale[5].img6" alt class="second" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="poster">
        <a href="#">
          <img :src="poster.imgUrl" alt />
        </a>
      </div>
      <div class="pro-list">
        <div class="wrap">
          <!-- 商品切换 -->
          <van-tabs type="card">
            <van-tab title="热门推荐">
              <van-card
                v-for="item in hotsList"
                :key="item.id"
                class="card"
                :price="item.price.toFixed(2)"
                :title="item.goodsname"
                :thumb="$imgUrl + item.img"
                @click="goDetail(item.id)"
              />
            </van-tab>
            <van-tab title="发现新品">
              <van-card
                v-for="item in newsList"
                :key="item.id"
                class="card"
                :price="item.price.toFixed(2)"
                :title="item.goodsname"
                :thumb="$imgUrl + item.img"
              />
            </van-tab>
            <van-tab title="全部商品">
              <van-card
                v-for="item in goodsList"
                :key="item.id"
                class="card"
                :price="item.price.toFixed(2)"
                :title="item.goodsname"
                :thumb="$imgUrl + item.img"
              />
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  getbanner,
  getcate,
  getseckill,
  getindexgoods
} from "../../util/axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      timer: 30 * 60 * 60 * 1000,
      start: 0,
      end: 0,
      img: require("../../assets/images/index_images/logo.jpg"),
      img2: require("../../assets/images/index_images/arrow.jpg"),
      num1: 0,
      num: 0,
      navList: [],
      bannerList: [],
      iconList: [
        {
          id: 1,
          name: "限时抢购",
          img: require("../../assets/images/index_images/icon_1.jpg")
        },
        {
          id: 2,
          name: "积分商城",
          img: require("../../assets/images/index_images/icon_2.jpg")
        },
        {
          id: 3,
          name: "联系我们",
          img: require("../../assets/images/index_images/icon_3.jpg")
        },
        {
          id: 4,
          name: "商品分类",
          img: require("../../assets/images/index_images/icon_4.jpg")
        }
      ],
      sale: [
        {
          img1: require("../../assets/images/index_images/timer.jpg")
        },
        {
          img2: require("../../assets/images/index_images/shop_5.jpg")
        },
        {
          img3: require("../../assets/images/index_images/brand.jpg")
        },
        {
          img4: require("../../assets/images/index_images/shop_1.jpg")
        },
        {
          img5: require("../../assets/images/index_images/shop_2.jpg")
        },
        {
          img6: require("../../assets/images/index_images/shop_3.jpg")
        }
      ],
      poster: {
        imgUrl: require("../../assets/images/index_images/bar.jpg")
      },
      hotsList: [],
      newsList: [],
      goodsList: []
    };
  },
  computed: {
    ...mapGetters(["getNum"])
  },
  mounted() {
    // 组件一加载，就调取并发处理
    axios.all([getbanner(), getindexgoods(), getseckill()]).then(
      axios.spread((banners, goods, seckList) => {
        this.bannerList = banners.data.list;
        this.hotsList = goods.data.list[0].content;
        this.newsList = goods.data.list[1].content;
        this.goodsList = goods.data.list[2].content;
        // console.log(seckList, "秒杀信息");
        this.title = seckList.data.list[0].title;
        this.start = seckList.data.list[0].begintime;
        this.end = Number(seckList.data.list[0].endtime);
        let timer = this.end - new Date().getTime();
        //倒计时思路： 获取结束时间与当前时间进行差值
        //把得到的结果进行转化
        console.log(timer);
        this.timer = timer;
      })
    );
    this.getCate();
  },
  methods: {
    sel(i, fid) {
      console.log(fid);
      this.$router.push({
        path: "/classify",
        query: {
          fid
        }
      });
      this.$store.dispatch("getActionNum", i);
    },
    select(i) {
      this.num = i;
    },
    // 点击三角，内容呈现，再点击，内容缩回
    show() {
      // this.$refs.show.parentNode.parentNode.style.height = 1.6 + "rem";
      this.$refs.show.parentNode.previousElementSibling.style.height =
        1.6 + "rem";
      this.$refs.show.parentNode.style.display = "none";
      console.log(this.$refs.show.parentNode.previousElementSibling);
    },
    // 获取一级分类信息
    getCate() {
      getcate().then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.navList = res.data.list;
        }
      });
    },
    // 从商品分类点击进入列表页
    goList(index) {
      if (index == 3) {
        this.$router.push("/classify");
      }
    },
    // 点击商品进入详情页
    goDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/proDetail",
        query: {
          id
        }
      });
    }
  }
};
</script>
<style lang="" scoped>
@import "../../assets/css/index.css";
.van-count-down {
  float: left;
  margin-right: 0.1rem;
}
.mint-swipe {
  height: 2.91rem;
}
.mint-swipe-item a img {
  width: 7.5rem;
  height: 2.91rem;
}

.van-tabs__nav--card .van-tab.van-tab--active {
  color: #fff;
  background-color: #f26b11 !important;
}
.van-tabs__nav--card {
  box-sizing: border-box;
  height: 30px;
  margin: 0 16px;
  border: 1px solid #f26b11 !important;
  border-radius: 2px;
}

.van-tabs__wrap >>> .van-tabs__nav--card .van-tab {
  color: #0c0c0c !important;
  border-right: 1px solid #e4e4e4 !important;
}

.van-card__price {
  color: #f26b11 !important;
}
.van-card {
  box-shadow: 0.06rem -0.03rem 0.06rem #e9e9e9, -0.06rem 0.03rem 0.06rem #e9e9e9;
  padding-top: 0.46rem;
}
.van-card:nth-child(1) {
  margin-top: 0.2rem;
}
</style>
