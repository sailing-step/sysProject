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
            <li
              @click="sel(i)"
              v-for="(item, i) in navList"
              :key="item.id"
              :class="[i == num1 ? 'first' : '']"
            >
              <a href="#">{{ item.name }}</a>
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
        <div class="item" v-for="item in iconList" :key="item.id">
          <a href="javascript:;">
            <img :src="item.img" alt />
            <p>{{ item.name }}</p>
          </a>
        </div>
      </div>
      <div class="sale">
        <div class="left">
          <a href="#">
            <h3><img :src="sale[0].img1" alt />限时秒杀</h3>
            <p class="des">每天零点场 好货秒不停</p>
            <p class="time">
              <span>19</span>： <span>30</span>：
              <span>29</span>
              <i>秒杀</i>
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
          <div class="find-nav">
            <ul class="find">
              <li
                @click="select(i)"
                :class="[i == num ? 'first last' : 'last']"
                v-for="(item, i) in topList"
                :key="item.id"
              >
                <a href="javascript:;">{{ item.title }}</a>
              </li>
            </ul>
          </div>

          <div
            class="pro-info"
            v-for="list in topList[num].goodsList"
            :key="list.id"
          >
            <div class="item">
              <div class="pic">
                <a href="javascript:;">
                  <img :src="list.imgUrl" alt />
                </a>
              </div>
              <div class="detail">
                <a href="javascript:;">
                  <h3>{{ list.goodsName }}</h3>
                  <p>¥{{ list.goodsPrice | toPrice }}</p>
                </a>
                <span class="two">已售{{ list.sold }}件</span>
                <a href="javascript:;" class="fast">立即抢购</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getbanner } from "../../util/axios";
export default {
  data() {
    return {
      img: require("../../assets/images/index_images/logo.jpg"),
      img2: require("../../assets/images/index_images/arrow.jpg"),
      num1: 0,
      num: 0,
      navList: [
        {
          id: 1,
          name: "推荐"
        },
        {
          id: 2,
          name: "女装"
        },
        {
          id: 3,
          name: "鞋包"
        },
        {
          id: 4,
          name: "居家"
        },
        {
          id: 5,
          name: "母婴儿童"
        },
        {
          id: 6,
          name: "美食"
        },
        {
          id: 7,
          name: "果蔬"
        },
        {
          id: 8,
          name: "果蔬"
        },
        {
          id: 9,
          name: "果蔬"
        },
        {
          id: 10,
          name: "果蔬"
        }
      ],
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
      topList: [
        {
          id: 1,
          title: "热门推荐",
          goodsList: [
            {
              goodsName: "雅诗兰黛面霜50ml",
              goodsPrice: 800,
              sold: 800,
              imgUrl: require("../../assets/images/index_images/shop_4.jpg")
            },
            {
              goodsName: "澳洲绵羊油面霜gm",
              goodsPrice: 23,
              sold: 694,
              imgUrl: require("../../assets/images/index_images/shop_6.jpg")
            },
            {
              goodsName: "Kiehls科颜氏高保湿面霜",
              goodsPrice: 315,
              sold: 2564,
              imgUrl: require("../../assets/images/index_images/shop_7.jpg")
            }
          ]
        },
        {
          id: 2,
          title: "发现好货",
          goodsList: [
            {
              goodsName: "OMEGA自动机械男士腕表",
              goodsPrice: 33600,
              sold: 8,
              imgUrl: require("../../assets/images/index_images/watch1.jpg")
            },
            {
              goodsName: "OMEGA女士自动机械表",
              goodsPrice: 54160,
              sold: 6,
              imgUrl: require("../../assets/images/index_images/watch2.jpg")
            },
            {
              goodsName: "OMEGA海马系列机械男表",
              goodsPrice: 35440,
              sold: 4,
              imgUrl: require("../../assets/images/index_images/watch3.jpg")
            }
          ]
        },
        {
          id: 3,
          title: "只看专场",
          goodsList: [
            {
              goodsName: "玉兰油水漾动力保湿露50g",
              goodsPrice: 99,
              sold: 80,
              imgUrl: require("../../assets/images/index_images/oaly1.png")
            },
            {
              goodsName: "玉兰油(OLAY)多效修护霜50g",
              goodsPrice: 150,
              sold: 39000,
              imgUrl: require("../../assets/images/index_images/oaly2.jpg")
            },
            {
              goodsName: "OLAY玉兰油新生塑颜金纯面霜",
              goodsPrice: 179,
              sold: 800,
              imgUrl: require("../../assets/images/index_images/oaly3.jpg")
            }
          ]
        },
        {
          id: 4,
          title: "只看商品",
          goodsList: [
            {
              goodsName: "Balea保湿面霜",
              goodsPrice: 80,
              sold: 800,
              imgUrl: require("../../assets/images/index_images/Balea.jpg")
            },
            {
              goodsName: "SK-II超肌能紧致大红瓶",
              goodsPrice: 899,
              sold: 1600,
              imgUrl: require("../../assets/images/index_images/skii.jpg")
            },
            {
              goodsName: "SK-II青春露230ml",
              goodsPrice: 1155,
              sold: 900,
              imgUrl: require("../../assets/images/index_images/skii2.png")
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    sel(i) {
      this.$router.push("/proList");
      this.num1 = i;
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
    // 获取轮播图列表
    getBanner() {
      getbanner().then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list);
          this.bannerList = res.data.list;
        }
      });
    }
  }
};
</script>
<style lang="" scoped>
@import "../../assets/css/index.css";
.mint-swipe {
  height: 2.91rem;
}
.mint-swipe-item a img {
  width: 7.5rem;
  height: 2.91rem;
}
</style>
