<template>
  <div>
    <div class="container">
      <header class="header">
        <div class="arrow" @click="$router.go(-1)">
          <img :src="head.img1" alt="" />
        </div>
        <h1>
          <a href="javascript:;">
            <img :src="head.img2" alt="" />
          </a>
        </h1>
        <div class="points">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
      <div class="search-box">
        <input type="text" placeholder="搜索商品" />
        <img :src="searchBar.img" alt="" />
      </div>
      <div class="content">
        <div
          class="proInfo"
          v-for="item in goodsList"
          :key="item.id"
          @click="goDetail()"
        >
          <div class="pic">
            <a href="#">
              <img :src="item.img" alt="" />
            </a>
          </div>
          <div class="txt">
            <h3>{{ item.goodsName }}</h3>
            <p class="first"><span>¥</span>{{ item.goodsPrice.toFixed(2) }}</p>
            <p class="second">{{ item.comment }}条评论</p>
          </div>
        </div>
      </div>
      <div class="fixed-menu">
        <div class="con">
          <div class="nav">
            <router-link activeClass="active" to="/home"
              ><i></i>首页</router-link
            >
            <router-link activeClass="active" to="/car"
              ><i></i>购物车</router-link
            >
            <router-link activeClass="active" to="/mine"
              ><i></i>我的</router-link
            >
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
        img1: require("../../assets/images/list_images/arrow.jpg"),
        img2: require("../../assets/images/list_images/logo.jpg")
      },
      searchBar: {
        img: require("../../assets/images/list_images/search.jpg")
      },
      goodsList: [
        {
          id: 1,
          img: require("../../assets/images/list_images/pic1.jpg"),
          goodsName:
            "阿道夫修护滋养洗发香乳 洗发水 持久留香520ml*2瓶 旗舰店正品焕新升级款",
          goodsPrice: 99,
          comment: 3625
        },
        {
          id: 2,
          img: require("../../assets/images/list_images/pic2.jpg"),
          goodsName: "滋源修护滋养洗发香 520ml*2瓶",
          goodsPrice: 123,
          comment: 6068
        },
        {
          id: 3,
          img: require("../../assets/images/list_images/pic3.jpg"),
          goodsName:
            "施华蔻修护滋养洗发香乳 洗发水 多效修护520ml*2瓶 旗舰店正品",
          goodsPrice: 109,
          comment: 2639
        },
        {
          id: 4,
          img: require("../../assets/images/list_images/pic4.jpg"),
          goodsName:
            "资生堂修护滋养洗发香乳 洗发水 持久留香520ml*2瓶 旗舰店正品焕新升级款",
          goodsPrice: 129,
          comment: 8675
        }
      ]
    };
  },
  methods: {
    goDetail() {
      this.$router.push("/proDetail");
    }
  }
};
</script>
<style scoped>
@import "../../assets/css/proClassify.css";
.fixed-menu .nav .active {
  color: #f26b11;
}
.header {
  border-bottom: none !important;
}
</style>
