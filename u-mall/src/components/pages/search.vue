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
              <img :src="$imgUrl + item.img" alt="" />
            </a>
          </div>
          <div class="txt">
            <h3>{{ item.goodsname }}</h3>
            <p class="first"><span>¥</span>{{ item.price.toFixed(2) }}</p>
            <!-- <p class="second">{{ item.comment }}条评论</p> -->
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
import { getcategoods } from "../../util/axios";
export default {
  data() {
    return {
      fid: 0,
      head: {
        img1: require("../../assets/images/list_images/arrow.jpg"),
        img2: require("../../assets/images/list_images/logo.jpg")
      },
      searchBar: {
        img: require("../../assets/images/list_images/search.jpg")
      },
      goodsList: []
    };
  },
  mounted() {
    this.fid = this.$route.query.fid;
    this.getcateGoods(this.fid);
  },
  methods: {
    // 获取指定信息列表
    getcateGoods(fid) {
      getcategoods({ fid }).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.goodsList = res.data.list;
        }
      });
    },
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
