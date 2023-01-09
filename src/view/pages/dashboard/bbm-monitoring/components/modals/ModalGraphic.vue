<template>
  <b-modal
    id="modal-graphic"
    size="xl"
    @cancel="closeModal"
    @close="closeModal"
    @hidden="closeModal"
    scrollable
    hide-footer
  >
    <template #modal-title>
      Graph Metric {{ `${typeActive} ${nameRtu}` }}
    </template>
    <div class="row align-items-center justify-content-between mb-6">
      <!-- date -->
      <div class="col-md-7">
        <div class="row align-items-center">
          <div class="col-md-1">Start Date</div>
          <div class="col-md-5">
            <b-form-datepicker
              v-model="startDate"
              :max="new Date()"
              @input="setDateTime('start')"
            ></b-form-datepicker>
          </div>
          <div class="col-md-1">End Date</div>
          <div class="col-md-5">
            <b-form-datepicker
              v-model="endDate"
              @input="setDateTime('end')"
            ></b-form-datepicker>
          </div>
        </div>
      </div>

      <!-- filter -->
      <div class="col-md-4">
        <div class="d-flex align-items-center justify-content-between">
          <div
            @click="setDefaultTime('daily')"
            class="cursor-pointer"
            :class="{ 'btn btn-sm btn-success': filterActive == 'daily' }"
          >
            Daily
          </div>
          <div
            @click="setDefaultTime('weekly')"
            class="cursor-pointer"
            :class="{ 'btn btn-sm btn-success': filterActive == 'weekly' }"
          >
            Weekly
          </div>
          <div
            @click="setDefaultTime('monthly')"
            class="cursor-pointer"
            :class="{ 'btn btn-sm btn-success': filterActive == 'monthly' }"
          >
            Monthly
          </div>
          <div
            @click="setDefaultTime('yearly')"
            class="cursor-pointer"
            :class="{ 'btn btn-sm btn-success': filterActive == 'yearly' }"
          >
            Yearly
          </div>
        </div>
      </div>
    </div>

    <!-- graph -->

    <div class="mb-7" v-if="isDataReady">
      <LineChart
        :type="typeActive"
        :dataSeries="dataGraph"
        :dataOptions="dataOptions"
        v-if="isDataReady"
      />
    </div>
    <div class="alert alert-warning mt-15" role="alert" v-else>
      Tunggu sebentar, sedang pengambilan data...
    </div>

    <!-- last update -->
    <div class="d-flex justify-content-end">
      <div>
        <div class="font-weight-bolder">Last Updated</div>
        <div>{{ lastUpdate.date }}</div>
        <div>{{ lastUpdate.clock }}</div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import LineChart from "../graphics/LineChart";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";

export default {
  data() {
    return {
      idSelected: null,
      endDate: "",
      startDate: "",
      valueStartDate: "",
      valueEndDate: "",

      nameRtu: "",
      dataGraph: [],
      dataOptions: [],
      tankCapacity: 0,
      typeActive: "",
      isDataReady: false,
      filterActive: "daily",
      lastUpdate: {
        date: "Mon 00/00/00",
        clock: "00:00:00 WIB",
      },
    };
  },
  components: {
    LineChart,
  },
  methods: {
    async openModal(type, id, name, capacity) {
      await this.setDefaultStartDate(this.filterActive);
      await this.setDefaultEndDate();
      this.typeActive = this.upperCaseFirstWord(type);
      this.nameRtu = name;
      this.isDataReady = true;
      this.idSelected = id;
      this.tankCapacity = Number(capacity);
      await this.getDataGraph(id);
      this.$bvModal.show("modal-graphic");
    },
    upperCaseFirstWord(text) {
      return text[0].toUpperCase() + text.substring(1);
    },
    async setDefaultTime(filter) {
      this.filterActive = filter;
      await this.setDefaultStartDate(this.filterActive);
      await this.setDefaultEndDate();
      this.isDataReady = false;
      this.getDataGraph(this.idSelected);
    },
    async getDataGraph(id) {
      const timeframe = await this.setDataTimeframe();

      try {
        const { data } = await ApiService.query(
          `${process.env.VUE_APP_ROOT_API_5}/operation/chart/pooling/${id}`,
          {
            params: {
              start: this.valueStartDate,
              end: this.valueEndDate,
              timeframe,
              isFormula: 1,
            },
          }
        );

        const formatDate = await this.setFormatDate();

        let dataMax = [];
        let dataMin = [];
        let dataAverage = [];
        let dataCapacity = [];

        if (this.typeActive.toLowerCase() == "persen") {
          dataMax = await data.result.map((d) =>
            ((Number(d.value_max) / this.tankCapacity) * 100).toFixed(2)
          );
          dataMin = await data.result.map((d) =>
            ((Number(d.value_avg) / this.tankCapacity) * 100).toFixed(2)
          );
          dataAverage = await data.result.map((d) =>
            ((Number(d.value_min) / this.tankCapacity) * 100).toFixed(2)
          );
          dataCapacity = await data.result.map(() => 100);
        } else {
          dataMax = await data.result.map((d) =>
            Number(d.value_max).toFixed(2)
          );
          dataMin = await data.result.map((d) =>
            Number(d.value_avg).toFixed(2)
          );
          dataAverage = await data.result.map((d) =>
            Number(d.value_min).toFixed(2)
          );
        }

        let dataCategories = await data.result.map((d) =>
          textHelper.formatDate(formatDate, d.timestamps)
        );

        const series = [
          {
            name: "Max Capacity",
            data: dataMax,
          },
          {
            name: "Average Capacity",
            data: dataAverage,
          },
          {
            name: "Min Capacity",
            data: dataMin,
          },
        ];

        if (this.typeActive.toLowerCase() == "persen") {
          series.unshift({
            name: "Tank Capacity",
            data: dataCapacity,
          });
        }
        this.dataOptions = dataCategories;
        this.dataGraph = series;
        this.setLastUpdate();
        setTimeout(() => {
          this.isDataReady = true;
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    setDataTimeframe() {
      let timeframe = "";
      switch (this.filterActive) {
        case "daily":
          timeframe = "hour";
          break;
        case "weekly":
          timeframe = "day";
          break;
        case "monthly":
          timeframe = "week";
          break;
        case "yearly":
          timeframe = "month";
          break;
        default:
          timeframe = "hour";
          break;
      }

      return timeframe;
    },
    setFormatDate() {
      let format = "";
      switch (this.filterActive) {
        case "daily":
          format = "DD-MMM, HH:mm";
          break;
        case "weekly":
          format = "DD/MMM/YYYY";
          break;
        case "monthly":
          format = "DD/MMM/YYYY";
          break;
        case "yearly":
          format = "MMM/YYYY";
          break;
        default:
          format = "DD-MMM, HH:mm";
          break;
      }

      return format;
    },
    setDefaultStartDate(filter) {
      const currentDate = Date.now();
      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;
      let startDate = 0;
      switch (filter) {
        case "daily":
          startDate = currentDate - day * 2;
          break;
        case "weekly":
          startDate = currentDate - day * 7;
          break;
        case "monthly":
          startDate = currentDate - day * 30;
          break;
        case "yearly":
          startDate = currentDate - day * 30 * 12;
          break;
        default:
          startDate = currentDate - day * 2;
          break;
      }

      const dateFormat = textHelper.formatDate("YYYY-MM-DD", startDate);
      this.startDate = dateFormat;

      this.valueStartDate = startDate;
    },
    setDefaultEndDate() {
      const endDate = Date.now();

      const dateFormat = textHelper.formatDate("YYYY-MM-DD", endDate);
      this.endDate = dateFormat;

      this.valueEndDate = endDate;
    },
    async setDateTime(type) {
      if (type == "start") {
        await this.setStartDate();
      } else {
        await this.setEndDate();
      }

      if (this.valueEndDate != "") {
        if (this.valueEndDate < this.valueStartDate) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Enddate tidak boleh lebih kecil dari startdate.`,
          });

          this.setDefaultEndDate();
        }
      }

      this.isDataReady = false;
      this.getDataGraph(this.idSelected);
    },
    async setStartDate() {
      if (this.startDate == "") {
        await this.setDefaultStartDate(this.filterActive);
      } else {
        this.valueStartDate = new Date(this.startDate).getTime();
      }
    },
    async setEndDate() {
      if (this.endDate == "") {
        await this.setDefaultEndDate();
      } else {
        const hour = 60 * 1000 * 60;
        const day = hour * 24;
        this.valueEndDate = new Date(this.endDate).getTime() + (day - 6000);
      }
    },
    setLastUpdate() {
      const date = new Date();

      this.lastUpdate.date = textHelper.formatDate("ddd DD/MM/YYYY", date);
      let time = textHelper.formatDate("HH:mm:ss", date);
      let timezone = "";
      let offset = -(date.getTimezoneOffset() / 60);
      switch (offset) {
        case 7:
          timezone = "WIB";
          break;
        case 8:
          timezone = "WITA";
          break;
        case 9:
          timezone = "WIT";
          break;
        default:
          timezone = "";
      }

      this.lastUpdate.clock = `${time} ${timezone}`;
    },
    closeModal() {
      this.endDate = "";
      this.startDate = "";
      this.typeActive = "";
      this.valueEndDate = "";
      this.valueStartDate = "";
      this.isDataReady = false;
      this.filterActive = "daily";
      this.$bvModal.hide("modal-graphic");
    },
  },
};
</script>
