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
  name: "CityPointEchart",
  methods: {
    pointCharts() {
      echarts.registerMap("china", chinaJson);

      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        backgroundColor: "#404a59",
        title: {
          text: "全国主要城市电话号码拥有量",
          subtext: "data from own phone",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        //提示框组件
        tooltip: {
          trigger: "item",
          confine: true,
          formatter: (p) => {
            //自定义提示信息
            let dataCon = p.data;
            let txtCon = dataCon.name + "<br>值:" + dataCon.value[2];
            return txtCon;
          },
        },
        //左下lengend
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
        geo: {
          map: "china",
          emphasis: {
            itemStyle: {
              areaColor: "#2a333d",
            },
          },
          itemStyle: {
            //未激活样式
            areaColor: "#323c48",
            borderColor: "#111",
            //激活样式
          },
        },
        //数据
      });
    },
    getData() {
      let data;

      axios
        .get("https://localhost:44391/api/Phoneinfoes/GetCityPhoneCount")
        .then(function (response) {
          data = response.data;
          let myChart = echarts.init(document.getElementById("main"));
          myChart.setOption({
            series: [
              {
                name: "phone",
                type: "scatter",
                coordinateSystem: "geo",
                data: data.data,
                symbolSize: 12,
                //直接在点上显示标签
                label: {
                  show: false,
                  //normal: {
                  //    show: true
                  //},
                  //emphasis: {
                  //    show: true
                  //},
                  formatter: "{b}",
                  offset: [15, -15], //文字的相对偏移
                },
                //标签的样式
                itemStyle: {
                  emphasis: {
                    borderColor: "#fff",
                    borderWidth: 1,
                  },
                },
              },
            
              {
                name: "lines",
                type: "lines",
                coordinateSystem: "geo",
                symbolSize: 10,
                progressive:200,
                data: [
                  {
                    fromName: "长沙",
                    toName: "伊犁",
                    coords: [
                      [112.93886, 28.22778],
                      [81.32416, 43.91689],
                    ],
                    lineStyle: {
                      color: "#ffffff",
                      width: 1,
                      opacity: 0.6,
                      curveness: 0.2,
                    },
                  },
                 {
                    fromName: "开封",
                    toName: "白山",
                    coords: [
                      [114.30731,34.79726],
                      [126.42443,41.9408],
                    ],
                    lineStyle: {
                      color: "#ffffff",
                      width: 1,
                      opacity: 0.6,
                      curveness: 0.2,
                    },
                  },
                ],
              },
            ],
            visualMap: {
              min: data.min, //最小
              max: data.max, //最大
            },
          });
        });
    },
  },
  mounted() {
    this.pointCharts();
    this.getData();
  },
};
</script>