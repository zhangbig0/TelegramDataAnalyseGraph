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
  name: "TeleportInCityEchart",
  methods: {
    mapBarCharts(rawData) {
      echarts.registerMap("china", chinaJson);
      let myChart = echarts.init(document.getElementById("main"));

      let option = {
        animation: false,
        // 地图背景颜色
        backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [
          {
            offset: 0,
            color: "#4b5769",
          },
          {
            offset: 1,
            color: "#404a59",
          },
        ]),
        // tooltip: {
        //   trigger: "axis",
        // },
        geo: {
          map: "china",
          // silent: true,
          roam: true,
          zoom: 1.155, // 地图初始大小
          label: {
            emphasis: {
              show: false,
              areaColor: "#eee",
            },
          },
          // 地区块儿颜色
          itemStyle: {
            normal: {
              areaColor: "#55C3FC",
              borderColor: "#fff",
            },
            emphasis: {
              areaColor: "#21AEF8",
            },
          },
        },
        series: [],
      };

      function renderEachCity() {
        var option = {
          xAxis: [],
          yAxis: [],
          grid: [],
          series: [],
        };
        echarts.util.each(rawData, function (dataItem, idx) {
          var geoCoord = dataItem.position;
          var coord = myChart.convertToPixel("geo", geoCoord);
          // var boundL = -12.782788213627585;
          // var boundR = 35.92763028872384;
          // var boundT = 32.22854555899493;
          // var boundB = 95.18817097360194;
          // if (!coord ||
          //     geoCoord[0] < boundL ||
          //     geoCoord[0] > boundR ||
          //     geoCoord[1] > boundB ||
          //     geoCoord[1] < boundT
          // ) {
          //     return;
          // }
          idx += "";

          // for (var k = 0; k < inflationYearCount; k++) {
          //     inflationData.push(dataItem[inflationStartIdx + k]);
          // }

          option.xAxis.push({
            id: idx,
            gridId: idx,
            type: "category",
            name: dataItem.city,
            // nameStyle: {
            //     color: 'red',
            //     fontSize: 12
            // },
            nameLocation: "middle",
            nameGap: 3,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#666",
              },
            },
            // data: xAxisCategory,
            data: ["数据A", "数据B"],
            z: 100,
          });
          option.yAxis.push({
            id: idx,
            gridId: idx,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#1C70B6",
              },
            },
            z: 100,
          });
          option.grid.push({
            id: idx,
            width: 20,
            height: 30,
            left: coord[0] - 15,
            top: coord[1] - 15,
            z: 100,
          });
          option.series.push({
            id: idx,
            type: "bar",
            xAxisId: idx,
            yAxisId: idx,
            barGap: 0,
            barCategoryGap: 0,
            large: true,
            progressive: 5000,
            progressiveThreshold: 3000,
            // data: inflationData,
            data: dataItem.data,
            z: 100,
          
            itemStyle: {
              normal: {
                color: function (params) {
                  // 柱状图每根柱子颜色
                  var colorList = ["#F75D5D", "#59ED4F"];
                  return colorList[params.dataIndex];
                },
              },
            },
          });
        });
        console.time("a");
        myChart.setOption(option);
        console.timeEnd("a");
      }
      setTimeout(renderEachCity, 0);
      // 缩放和拖拽
      function throttle(fn, delay, debounce) {
        var currCall;
        var lastCall = 0;
        var lastExec = 0;
        var timer = null;
        var diff;
        var scope;
        var args;

        delay = delay || 0;

        function exec() {
          lastExec = new Date().getTime();
          timer = null;
          fn.apply(scope, args || []);
        }

        var cb = function () {
          currCall = new Date().getTime();
          scope = this;
          args = arguments;
          diff = currCall - (debounce ? lastCall : lastExec) - delay;

          clearTimeout(timer);

          if (debounce) {
            timer = setTimeout(exec, delay);
          } else {
            if (diff >= 0) {
              exec();
            } else {
              timer = setTimeout(exec, -diff);
            }
          }

          lastCall = currCall;
        };

        return cb;
      }
      var throttledRenderEachCity = throttle(renderEachCity, 0);
      myChart.on("geoRoam", throttledRenderEachCity);
      myChart.setOption(option);

      // 点击显示柱状图

      //   // 生成遮挡层
      //   function creatWrap() {
      //     var zheDang = document.createElement("div");
      //     zheDang
      //       .addClass("zhedang")
      //       .css({
      //         width: "100%",
      //         height: "100%",
      //         position: "absolute",
      //         top: 0,
      //         left: 0,
      //         backgroundColor: "rgba(0,0,0,.2)",
      //       })
      //       .appendTo(".wrap");
      //   }
      //   // 去掉遮挡层
      //   function clearWrap(id) {
      //     $(id).click(function (e) {
      //       // console.log(this);
      //       this.remove();
      //       $(".tongJiTu").remove();
      //       return false;
      //     });
      //   }
    },
  },
  mounted() {
    axios
      .get("https://localhost:44391/api/Teleport/GetTeleportInCity")
      .then((response) => this.mapBarCharts(response.data));
  },
};
</script>