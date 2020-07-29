<template>
  <div style="overflow:hidden">
    <header class="header">
      <div class="wrap">
        <a href="javascript:;" @click="$router.go(-1)">
          <img :src="img" alt />
        </a>
        <h2>{{ $route.name }}</h2>
        <div class="points">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img: require("../assets/images/public/arrow.jpg"),
      title: "商品分类"
    };
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style scoped>
.container {
  position: relative;
  width: 7.5rem;
  margin: 0 auto;
}
.wrap {
  width: 7.1rem;
  margin: 0 auto;
}
.header {
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -3.75rem;
  height: 0.88rem;
  width: 7.5rem;
  background-color: #f26b11;
  z-index: 999;
  /* overflow: hidden; */
}
.header .wrap {
  display: flex;
  height: 0.88rem;
  justify-content: space-between;
  align-items: center;
}
.header img {
  width: 0.17rem;
  height: 0.29rem;
}
.header h2 {
  font-size: 0.36rem;
  color: #fff;
}
.header .points span {
  display: inline-block;
  margin-left: 0.08rem;
  width: 0.12rem;
  height: 0.12rem;
  background-color: #fff;
  border-radius: 50%;
}
</style>
