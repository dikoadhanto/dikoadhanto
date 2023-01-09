<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { SET_HEAD_TABLE } from "@/core/services/store/headTable.module";
import { mapGetters } from "vuex";
import {
  SET_REGIONAL_ID,
  SET_WITEL_ID,
  // SET_IS_CATEGORY,
} from "@/core/services/store/data.module";
import ApiService from "@/core/services/api.service.js";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Bar",
  data() {
    return {
      modalShow: false,
      series: [],
      chartOptions: {},
      dataTable: [],
      max: 100,
      value: 80,
      tableColName: "Regional",
      regionalsData: [],
      witelsData: [],
      locationsData: [],
    };
  },
  props: {
    propsData: Array,
  },
  computed: {
    ...mapGetters([
      "setData",
      "setRegionalId",
      "setWitelId",
      "setLimit",
      "setPage",
      "setIsCategory",
      "setRegionalFilter",
      "headTable",
    ]),
  },
  watch: {
    setData: function () {
      if (this.setData.regionals) {
        this.getRegPercentage();
      }
      // else {
      //   this.drillDownLocation(0, 0, this.setWitelId);
      // }
    },
    witelsData: function () {
      this.generateWitelData();
    },
    setRegionalId: function () {
      if (this.setRegionalId.length > 0) {
        this.getMultipleWitel(this.setRegionalId);
      }
      this.getWitel(this.setRegionalId);
    },
    locationsData: function () {
      this.generateLocationsData();
    },
    headTable: function () {
      if (this.headTable === "headLocation") {
        // this.generateLocationsData();
      } else if (this.headTable === "headWitel") {
        this.generateWitelData();
      } else if (this.headTable === "headRegional") {
        this.getRegVolume();
      }
    },
    setIsCategory: function () {
      let mapWitel = this.witelsData.map((item) => {
        return item.id_regional;
      });
      if (this.regionalsData) {
        this.getRegVolume();
      } else if (mapWitel[0] === this.setRegionalId) {
        this.generateWitelData();
      } else if (this.locationsData) {
        this.generateLocationsData();
      }
    },
  },
  mounted() {
    this.getRegVolume();
  },
  methods: {
    showModal() {
      this.$nextTick(function () {
        this.$bvModal.show("modalShow");
      });
    },
    getRegVolume() {
      this.regionalsData = this.setData.regionals;
      if (this.regionalsData) {
        if (this.setIsCategory == "volume" && this.setRegionalId == null) {
          let mapRegVals = this.regionalsData.map((item) => {
            return item.volume > 0 ? item.volume.toFixed(2) : 0;
          });
          // let mapRegPercentage = this.regionalsData.map((item) => {
          //   return item.percentage.toFixed(2);
          // });
          let mapRegCategories = this.regionalsData.map((item) => {
            return item.regional.slice(7, item.regional.length);
          });
          this.changeHeadTable("headRegional");
          this.series = [
            {
              name: "Liter",
              data: mapRegVals,
            },
          ];
          this.chartOptions = {
            chart: {
              height: 400,
              type: "bar",
              // stacked: true,
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  let indexGraphClicked = config.dataPointIndex;
                  let idRegional =
                    this.regionalsData[indexGraphClicked].id_regional;

                  this.drillDownWitel(indexGraphClicked, idRegional);
                },
              },
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: "top", // top, center, bottom
                },
              },
            },
            dataLabels: {
              enabled: true,
              offsetY: -40,
              style: {
                fontSize: "12px",
                colors: ["#304758"],
              },
            },
            stroke: {
              width: 2,
            },
            tooltip: {
              shared: true,
              intersect: false,
            },
            grid: {
              row: {
                colors: ["#fff", "#f2f2f2"],
              },
            },
            xaxis: {
              display: true,
              labels: {
                show: true,
                rotate: -45,
                style: {
                  fontSize: "8px",
                  fontWeight: "bold",
                },
              },
              categories: mapRegCategories,
              tickPlacement: "on",
            },
            yaxis: {
              show: true,
              title: {
                text: "Liter",
                style: {
                  color: "#000000",
                  fontSize: "8px",
                },
              },
              min: 0,
              max: Math.max.apply(Math, mapRegVals),
              tickAmount: 3,
            },
          };
          this.dataTable = mapRegCategories;
        } else if (
          this.setIsCategory == "percentage" &&
          this.setRegionalId == null
        ) {
          this.getRegPercentage();
        } else if (
          this.setIsCategory == "alarm" &&
          this.setRegionalId == null
        ) {
          this.getRegAlarm();
        } else if (
          this.setIsCategory == "percentage" &&
          this.setRegionalId != null
        ) {
          this.getWitelPercentage();
        } else if (
          this.setIsCategory == "volume" &&
          this.setRegionalId != null
        ) {
          this.generateWitelData();
        } else if (
          this.setIsCategory == "alarm" &&
          this.setRegionalId != null
        ) {
          this.getWitelAlarm();
        }
      }
    },
    getRegPercentage() {
      this.regionalsData = this.setData.regionals;
      let mapRegPercentage = this.regionalsData.map((item) => {
        return item.percentage > 0 ? item.percentage.toFixed(2) : 0;
      });
      let mapRegCategories = this.regionalsData.map((item) => {
        return item.regional.slice(7, item.regional.length);
      });
      this.changeHeadTable("headRegional");
      this.series = [
        {
          name: "Liter",
          data: mapRegPercentage,
        },
      ];
      this.chartOptions = {
        chart: {
          height: 400,
          type: "bar",
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              let indexGraphClicked = config.dataPointIndex;
              let idRegional =
                this.regionalsData[indexGraphClicked].id_regional;
              let regionalName = this.regionalsData[indexGraphClicked].regional;

              this.drillDownWitel(indexGraphClicked, idRegional);
              this.$store.dispatch("setRegionalFilter", regionalName);
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -40,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          width: 2,
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            rotate: -45,
            style: {
              fontsize: "8px",
              fontWeight: "bold",
            },
          },
          categories: mapRegCategories,
          tickPlacement: "on",
        },
        yaxis: {
          show: true,
          title: {
            text: "Percent(%)",
            style: {
              color: "#000000",
              fontSize: "8px",
            },
          },
          min: 0,
          max: Math.max.apply(Math, mapRegPercentage),
          tickAmount: 3,
        },
      };
    },
    getRegAlarm() {
      this.regionalsData = this.setData.regionals;
      let mapRegAlarm = this.regionalsData.map((item) => {
        return item.alarm > 0 ? item.alarm : 0;
      });
      let mapRegAlarmFailed = this.regionalsData.map((item) => {
        return item.sensor_failed > 0 ? item.sensor_failed : 0;
      });
      let mapRegCategories = this.regionalsData.map((item) => {
        return item.regional.slice(7, item.regional.length);
      });
      let setMaxAlarm = mapRegAlarm.concat(mapRegAlarmFailed);
      this.changeHeadTable("headRegional");
      this.series = [
        {
          name: "Alarm",
          data: mapRegAlarm,
        },
        {
          name: "Alarm Failed",
          data: mapRegAlarmFailed,
        },
      ];
      this.chartOptions = {
        chart: {
          height: 400,
          type: "bar",
          stacked: false,
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -40,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          width: 2,
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            rotate: -45,
            style: {
              fontsize: "8px",
              fontWeight: "bold",
            },
          },
          categories: mapRegCategories,
          tickPlacement: "on",
        },
        yaxis: {
          show: true,
          title: {
            text: "Percent(%)",
            style: {
              color: "#000000",
              fontSize: "8px",
            },
          },
          min: 0,
          max: Math.max.apply(Math, setMaxAlarm),
          tickAmount: 3,
        },
      };
    },
    async drillDownWitel(idxGraphReg, id) {
      let idRegional = id;
      this.tableColName = "Witel";
      this.changeHeadTable("headWitel");
      // this.$store.dispatch(SET_DATA, this.witelsData);
      this.$store.dispatch(SET_REGIONAL_ID, idRegional);
      await this.getWitel(id);
    },
    async drillDownLocation(idxGraphReg, idxGraphClicked, id) {
      let idWitel = id;
      this.tableColName = "Location";
      this.changeHeadTable("headLocation");
      this.$store.dispatch(SET_WITEL_ID, idWitel);
      await this.getLocation(id);
    },
    changeHeadTable(headConfig) {
      this.$store.dispatch(SET_HEAD_TABLE, headConfig);
      // this.$store.dispatch(SET_DATA, this.witelsData);
    },
    async getWitel(idRegional) {
      this.$bvModal.show("modalLoading");

      await ApiService.query(`/witels/bbm/monitoring?regionalId=${idRegional}`)
        .then(({ data }) => {
          let resData = data.result.witels;
          this.witelsData = resData;
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMultipleWitel(idRegional) {
      await ApiService.query(
        `/witels/bbm/monitoring?regionalId=${idRegional.join("&regionalId=")}`
      )
        .then(({ data }) => {
          let resData = data.result.witels;
          this.witelsData = resData;
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generateWitelData() {
      if (this.setIsCategory === "volume" && this.setWitelId === null) {
        let mapNameWitels = this.witelsData.map((item) => {
          return item.witel;
        });
        let mapValsWitels = this.witelsData.map((item) => {
          return item.volume > 0 ? item.volume.toFixed(2) : 0;
        });
        this.changeHeadTable("headWitel");
        this.series = [
          {
            name: "Liter",
            data: mapValsWitels,
          },
        ];
        this.chartOptions = {
          chart: {
            height: 400,
            type: "bar",
            stacked: true,
            events: {
              dataPointSelection: (event, chartContext, config) => {
                let idxGraphWitelClicked = config.dataPointIndex;
                let idWitel = this.witelsData[idxGraphWitelClicked].id_witel;
                // this.drillDownLocation(idWitel);
                this.drillDownLocation(0, idxGraphWitelClicked, idWitel);
              },
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,

            offsetY: -40,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          stroke: {
            width: 2,
          },

          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            display: true,
            labels: {
              show: true,
              rotate: -45,
            },
            categories: mapNameWitels,
            tickPlacement: "on",
          },
          yaxis: {
            show: true,
            title: {
              text: "Liter",
              style: {
                color: "#000000",
              },
            },
            min: 0,
            max: Math.max.apply(Math, mapValsWitels),
            tickAmount: 3,
          },
        };
        this.dataTable = mapNameWitels;
      } else if (
        this.setIsCategory === "percentage" &&
        this.setWitelId === null
      ) {
        this.getWitelPercentage();
      } else if (
        this.setIsCategory === "percentage" &&
        this.setWitelId !== null
      ) {
        this.getLocationPercentage();
      } else if (this.setIsCategory === "volume" && this.setWitelId !== null) {
        this.generateLocationsData();
      }
      // }
    },
    getWitelPercentage() {
      let mapNameWitels = this.witelsData.map((item) => {
        return item.witel;
      });
      let mapValsWitels = this.witelsData.map((item) => {
        return item.percentage > 0 ? item.percentage.toFixed(2) : 0;
      });
      this.changeHeadTable("headWitel");
      this.series = [
        {
          name: "Percent(%)",
          data: mapValsWitels,
        },
      ];
      this.chartOptions = {
        chart: {
          height: 400,
          type: "bar",
          stacked: true,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              let indexGraphClicked = config.dataPointIndex;
              let idWitel = this.witelsData[indexGraphClicked].id_witel;
              this.drillDownLocation(0, indexGraphClicked, idWitel);
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -40,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          width: 2,
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            rotate: -45,
            style: {
              fontsize: "8px",
              fontWeight: "bold",
            },
          },
          categories: mapNameWitels,
          tickPlacement: "on",
        },
        yaxis: {
          show: true,
          title: {
            text: "Percent(%)",
            style: {
              color: "#000000",
              fontSize: "8px",
            },
          },
          min: 0,
          max: Math.max.apply(Math, mapValsWitels),
          tickAmount: 3,
        },
      };
    },
    getWitelAlarm() {
      let mapWitelAlarm = this.witelsData.map((item) => {
        return item.alarm > 0 ? item.alarm : 0;
      });
      let mapWitelAlarmFailed = this.witelsData.map((item) => {
        return item.sensor_failed > 0 ? item.sensor_failed : 0;
      });
      let mapWitelCategories = this.witelsData.map((item) => {
        return item.witel;
      });
      let setMaxAlarm = mapWitelAlarm.concat(mapWitelAlarmFailed);
      this.changeHeadTable("headWitel");
      this.series = [
        {
          name: "Alarm",
          data: mapWitelAlarm,
        },
        {
          name: "Alarm Failed",
          data: mapWitelAlarmFailed,
        },
      ];
      this.chartOptions = {
        chart: {
          height: 400,
          type: "bar",
          stacked: false,
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -40,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          width: 2,
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            rotate: -45,
            style: {
              fontsize: "8px",
              fontWeight: "bold",
            },
          },
          categories: mapWitelCategories,
          tickPlacement: "on",
        },
        yaxis: {
          show: true,
          title: {
            text: "Percent(%)",
            style: {
              color: "#000000",
              fontSize: "8px",
            },
          },
          min: 0,
          max: Math.max.apply(Math, setMaxAlarm),
          tickAmount: 3,
        },
      };
    },
    async getLocation(witelId) {
      this.$bvModal.show("modalLoading");
      await ApiService.query(`/locations/bbm/monitoring?witelId=${witelId}`)
        .then(({ data }) => {
          let resData = data.result.locations;
          var resultData = [];
          resData.map((data) => {
            resultData.push({
              id_location: data.id_location,
              location: data.location,
              tanks: data.tanks,
            });
          });

          this.locationsData = resultData;
          setTimeout(() => {
            this.$bvModal.hide("modalLoading");
          }, 600);
          this.generateLocationData();
          // return resData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async generateLocationsData() {
      // let groupData = await this.groupCalculateVol(this.locationsData);
      if (this.setIsCategory == "volume") {
        let groupData = this.locationsData;
        var arrayVolume = [];
        let arrayDaily = [];
        let arrayMonthly = [];
        await groupData.map((item) => {
          let harianSum = 0;
          let bulananSum = 0;
          item.tanks.map((items) => {
            arrayVolume.push(Number(items.volume.toFixed(2)));
            if (items.type === "harian") {
              harianSum += Number(items.volume.toFixed(2));
            } else if (items.type === "bulanan") {
              bulananSum += Number(items.volume.toFixed(2));
            }
          });
          arrayDaily.push(harianSum > 0 ? harianSum.toFixed(2) : 0);
          arrayMonthly.push(bulananSum > 0 ? bulananSum.toFixed(2) : 0);
        });
        var arrayName = [];
        groupData.map((item) => {
          arrayName.push(item.location);
        });
        // let setMaxVolume = arrayDaily.concat(arrayMonthly);
        this.changeHeadTable("headLocation");
        this.dataTable = arrayName;
        this.series = [
          {
            name: "Harian",
            data: arrayDaily,
          },
          {
            name: "Bulanan",
            data: arrayMonthly,
          },
        ];
        this.chartOptions = {
          chart: {
            height: 400,
            type: "bar",
            stacked: false,
            events: {
              dataPointSelection: (event, chartContext, config) => {
                // eslint-disable-next-line no-unused-vars
                let idxGraphWitelClicked = config.dataPointIndex;
              },
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -40,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
          stroke: {
            width: 2,
          },

          grid: {
            row: {
              colors: ["#fff", "#f2f2f2"],
            },
          },
          xaxis: {
            display: true,
            labels: {
              show: true,
              rotate: -45,
            },
            categories: arrayName,
            tickPlacement: "on",
          },
          yaxis: {
            show: true,
            title: {
              text: "Liter",
              style: {
                color: "#000000",
              },
            },
            min: 0,
            max: Math.max.apply(Math, [...arrayDaily, ...arrayMonthly]),
            tickAmount: 3,
          },
        };
      } else if (this.setIsCategory == "percentage") {
        this.getLocationPercentage();
      }
    },
    async getLocationPercentage() {
      let groupData = this.locationsData;
      var arrayVolume = [];
      let arrayDaily = [];
      let arrayMonthly = [];
      await groupData.map((item) => {
        let sumDaily = 0;
        let countDaily = 0;
        let sumMonthly = 0;
        let countMonthly = 0;
        item.tanks.map((items) => {
          if (items.type === "harian") {
            countDaily += 1;
            sumDaily += Number(items.percentage.toFixed(2));
          } else if (items.type === "bulanan") {
            countMonthly += 1;
            sumMonthly += Number(items.percentage.toFixed(2));
          }
          arrayVolume.push(Number(items.percentage.toFixed(2)));
        });
        const dailyPercent = sumDaily / countDaily;
        const monthlyPercent = sumMonthly / countMonthly;
        arrayDaily.push(isNaN(dailyPercent) ? 0 : dailyPercent.toFixed(0));
        arrayMonthly.push(
          isNaN(monthlyPercent) ? 0 : monthlyPercent.toFixed(0)
        );
      });
      var arrayName = [];
      groupData.map((item) => {
        arrayName.push(item.location);
      });
      this.changeHeadTable("headLocation");
      this.dataTable = arrayName;
      this.series = [
        {
          name: "Harian",
          data: arrayDaily,
        },
        {
          name: "Bulanan",
          data: arrayMonthly,
        },
      ];
      this.chartOptions = {
        chart: {
          height: 400,
          type: "bar",
          stacked: false,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              // eslint-disable-next-line no-unused-vars
              let idxGraphWitelClicked = config.dataPointIndex;
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -40,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        stroke: {
          width: 2,
        },

        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"],
          },
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            rotate: -45,
          },
          categories: arrayName,
          tickPlacement: "on",
        },
        yaxis: {
          show: true,
          title: {
            text: "Percent(%)",
            style: {
              color: "#000000",
            },
          },
          min: 0,
          // max: Math.max.apply(Math, arrayVolume),
          tickAmount: 3,
        },
      };
    },
  },
  groupCalculateVol(data) {
    var result = [];
    data.reduce(function (res, value) {
      if (!res[value.id_location]) {
        res[value.id_location] = {
          id_location: value.id_location,
          location: value.location,
          volume: 0,
        };
        result.push(res[value.id_location]);
      }
      res[value.id_location].volume += value.volume;
      return res;
    }, {});
    return result;
  },
};
</script>

<style scoped>
#chart {
  height: 100%;
}
</style>
