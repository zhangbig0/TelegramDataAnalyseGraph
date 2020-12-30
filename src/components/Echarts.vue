<template>
  <div class="Echarts">
    <div id="main" style="width: 1000px; height: 800px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "../../public/china";
import chinaJson from "../../public/china.json";
import axios from "axios";

export default {
  name: "Echarts",
  methods: {
    myEcharts() {
    
      echarts.registerMap("china", chinaJson);
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        // 进行相关配置
        backgroundColor: "#02AFDB",
        // dataRange: {
        //   show: false,
        //   min: 0,
        //   max: 1000,
        //   text: ["High", "Low"],
        //   realtime: true,
        //   calculable: true,
        //   color: ["orangered", "yellow", "lightskyblue"],
        // },
        // toolbox: {
        //   show: true,
        //   //orient: 'vertical',
        //   left: "left",
        //   top: "top",
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        visualMap: {
          left: "right",
          min: 0,
          max: 6000,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
          text: ["High", "Low"], // 文本，默认为数值文本
          calculable: true,
        },
        tooltip: {
          trigger: "item",
          showDelay: 1,
          transitionDuration: 0.2,
          formatter: function (params) {
            var value = (params.value + "").split(".");
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
            return params.seriesName + "<br/>" + params.name + ": " + value;
          },
        },
        // geo: {
        //   // 这个是重点配置区
        //   map: "china", // 表示中国地图
        //   roam: true,
        //   label: {
        //     normal: {
        //       show: true, // 是否显示对应地名
        //       textStyle: {
        //         color: "rgba(0,0,0,0.4)",
        //       },
        //     },
        //   },
        //   itemStyle: {
        //     normal: {
        //       borderColor: "rgba(0, 0, 0, 0.2)",
        //     },
        //     emphasis: {
        //       areaColor: null,
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 0,
        //       shadowBlur: 20,
        //       borderWidth: 0,
        //       shadowColor: "rgba(0, 0, 0, 0.5)",
        //     },
        //   },
        // },

        series: [
          
        ],
      });
    
      axios
        .get(
          "https://localhost:44391/api/Phoneinfoes/GetProvinceLocations"
        )
        .then(function (response) {
          let data = response.data.data;
          var max = response.data.max;
          let min = response.data.min;
          // alert(data);
          myChart.setOption({
            series: [
              {
                name: "china PopEstimates",
                type: "map",
                
                roam: true,
                map: "china",
                emphasis: {
                  label: {
                    show: true,
                  },
                },
                // 文本位置修正
                textFixed: {
                  Alaska: [20, -20],
                },
                data: data,
              },
            ],
            visualMap:{
              max:max,
              min:min
            }
          });
        });
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>

<style>
</style>