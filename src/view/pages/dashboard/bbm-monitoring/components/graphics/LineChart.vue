<template>
  <apexchart
    type="line"
    height="400"
    width="100%"
    :options="chartOptions"
    :series="series"
    ref="chart"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import ApiService from "@/core/services/api.service";

export default {
  props: ["type", "dataSeries", "dataOptions"],
  data() {
    return {
      chartOptions: {
        chart: {
          id: "chart-line",
        },
        legend: {
          show: true,
          position: "bottom",
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: this.dataOptions,
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            formatter: (value) => {
              return value;
            },
          },
        },
      },
      series: this.dataSeries,
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    if (this.type.toLowerCase() == "persen") {
      this.chartOptions.yaxis.labels = {
        show: true,
        formatter: (value) => {
          return value + "%";
        },
      };
      this.$refs["chart"].updateOptions(this.chartOptions);
    }
  },
};
</script>
