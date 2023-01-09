<template>
  <b-modal
    id="modal-detail-port"
    size="xl"
    hide-footer
    @close="closeModal"
    @cancel="closeModal"
    @hidden="closeModal"
  >
    <section id="detail-port">
      <div class="container">
        <!-- detail -->
        <div class="mb-5">
          <div class="mb-3 row">
            <div class="col-sm-6">
              <input type="text" class="form-control" readonly value="PORT" />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                readonly
                value=""
                v-model="dataPort.no_port"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                value="DESKRIPSI"
              />
            </div>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                disabled
                value=""
                v-model="dataPort.description"
              />
            </div>
          </div>
        </div>

        <!-- rule -->
        <div class="mb-3 row align-items-center">
          <div class="col-sm-1">
            <label>Rule</label>
          </div>
          <div class="col-sm-2">
            <b-form-select
              class="form-control"
              v-model="selectRule"
              @change="changeChart"
            >
              <option
                v-for="(listRule, i) in dataPort.rules"
                :key="i"
                :value="listRule.rule"
              >
                {{ listRule.rule }} ( {{ listRule.status }} )
              </option>
            </b-form-select>
          </div>
        </div>

        <!-- row date  -->
        <div class="mb-5 row align-items-center">
          <div class="col-sm-1 pr-0">
            <label>Start Date</label>
          </div>
          <div class="col-sm-2">
            <b-form-datepicker
              v-model="selectStartDate"
              locale="en"
              :max="new Date()"
              @input="setFormatTgl('start-date')"
              :value-as-date="true"
            ></b-form-datepicker>
          </div>
          <div class="col-sm-1" v-if="activeCategory == 'Real Time'">
            <label>Start Time</label>
          </div>
          <div class="col-sm-2" v-if="activeCategory == 'Real Time'">
            <b-form-timepicker
              v-model="startTime"
              locale="en"
              :hour12="false"
            ></b-form-timepicker>
          </div>
          <div class="col-sm-1" v-if="activeCategory != 'Real Time'">
            <label>End Date</label>
          </div>
          <div class="col-sm-2" v-if="activeCategory != 'Real Time'">
            <b-form-datepicker
              v-model="selectEndDate"
              locale="en"
              :value-as-date="true"
              @input="setFormatTgl('end-date')"
            ></b-form-datepicker>
          </div>

          <!-- button -->
          <div class="col-sm-1"></div>
          <div class="col-sm-1">
            <b-button
              :variant="activeCategory == 'Real Time' ? 'primary' : 'light'"
              @click="changeToRealtimeCategory()"
              class="mx-2"
              >Real Time</b-button
            >
          </div>
          <div class="col-sm-1">
            <b-button
              :variant="activeCategory == 'Daily' ? 'primary' : 'light'"
              @click="changeNewCategory('Daily', 'hour', 'DD-MMM, HH:mm')"
              class="mx-2"
              >Daily</b-button
            >
          </div>
          <div class="col-sm-1">
            <b-button
              :variant="activeCategory == 'Weekly' ? 'primary' : 'light'"
              @click="changeNewCategory('Weekly', 'day', 'DD/MMM/YYYY')"
              class="mx-2"
              >Weekly</b-button
            >
          </div>
          <div class="col-sm-1">
            <b-button
              :variant="activeCategory == 'Monthly' ? 'primary' : 'light'"
              @click="changeNewCategory('Monthly', 'week', 'DD/MMM/YYYY')"
              class="mx-2"
              >Monthly</b-button
            >
          </div>
          <div class="col-sm-1">
            <b-button
              :variant="activeCategory == 'Yearly' ? 'primary' : 'light'"
              @click="changeNewCategory('Yearly', 'month', 'MMM/YYYY')"
              class="mx-2"
              >Yearly</b-button
            >
          </div>
        </div>

        <!-- graphic line -->
        <div v-if="isReady">
          <apexchart
            type="line"
            height="400"
            width="100%"
            :options="chartOptions"
            :series="series"
            ref="chart"
          ></apexchart>
        </div>
        <div v-else>
          <div class="loading-chart"></div>
        </div>
      </div>
    </section>
    <template #modal-title>
      Modal Port Analog
      <div class="rtu-name">{{ detailRTU.name }} ({{ detailRTU.sname }})</div>
      <div class="">
        <small style="color: #8d99ae">Last Update : {{ lastUpdate }} </small>
      </div>
    </template>
  </b-modal>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";
import Swal from "sweetalert2";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  emits: ["hideModal"],
  props: ["portMode", "isOpen", "idSelected", "detailRTU", "isFormula"],
  watch: {
    isOpen: function () {
      if (this.isOpen) {
        setTimeout(() => {
          this.isReady = true;
        }, 1000);
      }
    },
    idSelected: function () {
      if (this.idSelected !== null || this.idSelected != "") {
        this.getDetailPort();
      }
    },
  },
  data() {
    return {
      lastUpdate: "00/00/0000 - 00:00:00",

      isReady: false,
      dataPort: [],

      selectStartDate: "",
      selectEndDate: "",
      selectRule: "",

      startDate: "",
      endDate: "",
      startTime: "00:00:00",

      grupTime: 3600000,
      step: 900,

      //for akses button dayly,wekly,Monthly,Yearly
      activeCategory: "Daily",
      valueStartDate: "",
      valueEndDate: "",

      stepChart: [],
      valueChart: [],

      //data rules for chart
      valueTopChart: [],
      valueBottomChart: [],

      chartOptions: {
        chart: {
          id: "port",
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        stroke: {
          curve: "smooth",
          dashArray: [5, 0, 5],
        },
        xaxis: {
          categories: [],
        },
      },

      series: [
        {
          name: "Batas Atas",
          data: [],
        },
        {
          name: "Average",
          data: [],
        },
        {
          name: "Batas Bawah",
          data: [],
        },
        {
          name: "Maximum",
          data: [],
        },
        {
          name: "Minimum",
          data: [],
        },
      ],
    };
  },
  methods: {
    async changeNewCategory(category, filter, dateFormat) {
      clearInterval(this.setTimerInterval);
      this.activeCategory = category;
      let startDate = this.getStartDate(filter);
      const day = 60 * 1000 * 60 * 24;
      let endDate = Date.now() + (day - 6000);
      if (this.selectStartDate != "") {
        startDate = this.valueStartDate;
      }
      if (this.selectEndDate != "") {
        endDate = this.valueEndDate;
      }
      this.setDefaultValue();
      try {
        this.chartOptions.xaxis.categories = [];

        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_5}/operation`,
          `chart/pooling/${this.idSelected}?start=${startDate}&end=${endDate}&timeframe=${filter}&is_formula=${this.isFormula}`
        );

        let dataMax = [];
        let dataMin = [];

        data.result.forEach((element) => {
          this.stepChart.push(
            this.setFormatTglStepDate(element.timestamps, dateFormat)
          );
          dataMax.push(Number(element.value_max).toFixed(2));
          this.valueChart.push(Number(element.value_avg).toFixed(2));
          dataMin.push(Number(element.value_min).toFixed(2));
          if (this.selectRule != "") {
            if (this.dataPort.rules[0].rule) {
              var numberPattern = /\d+/g;
              let num = this.selectRule.match(numberPattern);
              let dataRules = num.sort((a, b) => a - b);
              let valueRule1, valueRule2;
              if (dataRules.length < 2) {
                valueRule1 = Number(dataRules[0]).toFixed(2);
                this.valueTopChart.push(valueRule1);
              } else {
                valueRule1 = Number(dataRules[0]).toFixed(2);
                valueRule2 = Number(dataRules[1]).toFixed(2);
                this.valueTopChart.push(valueRule2);
                this.valueBottomChart.push(valueRule1);
              }
            }
          }
        });
        this.series[0].data = this.valueTopChart;
        this.series[1].data = this.valueChart;
        this.series[2].data = this.valueBottomChart;
        this.series[3].data = dataMax;
        this.series[4].data = dataMin;
        this.chartOptions.xaxis.categories = this.stepChart;
        if (this.isReady) {
          this.$refs["chart"].updateOptions(this.chartOptions);
          this.$refs["chart"].updateSeries(this.series);
        }
        const lastDate = new Date();
        this.lastUpdate = textHelper.formatDate(
          "DD/MM/YYYY HH:mm:ss",
          lastDate
        );
      } catch (error) {
        console.log(error.response, "error analog .. .. ..");
        if (this.isReady) {
          this.$refs["chart"].updateOptions(this.chartOptions);
          this.$refs["chart"].updateSeries(this.series);
        }
      }
    },
    setDefaultValue() {
      this.valueChart = [];
      this.stepChart = [];
      this.valueTopChart = [];
      this.valueBottomChart = [];

      this.series[0].data = [];
      this.series[1].data = [];
      this.series[2].data = [];
      this.series[3].data = [];
      this.series[4].data = [];
    },
    getStartDate(filter) {
      const currentDate = Date.now();
      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;
      let startDate = 0;
      switch (filter) {
        case "hour":
          startDate = currentDate - day * 2;
          break;
        case "day":
          startDate = currentDate - day * 7;
          break;
        case "week":
          startDate = currentDate - day * 30;
          break;
        case "month":
          startDate = currentDate - day * 30 * 12;
          break;
        default:
          startDate = currentDate - day * 2;
          break;
      }

      return startDate;
    },
    changeChart() {
      setTimeout(() => {
        switch (this.activeCategory) {
          case "Daily":
            this.changeNewCategory("Daily", "hour", "DD-MMM, HH:mm");
            break;
          case "Weekly":
            this.changeNewCategory("Weekly", "day", "DD/MMM/YYYY");
            break;
          case "Monthly":
            this.changeNewCategory("Monthly", "week", "DD/MMM/YYYY");
            break;
          case "Yearly":
            this.changeNewCategory("Yearly", "month", "MMM/YYYY");
            break;
          default:
            this.changeNewCategory("Daily", "hour", "DD-MMM, HH:mm");
            break;
        }
      }, 1000);
    },
    async changeToRealtimeCategory() {
      this.activeCategory = "Real Time";
      this.selectStartDate = "";
      this.startTime = "00:00:00";
      await this.getDataRealtime();
      this.setTimerInterval = setInterval(() => {
        this.getDataRealtime();
      }, 10000);
    },
    checkNumber(number) {
      if (number[0] == 0) {
        return Number(number[1]);
      }
      return Number(number);
    },
    async getDataRealtime() {
      // set start date end date default
      let endDate = Date.now();
      const minute = 60 * 1000;
      let startDate = endDate - minute * 60;

      // if start date custom
      if (this.selectStartDate != "") {
        let dateNow = new Date(this.selectStartDate).getTime();
        let getHour = this.checkNumber(this.startTime.split(":")[0]);
        let getMinute = this.checkNumber(this.startTime.split(":")[1]);
        let getDataTime = 60 * (getHour * 60 + getMinute) * 1000;
        startDate = dateNow + getDataTime;
        endDate = startDate + 60 * minute;
      }

      this.setDefaultValue();
      this.chartOptions.xaxis.categories = [];
      try {
        const ip_md = `${this.dataPort.md_ip}:${this.dataPort.md_port}`;
        const { data } = await ApiService.get(
          `${process.env.VUE_APP_ROOT_API_5}/operation`,
          `chart/realtime?query=${
            this.dataPort.metrics
          }{ip_md="${ip_md}"}&start=${startDate / 1000}&end=${
            endDate / 1000
          }&step=15`
        );

        const dataRealtime =
          data.result.data.result.length > 0
            ? data.result.data.result[0].values
            : [];

        dataRealtime.forEach((element) => {
          this.stepChart.push(
            this.setFormatTglStepDate(element[0] * 1000, "HH:mm:ss")
          );
          this.valueChart.push(Number(element[1]).toFixed(2));
          if (this.selectRule != "") {
            if (this.dataPort.rules[0].rule) {
              var numberPattern = /\d+/g;
              let num = this.selectRule.match(numberPattern);
              let dataRules = num.sort((a, b) => a - b);
              let valueRule1, valueRule2;
              if (dataRules.length < 2) {
                valueRule1 = Number(dataRules[0]).toFixed(2);
                this.valueTopChart.push(valueRule1);
              } else {
                valueRule1 = Number(dataRules[0]).toFixed(2);
                valueRule2 = Number(dataRules[1]).toFixed(2);
                this.valueTopChart.push(valueRule2);
                this.valueBottomChart.push(valueRule1);
              }
            }
          }
        });
        this.series[0].data = this.valueTopChart;
        this.series[1].data = this.valueChart;
        this.series[2].data = this.valueBottomChart;
        this.chartOptions.xaxis.categories = this.stepChart;
        const lastDate = new Date();
        if (this.isReady) {
          this.$refs["chart"].updateOptions(this.chartOptions);
          this.$refs["chart"].updateSeries(this.series);
        }
        this.lastUpdate = textHelper.formatDate(
          "DD/MM/YYYY HH:mm:ss",
          lastDate
        );
      } catch (error) {
        console.log(error, "error .. .. ..");
        if (this.isReady) {
          this.$refs["chart"].updateOptions(this.chartOptions);
          this.$refs["chart"].updateSeries(this.series);
        }
      }
    },
    closeModal() {
      this.dataPort = [];
      this.startDate = "";
      this.endDate = "";

      this.selectStartDate = "";
      this.selectEndDate = "";
      this.selectRule = "";

      this.activeCategory = "Daily";
      this.grupTime = 3600000;
      this.step = 900;
      this.valueStartDate = "";
      this.valueEndDate = "";

      this.valueChart = [];
      this.stepChart = [];
      this.valueTopChart = [];
      this.valueBottomChart = [];
      this.chartOptions = {
        chart: {
          id: "port",
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        stroke: {
          curve: "smooth",
          dashArray: [5, 0, 5],
        },
        xaxis: {
          categories: [],
        },
      };
      this.series = [
        {
          name: "Batas Atas",
          data: [],
        },
        {
          name: "Average",
          data: [],
        },
        {
          name: "Batas Bawah",
          data: [],
        },
        {
          name: "Maximum",
          data: [],
        },
        {
          name: "Minimum",
          data: [],
        },
      ];
      clearInterval(this.setTimerInterval);
      this.isReady = false;
      this.$emit("hideModal");
    },
    getDetailPort() {
      if (!this.idSelected) {
        return;
      }
      this.isReady = false;
      ApiService.get(
        `${process.env.VUE_APP_ROOT_API_5}/operation`,
        `port/treshold/${this.idSelected}`
      )
        .then(async ({ data }) => {
          this.dataPort = data.result;
          if (this.dataPort.rules.length != 0) {
            if (this.dataPort.rules[0].rule) {
              this.selectRule = this.dataPort.rules[0].rule;
            }
          }
          await this.changeNewCategory("Daily", "hour", "DD-MMM, HH:mm");
          this.isReady = true;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    setFormatTgl(flag) {
      if (flag === "start-date") {
        this.valueStartDate = new Date(this.selectStartDate).getTime();
      } else {
        const day = 60 * 1000 * 60 * 24;
        this.valueEndDate =
          new Date(this.selectEndDate).getTime() + (day - 6000);
      }

      if (this.valueEndDate < this.valueStartDate && this.valueEndDate != "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Enddate tidak boleh lebih kecil dari startdate.`,
        });
        this.valueEndDate = "";
      } else {
        if (this.activeCategory != "Real Time") {
          this.changeChart();
        }
      }
    },

    setFormatTglStepDate(data, format) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate(format, Number(data));
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.setTimerInterval);
  },
};
</script>

<style scoped>
.loading-chart {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  background-color: rgb(214, 209, 209);
}
.rule,
.celcius {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.rule {
  background-color: rgb(48, 48, 233);
}
.celcius {
  background-color: rgb(42, 226, 42);
}
.last-update {
  display: flex;
  justify-content: end;
}
.last {
  font-weight: bold;
}
.rtu-name {
  color: #2b2d42;
  font-size: 13px;
}
</style>
