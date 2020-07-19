<template>
  <div>
    <router-view></router-view>
    <div class="fixed-menu">
      <div class="con">
        <div class="nav">
          <router-link activeClass="active" to="/home"><i></i>首页</router-link>
          <router-link activeClass="active" to="/car"
            ><i></i>购物车</router-link
          >
          <router-link activeClass="active" to="/mine"><i></i>我的</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="" scoped>
@import "../../assets/css/index.css";
.fixed-menu .nav .active {
  color: #f26b11;
}
</style>
