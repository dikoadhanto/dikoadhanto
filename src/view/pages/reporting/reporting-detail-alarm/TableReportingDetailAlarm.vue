<template>
  <section id="table-detail-alarm">
    <div class="card">
      <div class="card-header">
        <div class="wrap-print">
          <h4 class="title-detail-alarm m-0">
            Reporting Detail Alarm National
          </h4>
        </div>
        <div class="wrap-print">
          <b-button
            variant="primary"
            class="mr-3"
            @click="
              generatePdf(
                'Table Report Detail Alarm',
                'table-report-detail-alarm'
              )
            "
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                'Table Report Detail Alarm',
                'table-report-detail-alarm'
              )
            "
          >
            <b-icon icon="file-earmark-excel-fill" aria-hidden="true"></b-icon>
            Print To Excel
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <div class="btn btn-primary float-right mb-5" @click="filterTable">
          Klik untuk memfilter tabel
        </div>
        <div class="table-responsive" v-if="isReady">
          <table
            class="table table-striped table-bordered table-hover"
            id="table-report-detail-alarm"
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
                <th>NAMA RTU</th>
                <th>PORT TYPE</th>
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
                    v-model="filter.name"
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
                  {{
                    changeTimeUpdate(
                      data.clock == null ? "-" : Number(data.clock)
                    )
                  }}
                </td>
                <td>
                  {{
                    changeTimeUpdate(
                      data.normal_clock == null
                        ? "-"
                        : Number(data.normal_clock)
                    )
                  }}
                </td>
                <td>{{ data.sname }}</td>
                <td>{{ data.no_port }}</td>
                <td>{{ data.rtu_name }}</td>
                <td>{{ data.name }}</td>
                <td>
                  {{ data.value ? setResponseValue(data.value) : 0 }}
                </td>
                <td>{{ data.units }}</td>
                <td>{{ changeDurationTime(data.duration) }}</td>
                <td class="text-center">
                  <b-badge
                    :variant="
                      getBgSeverity(
                        data.severity_name ? data.severity_name : '-'
                      )
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
      </div>
    </div>
  </section>
</template>

<script>
import Swal from "sweetalert2";
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
      listSeverity: [],
      filter: {
        sname: "",
        port: "",
        name: "",
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
      "getIdRegionalDetailAlarm",
      "getIdWitelDetailAlarm",
      "getIdDatelDetailAlarm",
      "getIdLocationDetailAlarm",
      "getIdTagsDetailAlarm",
      "getStartDateDetailAlarm",
      "getEndDateDetailAlarm",
      "getDeviceDetailAlarm",
    ]),
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getData();
    this.getDataSeverity();
  },
  watch: {
    getIdRegionalDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
    getIdWitelDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
    getIdDatelDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
    getIdLocationDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
    getIdTagsDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
    getStartDateDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.startDate = this.getStartDateDetailAlarm;
      this.getData();
    },
    getEndDateDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.endDate = this.getEndDateDetailAlarm;
      this.getData();
    },
    getDeviceDetailAlarm: function () {
      this.$store.dispatch("setDefaultPagination");
      this.getData();
    },
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
          console.log(err.response);
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
          this.getIdRegionalDetailAlarm == null
            ? "%%"
            : `${this.getIdRegionalDetailAlarm.join("|")}`
        }&witel_id=${
          this.getIdWitelDetailAlarm == null
            ? "%%"
            : `${this.getIdWitelDetailAlarm.join("|")}`
        }&datel_id=${
          this.getIdDatelDetailAlarm == null
            ? "%%"
            : `${this.getIdDatelDetailAlarm.join("|")}`
        }&location_id=${
          this.getIdLocationDetailAlarm == null
            ? "%%"
            : `${this.getIdLocationDetailAlarm.join("|")}`
        }&id_tags=${
          this.getIdTagsDetailAlarm == null
            ? "%%"
            : `${this.getIdTagsDetailAlarm.join("|")}`
        }&id_port=${
          this.getDeviceDetailAlarm == null
            ? "%%"
            : `${this.getDeviceDetailAlarm}`
        }&sname=${this.filter.sname}&no_port=${this.filter.port}&rtu_name=${
          this.filter.name
        }&units=${this.filter.unit}&severity=${
          this.filter.idSeverity == "" ? "%%" : `${this.filter.idSeverity}`
        }`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch(
            "setPerPage",
            this.perPage == "all" ? data.result.totalData : data.result.perPage
          );
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.dataDetailAlarm = data.result.payload;
          this.isReady = true;
        })
        .catch((e) => {
          this.isReady = true;
          this.isError = true;
          console.log(e.response);
          if (e.response.data.message.includes("maximum period of 7 days")) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Maksimal waktu periode yang dipilih hanya 7 hari",
            });
          }
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
