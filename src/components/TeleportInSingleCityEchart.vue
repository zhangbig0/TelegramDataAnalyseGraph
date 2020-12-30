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
  name: "TeleportInSingleCityEchart",
  props: ["city"],
  methods: {
    lineCharts() {
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
        .get(
          "https://localhost:44391/api/Location/GetTeleRecordByCity?cityName=" +
            this.city
        )
        .then(function (response) {
          data = response.data;
          let myChart = echarts.init(document.getElementById("main"));
          let option = {
            series: [
              {
                name: "lines",
                type: "lines",
                coordinateSystem: "geo",
                symbolSize: 10,
                progressive: 200,
                 lineStyle: {
                color: "#a6c84c",
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
                data: [],
              },
              {
                name: "teleCities",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                  brushType: "stroke",
                },
                label: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
                },
                symbolSize: function (value) {
                  return value[2] / 8;
                },
                itemStyle: {
                  color: "#a6c84c",
                },
                data: data.teleport.map(function (dataItem) {
                  return {
                    name: dataItem.city,
                    value: [
                      dataItem.latitude,
                      dataItem.longitude,
                      Math.random() * 100,
                    ],
                  };
                }),
              },
            ],
          };
          data.teleport.forEach((element) => {
            option.series[0].data.push({
              fromName: data.city,
              toName: element.city,
              coords: [data.position, [element.latitude, element.longitude]],
             
            });
          });

          myChart.setOption(option);
        });
    },
  },
  mounted() {
    this.lineCharts();
    this.getData();
  },
};
</script>
