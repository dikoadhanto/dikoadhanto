<template>
  <section>
    <div class="btn btn-primary float-right mb-5" @click="filterTable">
      Klik untuk memfilter tabel
    </div>
    <div class="table-responsive" v-if="isReady">
      <table
        class="table table-striped table-bordered table-hover"
        id="table-reporting-summary-alarm"
        border="1"
        v-if="!isError"
      >
        <thead class="text-center">
          <tr>
            <th>#</th>
            <th>START ALARM</th>
            <th>END ALARM</th>
            <th>SNAME</th>
            <th>PORT</th>
            <th>DESCRIPTION</th>
            <th>DEVICE TYPE</th>
            <th>VALUE</th>
            <th>UNIT</th>
            <th>DURATION</th>
            <th>SEVERITY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.sname"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.port"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.description"
              />
            </td>
            <td></td>
            <td></td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.unit"
              />
            </td>
            <td></td>
            <td>
              <b-form-select
                size="sm"
                v-model="filter.idSeverity"
                :options="listSeverity"
                placeholder="Search"
              ></b-form-select>
            </td>
          </tr>
          <tr v-for="(data, i) in dataDetailAlarm" :key="i">
            <td v-if="currentPage == 1">{{ i + 1 }}</td>
            <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>
              {{ changeTimeUpdate(data.clock ? Number(data.clock) : "-") }}
            </td>
            <td>
              {{
                changeTimeUpdate(
                  data.normal_clock ? Number(data.normal_clock) : "-"
                )
              }}
            </td>
            <td>{{ data.sname }}</td>
            <td>{{ data.no_port }}</td>
            <td>{{ data.description }}</td>
            <td>{{ data.device }}</td>
            <td>
              {{ data.value ? setResponseValue(data.value) : 0 }}
            </td>
            <td>{{ data.units }}</td>
            <td>{{ changeDurationTime(data.duration) }}</td>
            <td class="text-center">
              <b-badge
                :variant="
                  getBgSeverity(data.severity_name ? data.severity_name : '-')
                "
              >
                {{ data.severity_name ? data.severity_name : "-" }}</b-badge
              >
            </td>
          </tr>
        </tbody>
      </table>
      <b-alert variant="danger" show v-else
        >Oops, gagal memuat data ...</b-alert
      >
    </div>
    <b-alert variant="warning" show v-else
      >Tunggu sebentar. Sedang pengambilan data...</b-alert
    >
    <Pagination @getData="getData" @changeStatusReady="changeReady" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      isReady: false,
      isError: false,
      startDate: Date.now() - 86400000,
      endDate: Date.now(),
      dataDetailAlarm: [],
      filter: {
        sname: "",
        port: "",
        description: "",
        unit: "",
        idSeverity: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getSnameAlertSummaryAlarm",
      "getIdRegionalAlertSummaryAlarm",
      "getIdWitelAlertSummaryAlarm",
      "getIdTagsSummaryAlarm",
    ]),
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.filter.sname = this.getSnameAlertSummaryAlarm;
    this.getData();
    this.getDataSeverity();
  },
  methods: {
    getDataSeverity() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          let dataSeverity = data.result.map((item) => {
            return {
              value: item.id,
              text: item.name,
            };
          });
          this.listSeverity = [{ value: "", text: "Semua" }, ...dataSeverity];
        })
        .catch((err) => {
          console.log(err, "ini err");
        });
    },
    getData() {
      this.isError = false;
      this.isReady = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `detail-alarm?page=${this.currentPage}&limit=${
          this.perPage
        }&startDate=${this.startDate}&endDate=${this.endDate}&regional_id=${
          this.getIdRegionalAlertSummaryAlarm == null
            ? "%%"
            : `${this.getIdRegionalAlertSummaryAlarm}`
        }&witel_id=${
          this.getIdWitelAlertSummaryAlarm == null
            ? "%%"
            : `${this.getIdWitelAlertSummaryAlarm}`
        }&datel_id=%%&location_id=%%&id_tags=${
          this.getIdTagsSummaryAlarm == null
            ? "%%"
            : `${this.getIdTagsSummaryAlarm.join("|")}`
        }&device_id=%%&sname=${this.filter.sname}&no_port=${
          this.filter.port
        }&description=${this.filter.description}&units=${
          this.filter.unit
        }&severity=${
          this.filter.idSeverity == "" ? "%%" : `${this.filter.idSeverity}`
        }`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.dataDetailAlarm = data.result.payload;
          this.isReady = true;
        })
        .catch((e) => {
          this.isReady = true;
          this.isError = true;
          console.log(e.response, "error response bree...");
        });
    },
    changeTimeUpdate(date) {
      if (date == "-") {
        return "-";
      } else {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();
        let timezone = "";
        let offset = -(newDate.getTimezoneOffset() / 60);
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
        let fixDate = `${day}/${month}/${year} : ${hours}:${minutes}:${seconds} ${timezone}`;
        return fixDate;
      }
    },
    changeDurationTime(time) {
      let seconds = Math.floor(time) % 60;
      let minutes = Math.floor(time / 60) % 60;
      let hours = Math.floor(time / 3600) % 24;
      let days = Math.floor(time / 86400);
      let s = seconds < 10 ? "0" + seconds : seconds;
      let m = minutes < 10 ? "0" + minutes : minutes;
      let h = hours < 10 ? "0" + hours : hours;
      let d = days < 10 ? "0" + days : days;
      return `${d}h ${h}j ${m}m ${s}d`;
    },
    getBgSeverity(sev) {
      let newSev = sev.toLowerCase();
      let result = "success";
      if (newSev == "normal") {
        result = "success";
      } else if (newSev == "critical") {
        result = "danger";
      } else {
        result = "dark";
      }
      return result;
    },
    setResponseValue(value) {
      let result = value;
      let split = value.toString().split(".");
      if (split.length > 1) {
        result = value.toFixed(2);
      }
      return result;
    },
    changeReady() {
      this.isReady = false;
    },
    filterTable() {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
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
