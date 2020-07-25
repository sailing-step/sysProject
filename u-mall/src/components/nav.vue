<template>
  <div class="nav">
    <!-- <nav class="nav"> -->
    <div class="wrap">
      <ul>
        <li
          @click="sel(i)"
          v-for="(item, i) in navList"
          :key="item.id"
          :class="[i == num ? 'first' : '']"
        >
          <a href="#">{{ item.name }}</a>
        </li>
      </ul>
      <span class="arrow">
        <img :src="img" alt="" />
      </span>
    </div>
    <!-- </nav> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        }
      ],
      img: require("../assets/images/index_images/arrow.jpg")
    };
  },
  methods: {
    sel(i) {
      this.num = i;
    }
  }
};
</script>
<style lang="" scoped>
@import "../assets/css/index.css";
</style>
