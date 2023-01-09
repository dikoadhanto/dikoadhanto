<template>
  <section id="graph-summary-alarm">
    <div class="card mb-8">
      <div class="card-header">
        <div class="wrap-print">
          <h4 class="title-summary-alarm m-0">
            Reporting Summary Alarm {{ getPageSummaryAlarm }}
          </h4>
        </div>
        <div class="wrap-print">
          <b-button
            variant="secondary"
            class="mr-3"
            @click="backToBefore"
            v-if="getPageSummaryAlarm != 'National'"
          >
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
          </b-button>
          <b-button variant="primary" class="mr-3" style="display: none">
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
        </div>
      </div>

      <div class="card-header">
        <div class="wrap-print">
          <h4 class="title-summary-alarm m-0 mr-4">
            Graphic of Alarm {{ getPageSummaryAlarm }}
          </h4>
          <span>Last Updated {{ lastUpdate }}</span>
        </div>
        <div class="wrap-print">
          <b-button
            :variant="activeCategory == 'daily' ? 'danger' : 'light'"
            @click="changeCategory('daily')"
            class="mr-3"
          >
            Daily
          </b-button>
          <b-button
            :variant="activeCategory == 'weekly' ? 'danger' : 'light'"
            @click="changeCategory('weekly')"
            class="mr-3"
          >
            Weekly
          </b-button>
          <b-button
            :variant="activeCategory == 'monthly' ? 'danger' : 'light'"
            @click="changeCategory('monthly')"
            class="mr-3"
          >
            Monthly
          </b-button>
          <b-button
            :variant="activeCategory == 'yearly' ? 'danger' : 'light'"
            @click="changeCategory('yearly')"
          >
            Yearly
          </b-button>
        </div>
      </div>

      <div class="card-body">
        <div id="chart" v-if="isChartReady">
          <!-- total data -->
          <div class="ml-8">
            <apexchart
              :options="optionsTotal"
              :series="seriesTotal"
              :height="50"
              ref="chart-total"
            ></apexchart>
          </div>

          <!-- chart data -->
          <apexchart
            v-if="!isChartError"
            :height="550"
            :options="chartOptions"
            :series="series"
            ref="chart"
            type="bar"
          ></apexchart>
          <div v-else>
            <b-alert variant="warning" show class="text-center"
              >Oops, data graphic belum tersedia.</b-alert
            >
          </div>
        </div>
        <div v-else>
          <b-alert variant="warning" show
            >Tunggu sebentar. Sedang pengambilan data...</b-alert
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";

export default {
  name: "GraphReportingSummaryAlarm",
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    ...mapGetters([
      "getPageSummaryAlarm",
      "getIdRegionalSummaryAlarm",
      "getIdWitelSummaryAlarm",
      "getIdTagsSummaryAlarm",
      "getStartDateSummaryAlarm",
      "getEndDateSummaryAlarm",
    ]),
  },
  mounted() {
    window.context = this;
    this.$store.dispatch("setDefaultSummaryAlarm");
    setTimeout(() => {
      this.getChartData();
    }, 1000);
  },
  data() {
    return {
      page: "regional",
      activeCategory: "daily",
      isChartReady: false,
      isChartError: false,
      lastUpdate: "00/00/0000 - 00:00:00",
      seriesTotal: [],
      optionsTotal: {
        chart: {
          type: "bar",
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "numeric",
          categories: [],
        },
        yaxis: {
          show: false,
        },
      },
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              let indexClicked = config.seriesIndex;
              let dataItem = this.series[indexClicked];
              this.clickChart(dataItem.id);
            },
          },
          zoom: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top",
              hideOverflowingLabels: false,
              allowOverlap: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
          hideOverflowingLabels: false,
          offsetY: -30,
          style: {
            fontSize: "11px",
            colors: ["#304758"],
          },
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            if (seriesIndex === w.config.series.length - parseInt(1)) {
              return w.globals.stackedSeriesTotals[dataPointIndex] - 10;
            }
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        xaxis: {
          categories: [],
        },
        tooltip: {
          enabled: true,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return `
            <div class="p-2" style="font-size: 11px">
              <div> ${w.globals.initialSeries[seriesIndex].name} :
              <span class="font-weight-bolder">${series[seriesIndex][dataPointIndex]}</span>
              </div>
              <div>Total Data : 
                <span class="font-weight-bolder">${w.globals.stackedSeriesTotals[dataPointIndex]}</span>
              </div>
            </div>
            `;
          },
        },
        legend: {
          position: "bottom",
          offsetY: 10,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
  watch: {
    activeCategory: function () {
      this.getChartData();
    },
    getIdRegionalSummaryAlarm: function () {
      if (this.getIdRegionalSummaryAlarm) {
        this.page = "witel";
        this.getChartData();
      } else {
        this.page = "regional";
        this.getChartData();
      }
    },
    getIdWitelSummaryAlarm: function () {
      if (this.getIdWitelSummaryAlarm) {
        this.page = "rtu";
        this.getChartData();
      } else {
        this.page = "witel";
        this.getChartData();
      }
    },
    getIdTagsSummaryAlarm: function () {
      this.getChartData();
    },
    getStartDateSummaryAlarm: function () {
      this.getChartData();
    },
    getEndDateSummaryAlarm: function () {
      this.getChartData();
    },
  },
  methods: {
    getChartData() {
      this.isChartReady = false;
      const startDate = new Date().setHours(0, 0, 0);
      const endDate = new Date().setHours(23, 59, 59);
      ApiService.query(`${process.env.VUE_APP_ROOT_API_2}/${this.page}/graph`, {
        params: {
          startDate: this.getStartDateSummaryAlarm ?? startDate,
          endDate: this.getEndDateSummaryAlarm ?? endDate,
          groupTime: this.activeCategory,
          tagId: this.getIdTagsSummaryAlarm,
          regionalId: this.getIdRegionalSummaryAlarm,
          witelId: this.getIdWitelSummaryAlarm,
        },
      }).then(({ data }) => {
        if (data.result.length) {
          const indexBigger = this.getIndexBigger(data.result);
          this.chartOptions.xaxis.categories = this.getTimeStamp(
            data.result,
            indexBigger
          );
          this.series = this.getDataSeries(data.result);

          this.setLastUpdate();
          this.isChartError = false;
          this.setTotalOptions();
        } else {
          this.isChartError = true;
        }
        this.setColorRegional();
        this.isChartReady = true;
      });
    },
    getIndexBigger(dataChart) {
      let tempData = dataChart.map((data) => data.datas.length);
      let biggerData = tempData.indexOf(Math.max(...tempData));
      return biggerData;
    },
    getTimeStamp(dataChart, index) {
      const sortTime = dataChart[index].datas.sort((a, b) =>
        a.timestamp.localeCompare(b.timestamp)
      );
      const dataTime = sortTime.map((item) =>
        textHelper.formatDate("DD-MM HH:mm", item.timestamp)
      );
      return dataTime;
    },
    getDataSeries(dataChart) {
      const result = dataChart.map((item) => {
        const data = item.datas.sort((a, b) =>
          a.timestamp.localeCompare(b.timestamp)
        );
        return {
          id: item.id,
          name: item.name,
          data: data.map((item) => Number(item.total_alert)),
        };
      });

      return result;
    },
    setLastUpdate() {
      const lastDate = new Date();
      this.lastUpdate = textHelper.formatDate("DD/MM/YYYY HH:mm:ss", lastDate);
    },
    setTotalOptions() {
      setTimeout(() => {
        const chart = this.$refs["chart"];
        this.optionsTotal.xaxis.categories =
          chart.chart.w.globals.stackedSeriesTotals;
        const chartTotal = this.$refs["chart-total"];
        chartTotal.updateOptions(this.optionsTotal, true);
      }, 1000);
    },
    setColorRegional() {
      if (this.page == "regional") {
        this.chartOptions.colors = [
          "#9b5fe0",
          "#16a4d8",
          "#60dbe8",
          "#8bd346",
          "#efdf48",
          "#f9a52c",
          "#d64e12",
        ];
      } else {
        delete this.chartOptions.colors;
      }
    },
    changeCategory(category) {
      this.activeCategory = category;
    },
    clickChart(id) {
      if (this.page == "regional") {
        this.page = "witel";
      } else if (this.page == "witel") {
        this.page = "rtu";
      }
      if (this.getPageSummaryAlarm == "National") {
        this.$store.dispatch("setPageSummaryAlarm", "Regional");
        this.$store.dispatch("setRegionalSummaryAlarm", id);
        this.$store.dispatch("setRegionalAlertSummaryAlarm", id);
      } else if (this.getPageSummaryAlarm == "Regional") {
        this.$store.dispatch("setPageSummaryAlarm", "Witel");
        this.$store.dispatch("setWitelSummaryAlarm", id);
        this.$store.dispatch("setWitelAlertSummaryAlarm", id);
      }
      this.getChartData();
    },
    backToBefore() {
      if (this.page == "rtu") {
        this.page = "witel";
      } else if (this.page == "witel") {
        this.page = "regional";
      }
      if (this.getPageSummaryAlarm == "Witel") {
        this.$store.dispatch("setPageSummaryAlarm", "Regional");
        this.$store.dispatch("setWitelSummaryAlarm", null);
        this.$store.dispatch("setWitelAlertSummaryAlarm", null);
      } else if (this.getPageSummaryAlarm == "Regional") {
        this.$store.dispatch("setRegionalSummaryAlarm", null);
        this.$store.dispatch("setRegionalAlertSummaryAlarm", null);
        this.$store.dispatch("setPageSummaryAlarm", "National");
      }
      this.$store.dispatch("setTableSummaryAlarm", "general");
      this.getChartData();
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap-print {
  display: flex;
  align-items: center;
}
</style>
