<template>
  <div class="text-center" @click="goToWitel(dataSeries.id)">
    <apexchart
      :height="230"
      type="radialBar"
      :options="chartOptions"
      :series="series"
      ref="chart"
    ></apexchart>
    <div class="font-weight-bolder">{{ dataSeries.name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  props: ["dataSeries"],
  data() {
    return {
      chartOptions: {
        plotOptions: {
          radialBar: {
            hollow: {
              size: "55%",
            },
            track: {
              dropShadow: {
                enabled: false,
                top: 3,
                left: 0,
                blur: 5,
                opacity: 0.42,
                color: "red",
              },
            },
            dataLabels: {
              value: {
                show: false,
              },
            },
          },
        },
        colors: this.getColors(),
        labels: this.getLabels(),
      },
      series: this.getSeries(),
    };
  },
  computed: {
    ...mapGetters(["getLevelTioc"]),
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {
    this.checkVac();
  },
  methods: {
    getLabels() {
      const ok = this.dataSeries.ok;
      const total = this.dataSeries.total;
      return [`${ok}/${total}`];
    },
    getSeries() {
      const ok = this.dataSeries.ok;
      const total = this.dataSeries.total;
      const percentage = (ok / total) * 100;
      return [percentage];
    },
    getColors() {
      const ok = this.dataSeries.ok;
      const total = this.dataSeries.total;
      const percentage = (ok / total) * 100;

      if (percentage < 30) return ["#FF0000"];

      if (percentage < 70) return ["#ffe203"];

      return ["#3ec23e"];
    },
    checkVac() {
      if (this.dataSeries.vac > 0) {
        let isVac = false;
        this.setVacInterval = setInterval(() => {
          isVac = !isVac;
          this.chartOptions.plotOptions.radialBar.track.dropShadow.enabled =
            isVac;
          this.$refs["chart"].updateOptions(this.chartOptions);
        }, 1000);
      }
    },
    goToWitel(id) {
      if (this.getLevelTioc == "regional") {
        this.$store.dispatch("setRegionalTioc", id);
        this.$store.dispatch("setLevelTioc", "witel");
        this.$store.dispatch("setRegionalNameTioc", this.dataSeries.name);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.setVacInterval);
  },
};
</script>
