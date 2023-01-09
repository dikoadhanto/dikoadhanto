<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="190"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <!-- <b-button @click="modalShow = !modalShow" variant="primary"></b-button> -->

    <b-modal
      size="xl"
      v-model="modalShow"
      :centered="true"
      hide-footer
      hide-header
    >
      <table class="table table-bordered">
        <thead class="text-center">
          <tr>
            <th rowspan="3">No</th>
            <th rowspan="3">Lokasi</th>
            <th colspan="2">Jumlah Tangki</th>
            <th colspan="2">Sensor</th>
            <th colspan="4">Object Monitoring</th>
          </tr>
          <tr>
            <th rowspan="2">Jumlah</th>
            <th rowspan="2">Kapasitas</th>
            <th rowspan="2">Jumlah</th>
            <th rowspan="2">Exception</th>
            <th colspan="4">BBM</th>
          </tr>
          <tr>
            <th>Volume</th>
            <th>Persen</th>
            <th>SUPP OPS</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr>
            <td>1</td>
            <td>TREG 1</td>
            <td>52</td>
            <td>52000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><b-button variant="success">AMAN</b-button></td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Bar",
  data() {
    return {
      modalShow: false,
      series: [
        {
          name: "Liter",
          data: [30, 40, 35, 50],
        },
      ],
      chartOptions: {
        chart: {
          height: 190,
          type: "bar",
          stacked: true,
          events: {
            // eslint-disable-next-line no-unused-vars
            click: (event, chartContext, config) => {
              // this.modalShow = true;
              this.randomize();
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
            // eslint-disable-next-line no-unused-vars
            dataPointSelection: function (event, chartContext, config) {},
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: true,
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
          categories: ["REG1", "REG2", "REG3", "REG4"],
          tickPlacement: "on",
        },
        yaxis: {
          title: {
            // text: val.title,
          },
          min: 0,
          max: 120,
          tickAmount: 3,
        },
      },
    };
  },
  props: {
    propsData: Object,
  },
  watch: {
    propsData: {
      handler: async function (val) {
        this.series = val.data;
        this.chartOptions = {
          annotations: {
            points: [
              {
                x: "Bananas",
                seriesIndex: 0,
                label: {
                  borderColor: "#775DD0",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                  text: "Bananas are good",
                },
              },
            ],
          },
          chart: {
            height: 350,
            type: "bar",
            stacked: true,
          },
          plotOptions: {
            bar: {
              borderRadius: 2,
              columnWidth: "50%",
            },
          },
          dataLabels: {
            enabled: true,
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
            display: false,
            labels: {
              show: false,
              rotate: -45,
            },
            categories: val.labels,
            tickPlacement: "on",
          },
          yaxis: {
            title: {
              text: val.title,
            },
          },
        };
      },
      deep: true,
    },
  },
  methods: {
    randomize() {
      this.series[0].data = [20, 10, 20, 10];
      this.chartOptions = {
        chart: {
          height: 190,
          type: "bar",
          stacked: true,
          events: {
            // eslint-disable-next-line no-unused-vars
            click: (event, chartContext, config) => {
              // this.modalShow = true;
              this.randomizeLocation();
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
            // eslint-disable-next-line no-unused-vars
            dataPointSelection: function (event, chartContext, config) {},
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: true,
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
          categories: ["KARAWANG", "BOGOR", "JAKARTA", "BANDUNG"],
          tickPlacement: "on",
        },
        yaxis: {
          title: {
            // text: val.title,
          },
          min: 0,
          max: 120,
          tickAmount: 3,
        },
      };
    },
    randomizeLocation() {
      let getLocation = ["KLARI", "TANJUNG PURA", "BATU JAYA", "PURWASARI"];
      this.series[0].data = [100, 80, 30, 60];
      this.chartOptions = {
        chart: {
          height: 190,
          type: "bar",
          stacked: true,
          events: {
            // eslint-disable-next-line no-unused-vars
            click: (event, chartContext, config) => {
              // this.modalShow = true;
              this.randomizeLocation();
              // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            },
            // eslint-disable-next-line no-unused-vars
            dataPointSelection: function (event, chartContext, config) {},
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            columnWidth: "50%",
          },
        },
        dataLabels: {
          enabled: true,
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
          categories: getLocation,
          tickPlacement: "on",
        },
        yaxis: {
          title: {
            // text: val.title,
          },
          min: 0,
          max: 120,
          tickAmount: 3,
        },
      };
    },
  },
};
</script>
