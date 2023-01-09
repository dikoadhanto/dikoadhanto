<template>
  <div id="chart">
    <apexchart
      type="line"
      height="190"
      :width="widthSet"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div class="row" v-if="dataTable.length > 0">
      <div class="col"></div>
      <div class="col"></div>
      <div class="col text-right">
        <b>Last Updated</b>
        <p class="m-0" v-text="lastUpdatedDate"></p>
        <p v-text="lastUpdatedHour"></p>
      </div>
    </div>
  </div>
</template>

<script>
// import ApiService from "@/core/services/api.service.js";
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import textHelper from "@/core/helpers/textHelper.js";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Line",
  data() {
    return {
      series: [],
      chartOptions: {},
      dataTable: [],
      dailyData: [],
      weeklyData: [],
      monthlyData: [],
      yearlyData: [],
      max: 100,
      value: 80,
      widthSet: "100%",
    };
  },
  computed: {
    ...mapGetters([
      "setDataGraphLocation",
      "setIsCategoryGraph",
      "setIsRtuPortId",
      "setIsPercentage",
      "setIsLocation",
      "setOneRegional",
    ]),
    lastUpdatedDate() {
      return textHelper.formatDate(
        "dddd DD/MM/YYYY",
        this.dataTable[this.dataTable.length - 1].timestamp
      );
    },
    lastUpdatedHour() {
      return textHelper.formatDate(
        "HH:MM",
        this.dataTable[this.dataTable.length - 1].timestamp
      );
    },
  },
  watch: {
    setIsCategoryGraph: function () {
      this.getDailyVolumeData(this.setIsRtuPortId);
    },
    startDate: {
      immediate: true,
      deep: true,
      handler() {
        this.getDailyVolumeData(this.setIsRtuPortId);
      },
    },
    endDate: function () {
      this.getDailyVolumeData(this.setIsRtuPortId);
    },
  },
  props: {
    startDate: String,
    endDate: String,
    propsModal: Boolean,
  },
  mounted() {
    this.getChartData();
    this.myInterval = setInterval(() => {
      this.getChartData();
    }, 15000);
  },
  destroyed() {
    clearInterval(this.myInterval);
  },
  methods: {
    async getDailyVolumeData(rtuPortId) {
      let isPercentage = this.setIsPercentage;
      this.$bvModal.show("modalLoading");
      let qParams = {
        groupTime: this.setIsCategoryGraph,
      };

      // set start date
      let oneDay = 24 * 60 * 60 * 1000;
      let dateToday = Date.now();
      let startDate = dateToday - oneDay;
      if (this.startDate != "") {
        startDate = new Date(this.startDate).getTime();
        qParams = {
          ...qParams,
          startDate: startDate,
        };
      }

      let endDate = Date.now();
      if (this.endDate != "") {
        endDate = new Date(this.endDate).getTime();
      }
      qParams = {
        ...qParams,
        endDate: endDate,
      };

      let isLocation = this.setIsLocation;
      if (isLocation == true) {
        await ApiService.query(
          `/locations/bbm/monitoring/${this.setIsRtuPortId}`,
          {
            params: qParams,
          }
        )
          .then(({ data }) => {
            // let resData = data.result.locations;
            let resData = data.result;
            this.dataTable = resData;
            let maxTankValue = resData.map((item) => {
              if (isPercentage) {
                return 100;
              } else {
                return Number(item.max_value).toFixed(2);
              }
            });
            let mapTankVolume = resData.map((item) => {
              if (isPercentage) {
                return Number(item.percentage).toFixed(2);
              } else {
                return Number(item.volume).toFixed(2);
              }
            });
            let mapTankHour = resData.map((item) => {
              if (this.setIsCategoryGraph === "daily") {
                return textHelper.formatDate("HH:mm", item.timestamp);
              } else if (this.setIsCategoryGraph === "weekly") {
                return textHelper.formatDate("dddd", item.timestamp);
              } else if (this.setIsCategoryGraph === "monthly") {
                return textHelper.formatDate("DD MMMM");
              } else if (this.setIsCategoryGraph === "yearly") {
                return textHelper.formatDate("MMMM", item.timestamp);
              }
            });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              mapTankHour,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let idRegional = this.setOneRegional;
        await ApiService.query(
          `/regionals/bbm/monitoring/${idRegional}/sensor-fail/${rtuPortId}`,
          {
            params: qParams,
          }
        )
          .then(({ data }) => {
            let resData = data.result.regionals;
            this.dataTable = resData;
            let maxTankValue = resData.map((item) => {
              if (isPercentage) {
                return 100;
              } else {
                return Number(item.max_value).toFixed(2);
              }
            });
            let mapTankVolume = resData.map((item) => {
              if (isPercentage) {
                return Number(item.percentage).toFixed(2);
              } else {
                return Number(item.volume).toFixed(2);
              }
            });
            let mapTankHour = resData.map((item) => {
              if (this.setIsCategoryGraph === "daily") {
                return textHelper.formatDate("HH:mm", item.timestamp);
              } else if (this.setIsCategoryGraph === "weekly") {
                return textHelper.formatDate("dddd", item.timestamp);
              } else if (this.setIsCategoryGraph === "monthly") {
                return textHelper.formatDate("MMMM", item.timestamp);
              } else if (this.setIsCategoryGraph === "yearly") {
                return textHelper.formatDate("MMMM", item.timestamp);
              }
            });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              mapTankHour,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    getChartData() {
      if (this.setIsCategoryGraph == "daily") {
        this.getDailyVolumeData(this.setIsRtuPortId);
      } else if (this.setIsCategoryGraph == "weekly") {
        this.getWeeklyVolumeData(this.setIsRtuPortId);
      } else if (this.setIsCategoryGraph == "monthly") {
        this.getMonthlyVolumeData(this.setIsRtuPortId);
      } else if (this.setIsCategoryGraph == "yearly") {
        this.getYearlyVolumeData(this.setIsRtuPortId);
      }
    },
    setGraphData(maxTankValue, mapTankVolume, mapTankHour, setMaxValue) {
      const minimumData = Math.min(...mapTankVolume);
      const nameSeries = this.setIsPercentage ? "Percent" : "Liter";
      this.series = [
        {
          name: "Max Capacity",
          data: maxTankValue,
        },
        {
          name: `${nameSeries}`,
          data: mapTankVolume,
        },
      ];
      this.chartOptions = {
        chart: {
          id: "realtime",
          type: "line",
          height: 200,
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          redrawOnWindowResize: true,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          display: true,
          labels: {
            show: true,
            // rotate: -45,
          },
          categories: mapTankHour,
          // range: 100,
          tickPlacement: "on",
          tickAmount: 10,
        },
        yaxis: {
          show: true,
          labels: {
            offsetX: -10,
          },
          min: minimumData < 0 ? minimumData - 20 : 0,
          max: setMaxValue,
          tickAmount: 3,
        },
      };
    },
    async getWeeklyVolumeData(rtuPortId) {
      this.$bvModal.show("modalLoading");

      let isLocation = this.setIsLocation;
      let isPercentage = this.setIsPercentage;
      if (isLocation == true) {
        await ApiService.query(
          `/locations/bbm/monitoring/${this.setIsRtuPortId}?groupTime=weekly`
        )
          .then(({ data }) => {
            let resData = data.result;
            this.weeklyData = resData;
            let maxTankValue = this.weeklyData.map((item) => {
              if (isPercentage) {
                return 100;
              } else {
                return Number(item.max_volume).toFixed(2);
              }
              // return Number(item.max_value).toFixed(2);
            });
            let mapTankVolume = this.weeklyData.map((item) => {
              if (isPercentage) {
                return Number(item.percentage).toFixed(2);
              } else {
                return Number(item.volume).toFixed(2);
              }
            });
            let mapTankHour = resData.map((item) => {
              if (this.setIsCategoryGraph == "daily") {
                return textHelper.formatDate("HH:mm", item.timestamp);
              } else if (this.setIsCategoryGraph == "weekly") {
                return textHelper.formatDate("dddd", item.timestamp);
              } else if (this.setIsCategoryGraph == "monthly") {
                return textHelper.formatDate("MMMM", item.timestamp);
              } else if (this.setIsCategoryGraph == "yearly") {
                return textHelper.formatDate("MMMM YYYY", item.timestamp);
              }
            });
            // let mapTankDate = this.weeklyData.map((item) => {
            //   return item.date;
            // });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              mapTankHour,
              // mapTankDate,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let idRegional = this.setOneRegional;
        await ApiService.query(
          `/regionals/bbm/monitoring/${idRegional}/sensor-fail/${rtuPortId}?groupTime=weekly`
        )
          .then(({ data }) => {
            let resData = data.result.regionals;
            this.weeklyData = resData;
            let maxTankValue = this.weeklyData.map((item) => {
              return Number(item.max_value).toFixed(2);
            });
            let mapTankVolume = this.weeklyData.map((item) => {
              return Number(item.volume).toFixed(2);
            });
            let mapTankDate = this.weeklyData.map((item) => {
              return item.date;
            });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              mapTankDate,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    async getMonthlyVolumeData(rtuPortId) {
      this.$bvModal.show("modalLoading");

      let isLocation = this.setIsLocation;
      let isPercentage = this.setIsPercentage;
      if (isLocation == true) {
        await ApiService.query(
          `/locations/bbm/monitoring/${this.setIsRtuPortId}?groupTime=monthly`
        )
          .then(({ data }) => {
            let resData = data.result;
            this.monthlyData = resData;
            let maxTankValue = this.monthlyData.map((item) => {
              if (isPercentage) {
                return 100;
              } else {
                return Number(item.max_volume).toFixed(2);
              }
              // return Number(item.max_value);
            });
            let mapTankVolume = this.monthlyData.map((item) => {
              if (isPercentage) {
                return Number(item.percentage).toFixed(2);
              } else {
                return Number(item.volume).toFixed(2);
              }
            });
            let mapTankHour = resData.map((item) => {
              if (this.setIsCategoryGraph === "daily") {
                return textHelper.formatDate("HH:mm", item.timestamp);
              } else if (this.setIsCategoryGraph === "weekly") {
                return textHelper.formatDate("dddd", item.timestamp);
              } else if (this.setIsCategoryGraph === "monthly") {
                return textHelper.formatDate("dddd", item.timestamp);
              } else if (this.setIsCategoryGraph === "yearly") {
                return textHelper.formatDate("MMMM YYYY", item.timestamp);
              }
            });
            // let mapTankDate = this.monthlyData.map((item) => {
            //   return item.week;
            // });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              mapTankHour,
              // mapTankDate,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let idRegional = this.setOneRegional;
        await ApiService.query(
          `/regionals/bbm/monitoring/${idRegional}/sensor-fail/${rtuPortId}?groupTime=monthly`
        )
          .then(({ data }) => {
            let resData = data.result.regionals;
            this.monthlyData = resData;
            let maxTankValue = this.monthlyData.map((item) => {
              return Number(item.max_value).toFixed(2);
            });
            let mapTankVolume = this.monthlyData.map((item) => {
              return Number(item.volume).toFixed(2);
            });
            // let mapTankDate = this.monthlyData.map((item) => {
            //   return item.week;
            // });
            let setMaxValue = Math.max.apply(Math, maxTankValue);
            this.setGraphData(
              maxTankValue,
              mapTankVolume,
              // mapTankDate,
              setMaxValue
            );
            this.$bvModal.hide("modalLoading");
            return resData;
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    },
    async getYearlyVolumeData(rtuPortId) {
      this.$bvModal.show("modalLoading");

      let isLocation = this.setIsLocation;
      let isPercentage = this.setIsPercentage;
      if (isLocation == true) {
        await ApiService.query(
          `/locations/bbm/monitoring/${this.setIsRtuPortId}?groupTime=yearly`
        ).then(({ data }) => {
          let resData = data.result;
          this.yearlyData = resData;
          let maxTankValue = this.yearlyData.map((item) => {
            if (isPercentage) {
              return 100;
            } else {
              return Number(item.max_volume).toFixed(2);
            }
            // return Number(item.max_value);
          });
          let mapTankVolume = this.yearlyData.map((item) => {
            if (isPercentage) {
              return Number(item.percentage).toFixed(2);
            } else {
              return Number(item.volume).toFixed(2);
            }
          });
          let mapTankHour = resData.map((item) => {
            if (this.setIsCategoryGraph === "daily") {
              return textHelper.formatDate("HH:mm", item.timestamp);
            } else if (this.setIsCategoryGraph === "weekly") {
              return textHelper.formatDate("dddd", item.timestamp);
            } else if (this.setIsCategoryGraph === "monthly") {
              return textHelper.formatDate("MMMM", item.timestamp);
            } else if (this.setIsCategoryGraph === "yearly") {
              return textHelper.formatDate("MMMM YYYY", item.timestamp);
            }
          });
          // let mapTankDate = yearlyData.map((item) => {
          //   return item.month;
          // });
          let setMaxValue = Math.max.apply(Math, maxTankValue);
          this.setGraphData(
            maxTankValue,
            mapTankVolume,
            mapTankHour,
            // mapTankDate,
            setMaxValue
          );
          this.$bvModal.hide("modalLoading");
          return resData;
        });
      } else {
        let idRegional = this.setOneRegional;
        await ApiService.query(
          `/regionals/bbm/monitoring/${idRegional}/sensor-fail/${rtuPortId}?groupTime=yearly`
        ).then(({ data }) => {
          let resData = data.result.regionals;
          this.yearlyData = resData;
          let maxTankValue = this.yearlyData.map((item) => {
            return Number(item.max_value);
          });
          let mapTankVolume = this.yearlyData.map((item) => {
            return Number(item.volume).toFixed(2);
          });
          // let mapTankDate = yearlyData.map((item) => {
          //   return item.month;
          // });
          let setMaxValue = Math.max.apply(Math, maxTankValue);
          this.setGraphData(
            maxTankValue,
            mapTankVolume,
            // mapTankDate,
            setMaxValue
          );
          this.$bvModal.hide("modalLoading");
          return resData;
        });
      }
    },
  },
};
</script>
