<template>
  <div>
    <div class="container">
      <top></top>
      <div class="fixed-nav">
        <ul>
          <li v-for="(item, i) in navList" :key="item.id" @click="sel(i)">
            <i :class="[i == num ? 'bar' : '']"></i>
            <a href="javascript:;" :class="[i == num ? 'orange' : '']">{{
              item.catename
            }}</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <div>
          <div class="head-nav">
            <h3>{{ title }}</h3>
            <div class="more">
              <a href="javascript:;" @click="goSearch(fid)">更多></a>
            </div>
          </div>
          <ul class="pro-list">
            <li v-for="(item, index) in goodsList" :key="item.id">
              <a href="javascript:;">
                <img
                  :src="$imgUrl + item.img"
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
                {{ item.catename }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getcate, getcategoods, getcatetree } from "../../util/axios";
import { mapGetters } from "vuex";
export default {
  props: [],
  data() {
    return {
      title: "",
      fid: 0,
      head: {
        img: require("../../assets/images/public/arrow.jpg")
      },
      num: 0,
      navList: [],
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
      ]
    };
  },
  computed: {
    ...mapGetters(["getNum"])
  },
  mounted() {
    this.fid = this.$route.query.fid;
    // this.getcateTree();
    console.log(this.getNum);
    this.num = this.getNum;
    getcatetree().then(res => {
      if (res.data.code == 200) {
        console.log(res.data.list);
        this.navList = res.data.list;
        this.goodsList = res.data.list[this.num].children;
        this.title = res.data.list[this.num].catename;
      }
    });
  },
  methods: {
    sel(i) {
      this.num = i;
      getcatetree().then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list);
          this.navList = res.data.list;
          this.goodsList = res.data.list[i].children;
          console.log(this.goodsList);
          this.title = res.data.list[i].catename;
          this.fid = res.data.list[i].id;
          console.log(this.fid);
        }
      });
    },
    goSearch(fid) {
      console.log(this.$router);
      this.$router.push({
        path: "/search",
        query: {
          fid
        }
      });
    },
    // goDetail(id) {
    //   this.$router.push({
    //     path: "/proDetail",
    //     query: {
    //       id
    //     }
    //   });
    // },
    // 获取树形结构分类信息
    getcateTree(i) {
      getcatetree().then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list);
          this.navList = res.data.list;
        }
      });
    }
  }
};
</script>
<style scoped>
@import "../../assets/css/proList.css";
</style>
