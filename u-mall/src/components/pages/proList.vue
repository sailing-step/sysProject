<template>
  <div>
    <div class="container">
      <!-- <header class="header">
        <div class="wrap">
          <a href="javascript:;" @click="$router.go(-1)">
            <img :src="head.img" alt />
          </a>
          <h2>商品分类</h2>
          <div class="points">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>-->
      <top></top>
      <div class="fixed-nav">
        <ul>
          <li v-for="(item, i) in iconNavList" :key="item.id" @click="sel(i)">
            <i :class="[i == num ? 'bar' : '']"></i>
            <a href="javascript:;" :class="[i == num ? 'orange' : '']">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <div>
          <div class="head-nav">
            <h3>洗发类</h3>
            <div class="more">
              <a href="javascript:;" @click="goSearch">更多></a>
            </div>
          </div>
          <ul class="pro-list">
            <li v-for="(item, index) in goodsList" :key="item.id">
              <a href="javascript:;">
                <img
                  :src="item.img"
                  alt
                  :class="{
                    one: index == 0,
                    two: index == 1,
                    three: index == 2,
                    four: index == 3,
                    five: index == 4,
                    six: index == 5
                  }"
                />
                <br />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
        <div class="head-nav nav">
          <h3>染发类</h3>
          <div class="more">
            <a href="javascript:;">更多></a>
          </div>
        </div>
        <ul class="pro-list list">
          <li v-for="item in colorList" :key="item.id">
            <a href="javascript:;">
              <img :src="item.img" alt class="first" />
              <br />
              {{ item.name }}
            </a>
          </li>
        </ul>
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
      iconNavList: [
        {
          id: 1,
          name: "施华蔻"
        },
        {
          id: 2,
          name: "沙宣"
        },
        {
          id: 3,
          name: "欧莱雅"
        },
        {
          id: 4,
          name: "潘婷"
        },
        {
          id: 5,
          name: "资生堂"
        },
        {
          id: 6,
          name: "阿道夫"
        },
        {
          id: 7,
          name: "卡诗"
        },
        {
          id: 8,
          name: "海飞丝"
        },
        {
          id: 9,
          name: "飘柔"
        }
      ],
      goodsList: [
        {
          id: 1,
          img: require("../../assets/images/classify/shop_1.jpg"),
          name: " 护亮泽洗发水"
        },
        {
          id: 2,
          img: require("../../assets/images/list_images/pic1.jpg"),
          name: " 滋养洗发水"
        },
        {
          id: 3,
          img: require("../../assets/images/list_images/pic2.jpg"),
          name: "  柔顺洗发露"
        },
        {
          id: 4,
          img: require("../../assets/images/list_images/pic3.jpg"),
          name: "  去屑洗发露"
        },
        {
          id: 5,
          img: require("../../assets/images/list_images/list01.jpg"),
          name: "  柔顺洗发露"
        },
        {
          id: 6,
          img: require("../../assets/images/list_images/list02.jpg"),
          name: " 焕彩洗发水"
        }
      ],
      colorList: [
        {
          id: 1,
          img: require("../../assets/images/list_images/list.jpg"),
          name: "  施华蔻染发"
        },
        {
          id: 2,
          img: require("../../assets/images/list_images/list03.jpg"),
          name: " 滋养洗发水"
        },
        {
          id: 3,
          img: require("../../assets/images/list_images/list04.jpg"),
          name: "  柔顺洗发露"
        }
      ]
    };
  },
  methods: {
    sel(i) {
      this.num = i;
    },
    goSearch() {
      this.$router.push("/search");
    }
  },
  mounted() {
    // console.log(this.$route);
  }
};
</script>
<style scoped>
@import "../../assets/css/proList.css";
</style>
