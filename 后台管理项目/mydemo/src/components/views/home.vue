<template>
  <div>
    <h1 class="title">欢迎光临本系统</h1>
    <div id="container"></div>
  </div>
</template>

<script>
// 局部引入 按需加载
import eChart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    //
    let echart = eChart.init(document.getElementById("container"));
    let option = {
      title: {
        text: "月访问量统计"
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line"
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    echart.setOption(option);
  }
};
</script>

<style lang="stylus" scoped>
#container {
width:600px
height:500px
}
.title{
  text-align :center;
  font-size: 26px
}
</style>
