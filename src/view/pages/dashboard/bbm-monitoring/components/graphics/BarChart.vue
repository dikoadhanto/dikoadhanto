<template>
  <apexchart
    type="bar"
    height="400"
    width="100%"
    :options="chartOptions"
    :series="series"
    ref="chart"
  ></apexchart>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  props: ["type"],
  emits: ["changeGraph"],
  data() {
    return {
      chartOptions: {
        chart: {
          id: "chart-bar",
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const index = config.dataPointIndex;
              this.clickOnBar(index);
            },
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top",
            },
          },
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          position: "top",
        },
        dataLabels: {
          enabled: true,
          offsetY: -30,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
          hideOverflowingLabels: false,
        },
        xaxis: {
          categories: [],
          labels: {
            show: true,
            style: {
              fontSize: "10px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
      },
      series: [],
    };
  },
  computed: {
    ...mapGetters({
      dataBbm: "getDataBbm",
      activePage: "getActivePageBbm",
    }),
  },
  components: {
    apexchart: VueApexCharts,
  },
  watch: {
    type: async function (newVal) {
      await this.changeTypeForLocation(newVal);
      await this.setDataSeries(this.dataBbm);
      await this.setDataXaxis(this.dataBbm);
      this.updateChart();
    },
    dataBbm: async function (value) {
      await this.changeTypeForLocation(this.type);
      await this.setDataSeries(value);
      await this.setDataXaxis(value);
      this.updateChart();
    },
  },
  async mounted() {
    await this.setDataSeries(this.dataBbm);
    await this.setDataXaxis(this.dataBbm);
    this.updateChart();
  },
  methods: {
    changeTypeForLocation(type) {
      if (type == "alarm" && this.activePage == "location") {
        this.$emit("changeGraph");
      }
    },
    setDataSeries(datas) {
      if (this.type == "alarm") {
        this.setDataSeriesAlarm(datas);
        return;
      }

      if (this.activePage == "location") {
        this.setDataSeriesLocation(datas);
        return;
      }

      let name = "";
      let dataSeries = [];

      if (this.type == "volume") {
        name = "Volume";
        dataSeries = datas.map((data) =>
          Number(data.volume) > 0 ? Number(data.volume).toFixed(2) : 0
        );
      }

      if (this.type == "percent") {
        name = "Percentage";
        dataSeries = datas.map((data) =>
          Number(data.percentage) > 0 ? Number(data.percentage).toFixed(2) : 0
        );
      }

      this.series = [
        {
          name: this.type,
          data: dataSeries,
        },
      ];
    },
    setDataXaxis(datas) {
      this.chartOptions.xaxis.categories = datas.map((data) => data.name);
    },
    setDataSeriesAlarm(datas) {
      let dataSeriesAlarm = [];
      let dataSeriesFailed = [];

      dataSeriesAlarm = datas.map((data) => {
        return Number(data.alarm) > 0 ? Number(data.alarm) : 0;
      });

      dataSeriesFailed = datas.map((data) => {
        return Number(data.sensor_fail) > 0 ? Number(data.sensor_fail) : 0;
      });

      this.series = [
        {
          name: "Alarm",
          data: dataSeriesAlarm,
        },
        {
          name: "Alarm Failed",
          data: dataSeriesFailed,
        },
      ];
    },
    setDataSeriesLocation(datas) {
      let dataSeriesDaily = [];
      let dataSeriesMonthly = [];

      dataSeriesDaily = datas.map((data) => {
        const dataDaily = data.tanks.filter(
          (d) => d.type.toLowerCase() == "harian"
        );

        if (this.type == "volume") {
          if (dataDaily.length > 0) {
            let result = dataDaily.reduce((total, data) => {
              return total + Number(data.volume);
            }, 0);
            return result > 0 ? result.toFixed(2) : 0;
          } else {
            return 0;
          }
        }

        if (this.type == "percent") {
          let result = dataDaily.reduce((total, data) => {
            return total + Number(data.percentage);
          }, 0);
          return result > 0 ? result.toFixed(2) : 0;
        }
      });

      dataSeriesMonthly = datas.map((data) => {
        const dataMonthly = data.tanks.filter(
          (d) => d.type.toLowerCase() == "bulanan"
        );

        if (this.type == "volume") {
          if (dataMonthly.length > 0) {
            let result = dataMonthly.reduce((total, data) => {
              return total + Number(data.volume);
            }, 0);
            return result > 0 ? result.toFixed(2) : 0;
          } else {
            return 0;
          }
        }
        if (this.type == "percent") {
          if (dataMonthly.length > 0) {
            let result = dataMonthly.reduce((total, data) => {
              return total + Number(data.percentage);
            }, 0);
            return result > 0 ? result.toFixed(2) : 0;
          } else {
            return 0;
          }
        }
      });

      this.series = [
        {
          name: "Harian",
          data: dataSeriesDaily,
        },
        {
          name: "Bulanan",
          data: dataSeriesMonthly,
        },
      ];
    },
    updateChart() {
      if (this.type == "percent") {
        this.chartOptions.yaxis = {
          show: true,
          title: {
            text: "Percent (%)",
          },
        };
        this.chartOptions.dataLabels.formatter = function (val, opts) {
          return val + "%";
        };
      } else {
        this.chartOptions.yaxis = {
          show: true,
          title: {
            text: this.upperCaseFirstChart(this.type),
          },
        };
        this.chartOptions.dataLabels.formatter = function (val, opts) {
          return val;
        };
      }

      this.$refs["chart"].updateOptions(this.chartOptions);
    },
    clickOnBar(index) {
      const { id } = this.dataBbm[index];

      if (this.activePage == "regional") {
        this.$store.dispatch("setIdRegionalBbm", id);
        this.$store.dispatch("setActivePageBbm", "witel");
      }

      if (this.activePage == "witel") {
        this.$store.dispatch("setIdWitelBbm", id);
        this.$store.dispatch("setActivePageBbm", "location");
      }
    },
  },
};
</script>
