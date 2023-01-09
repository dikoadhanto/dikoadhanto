<template>
  <div class="card-body">
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped table-hover"
        v-if="isReady"
        id="table-location-monitoring"
      >
        <thead class="text-center">
          <tr>
            <th rowspan="2">#</th>
            <th rowspan="2">LOKASI</th>
            <th rowspan="2">SNAME RTU</th>
            <th rowspan="2">NAMA RTU</th>
            <th rowspan="2">DESKRIPSI</th>
            <th colspan="3">PORT</th>
            <th colspan="3">VAC-SOURCE STATUS</th>
            <th rowspan="2">TOTAL ALARM BATTERY</th>
            <th rowspan="2">TOTAL ALARM TEMPERATURE</th>
          </tr>
          <tr>
            <th>TOTAL</th>
            <th>ALARM</th>
            <th>ERROR</th>
            <th>PLN</th>
            <th>GENSET</th>
            <th>SUMMARY</th>
          </tr>
        </thead>
        <tbody v-if="!isError">
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.loc"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.rtu"
                @keyup="filterToGetData"
              />
            </td>
            <td></td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.description"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.total"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.alarm"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.error"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <select
                class="form-control form-control-sm"
                v-model="filter.pln"
                @change="filterToGetData"
              >
                <option value="" selected disabled hidden>Pilih Status</option>

                <option v-for="(data, i) in dataStatus" :key="i" :value="data">
                  <span class="badge badge-danger text-white">{{
                    data == "Standby" ? "Off" : data
                  }}</span>
                </option>
              </select>
            </td>
            <td>
              <select
                class="form-control form-control-sm"
                v-model="filter.genset"
                @change="filterToGetData"
              >
                <option value="" selected disabled hidden>Pilih Status</option>

                <option v-for="(data, i) in dataStatus" :key="i" :value="data">
                  <span class="badge badge-danger text-white">{{ data }}</span>
                </option>
              </select>
            </td>
            <td>
              <select
                class="form-control form-control-sm"
                v-model="filter.summary"
                @change="filterToGetData"
              >
                <option value="" selected disabled hidden>Pilih Status</option>

                <option v-for="(data, i) in dataSummary" :key="i" :value="data">
                  <span class="badge badge-danger text-white">{{ data }}</span>
                </option>
              </select>
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.totalAlarmBattery"
                @keyup="filterToGetData"
              />
            </td>
            <td>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                v-model="filter.totalAlarmTemperature"
                @keyup="filterToGetData"
              />
            </td>
          </tr>
          <tr v-for="(data, i) in dataTable" :key="i">
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <i
                  class="fas fa-minus-circle text-success icon-detail mx-1"
                  @click="showDetail(data.rtu_id)"
                  v-if="showSecondaryDataId == data.rtu_id"
                ></i>
                <i
                  class="fas fa-plus-circle text-success icon-detail mx-1"
                  @click="showDetail(data.rtu_id)"
                  v-else
                ></i>
                {{
                  perPage != "all" ? i + 1 + (currentPage - 1) * perPage : i + 1
                }}
              </div>
              <div
                class="card-detail"
                v-if="showSecondaryDataId == data.rtu_id"
              >
                <div class="text-left card pt-4 pl-4 pr-10">
                  <ul class="list-detail">
                    <li>CREATED AT : -</li>
                    <li>CREATED BY : -</li>
                    <li>UPDATED AT : -</li>
                    <li>UPDATED BY : -</li>
                  </ul>
                </div>
              </div>
            </td>
            <td>{{ data.location }}</td>
            <td>
              <div class="clickable" @click="goToDetailRTU(data.rtu_id)">
                {{ data.rtu }}
              </div>
            </td>
            <td>
              <div class="clickable" @click="goToDetailRTU(data.rtu_id)">
                {{ data.rtu_name }}
              </div>
            </td>
            <td>
              <div class="clickable">
                <!-- {{ data.description }} -->
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm bg-success text-white cursor-pointer"
                @click="goToPage(data)"
              >
                {{ data.total_ports }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm bg-danger text-white cursor-pointer"
                @click="goToDetail(data.port_alarm_rtu_ids)"
                v-if="data.count_port_alarm > 0"
              >
                {{ data.count_port_alarm }}
              </div>
              <div v-else>
                {{ data.count_port_alarm }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm bg-dark text-white cursor-pointer"
                @click="goToDetail(data.port_error_rtu_ids)"
                v-if="data.count_port_error > 0"
              >
                {{ data.count_port_error }}
              </div>
              <div v-else>
                {{ data.count_port_error }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="data.count_pln_on > 0 ? 'bg-success' : 'bg-dark'"
              >
                {{ data.count_pln_on > 0 ? "ON" : "OFF" }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="data.count_deg_on > 0 ? 'bg-success' : 'bg-dark'"
              >
                {{
                  data.count_deg_on > 0
                    ? "ON"
                    : data.count_pln_on == 0
                    ? "OFF"
                    : "Standby"
                }}
              </div>
            </td>
            <td class="text-center">
              <div
                :class="getSummaryColor(data.count_deg_on, data.count_pln_on)"
                class="text-white badge"
              >
                {{ getSummaryResponse(data.count_deg_on, data.count_pln_on) }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm bg-success text-white cursor-pointer"
                @click="goToDetail(data.alarm_battery_rtu_ids)"
                v-if="data.total_alarm_battery > 0"
              >
                {{ data.total_alarm_battery }}
              </div>
              <div v-else>
                {{ data.total_alarm_battery }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm bg-success text-white cursor-pointer"
                @click="goToDetail(data.alarm_temperature_rtu_ids)"
                v-if="data.total_alarm_temperature > 0"
              >
                {{ data.total_alarm_temperature }}
              </div>
              <div v-else>
                {{ data.total_alarm_temperature }}
              </div>
            </td>
          </tr>
          <tr v-if="dataTable.length == 0">
            <td colspan="13">
              <div class="alert alert-warning text-center" role="alert">
                Mohon maaf, data tidak ditemukan.
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="13">
              <div class="alert alert-danger text-center" role="alert">
                Mohon maaf, server sedang dalam perbaikan. Mohon coba beberapa
                saat lagi.
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert alert-warning mt-15" role="alert" v-else>
        Tunggu sebentar, sedang pengambilan data...
      </div>

      <div class="wrap-pagination mt-10">
        <!-- pagination -->
        <b-pagination
          v-model="currentPage"
          :total-rows="totalData"
          :per-page="perPage == 'all' ? totalData : perPage"
          aria-controls="table-location-monitoring"
          @change="updatePage"
        ></b-pagination>

        <!-- show per page -->
        <div class="row align-items-center mr-0 ml-0 mb-2">
          <div class="col">
            <select
              class="form-control form-select"
              v-model="perPage"
              @change="changePerPage"
            >
              <option
                v-for="(page, i) in listPage"
                :key="i"
                :value="page.value"
              >
                {{ page.text }}
              </option>
            </select>
          </div>
          <div class="col">
            <div class="info-page" v-if="currentPage == 1">
              Showing 1 - {{ perPage > totalData ? totalData : perPage }} of
              {{ totalData }}
            </div>
            <div class="info-page" v-else>
              Showing
              {{ (currentPage - 1) * perPage + 1 }}
              -
              {{
                perPage + (currentPage - 1) * perPage > totalData
                  ? totalData
                  : perPage + (currentPage - 1) * perPage
              }}
              of {{ totalData }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";

export default {
  data() {
    return {
      filter: {
        loc: "",
        rtu: "",
        description: "",
        total: "",
        alarm: "",
        error: "",
        pln: "",
        genset: "",
        summary: "",
        totalAlarmBattery: "",
        totalAlarmTemperature: "",
      },
      limit: 100,
      request: null,
      dataStatus: ["Semua", "ON", "Standby"],
      dataSummary: ["Semua", "Normal", "Alert"],
      allDataTable: [],
      dataTable: [],
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      totalData: 0,
      listPage: [
        {
          value: 10,
          text: "10",
        },
        {
          value: 20,
          text: "20",
        },
        {
          value: 50,
          text: "50",
        },
        {
          value: "all",
          text: "Semua",
        },
      ],
      isReady: false,
      isError: false,
      showSecondaryDataId: null,
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalLocMonitoring",
      "getIdWitelLocMonitoring",
      "getIdDatelLocMonitoring",
      "getIdLocationLocMonitoring",
      "getIdTagsLocMonitoring",
      "getRtuStatusLocMonitoring",
    ]),
  },
  watch: {
    getIdRegionalLocMonitoring() {
      this.currentPage = 1;
      this.cancel();
      this.getLocationMonitoring();
    },
    getIdWitelLocMonitoring() {
      this.currentPage = 1;
      this.cancel();
      this.getLocationMonitoring();
    },
    getIdDatelLocMonitoring() {
      this.currentPage = 1;
      this.cancel();
      this.getLocationMonitoring();
    },
    getIdLocationLocMonitoring() {
      this.currentPage = 1;
      this.cancel();
      this.getLocationMonitoring();
    },
    getIdTagsLocMonitoring() {
      this.currentPage = 1;
      this.cancel();
      this.getLocationMonitoring();
    },
    getRtuStatusLocMonitoring() {
      this.currentPage = 1;
      this.isReady = false;
      this.getDataTable();
    },
  },
  mounted() {
    this.getLocationMonitoring();
    this.$store.dispatch("setRtuIdsSensor", null);
  },
  methods: {
    cancel() {
      if (this.request) this.request.cancel();
    },
    goToPage(data) {
      this.$router.push({ name: "Detail RTU", params: { idRtu: data.rtu_id } });
    },
    getLocationMonitoring() {
      if (this.limit == 100) {
        this.isReady = false;
      }

      let axiosSource = axios.CancelToken.source();
      this.request = { cancel: axiosSource.cancel };

      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_5}/locations/monitoring-table`,
        {
          cancelToken: axiosSource.token,
          params: {
            regionalId:
              this.getIdRegionalLocMonitoring == null ||
              this.getIdRegionalLocMonitoring == ""
                ? ""
                : this.getIdRegionalLocMonitoring,
            witelId:
              this.getIdWitelLocMonitoring == null ||
              this.getIdWitelLocMonitoring == ""
                ? ""
                : this.getIdWitelLocMonitoring,
            datelId:
              this.getIdDatelLocMonitoring == null ||
              this.getIdDatelLocMonitoring == ""
                ? ""
                : this.getIdDatelLocMonitoring,
            locationId:
              this.getIdLocationLocMonitoring == null ||
              this.getIdLocationLocMonitoring == ""
                ? ""
                : this.getIdLocationLocMonitoring,
            tagsId:
              this.getIdTagsLocMonitoring == null ||
              this.getIdTagsLocMonitoring == ""
                ? ""
                : this.getIdTagsLocMonitoring,
            limit: this.limit,
          },
        }
      )
        .then(({ data }) => {
          this.allDataTable = data.result.payload;
          this.totalData = data.result.payload.length;
          this.lastPage = Math.floor(this.totalData / this.perPage);
          this.getDataTable();
          this.isError = false;
          this.request = null;
          this.checkLimit();
        })
        .catch((error) => {
          this.request = null;
          this.isReady = true;
          this.allDataTable = [];
          if (error.response) {
            if (error.response.status == 500) {
              this.isError = true;
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Mohon maaf, server sedang dalam perbaikan",
              });
            } else if (error.response.status == 503) {
              setTimeout(() => {
                this.limit = 100;
                this.getLocationMonitoring();
              }, 1000);
            }
          }
        });
    },
    checkLimit() {
      if (this.limit != "all") {
        setTimeout(() => {
          this.limit = "all";
          this.getLocationMonitoring();
        }, 1000);
      } else {
        this.limit = 100;
      }
    },
    filterToGetData() {
      this.currentPage = 1;
      this.getDataTable();
    },
    getDataTable() {
      let pln = "";
      if (this.filter.pln == "Standby") {
        pln = 0;
      }

      let genset = "";
      if (this.filter.genset == "Standby") {
        genset = 0;
      }

      let statusRtu = this.getRtuStatusLocMonitoring ?? "";

      const filterDataTable = this.allDataTable.filter(
        (data) =>
          (this.filter.summary == "Alert"
            ? (data.count_pln_on > 0 && data.count_deg_on > 0) ||
              (data.count_pln_on == 0 && data.count_deg_on == 0)
            : this.filter.summary == "Normal"
            ? (data.count_pln_on == 0 && data.count_deg_on != 0) ||
              (data.count_pln_on != 0 && data.count_deg_on == 0)
            : true) &&
          data.rtu_status.toLowerCase().includes(statusRtu) &&
          data.location.toLowerCase().includes(this.filter.loc.toLowerCase()) &&
          data.rtu.toLowerCase().includes(this.filter.rtu.toLowerCase()) &&
          data.total_ports.toString().includes(this.filter.total) &&
          data.count_port_alarm.toString().includes(this.filter.alarm) &&
          data.count_port_error.toString().includes(this.filter.error) &&
          (this.filter.pln == "ON"
            ? data.count_pln_on > 0
            : data.count_pln_on.toString().includes(pln)) &&
          (this.filter.genset == "ON"
            ? data.count_deg_on > 0
            : data.count_deg_on.toString().includes(genset)) &&
          data.total_alarm_battery
            .toString()
            .includes(this.filter.totalAlarmBattery) &&
          data.total_alarm_temperature
            .toString()
            .includes(this.filter.totalAlarmTemperature)
      );
      this.totalData = filterDataTable.length;
      if (this.perPage == "all") {
        this.dataTable = filterDataTable;
      } else {
        this.dataTable = filterDataTable.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      }

      this.isReady = true;
    },
    goToDetailRTU(id) {
      this.$router.push({ name: "Detail RTU", params: { idRtu: id } });
    },
    changePerPage() {
      this.dataTable = [];
      this.isReady = false;
      this.getDataTable();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataTable = [];
      this.isReady = false;
      this.getDataTable();
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getSummaryColor(deg, pln) {
      return deg > 0 && pln > 0
        ? "badge-danger"
        : deg == 0 && pln == 0
        ? "badge-danger"
        : "badge-success";
    },
    getSummaryResponse(deg, pln) {
      return deg > 0 && pln > 0
        ? "Alert"
        : deg == 0 && pln == 0
        ? "Alert"
        : "Normal";
    },
    goToDetail(ids) {
      this.$store.dispatch("setRtuIdsSensor", ids);
      this.$store.dispatch("setAlarmTypeSensor", null);
      this.$router.push({ name: "Port Sensor" });
    },
  },
};
</script>

<style scoped>
.card-detail {
  z-index: 999;
  position: absolute;
}
.icon-detail {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
}

.icon-detail:hover {
  border: 1px solid transparent;
}
/* hover icon plus circle */
.fa-plus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
}

.fa-plus-circle:hover {
  color: #ffffff !important;
  background-color: #1bc5bd !important;
}

/* hover icon minus circle */
.fa-minus-circle {
  color: #ffffff !important;
  background-color: #1bc5bd !important;
  border: 1px solid transparent !important;
}

.fa-minus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
  border: 1px solid transparent !important;
}

.list-detail {
  list-style-type: none;
}
</style>
