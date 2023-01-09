<template>
  <section id="table-avai">
    <div class="card mb-8">
      <div class="card-header">
        <div class="wrap-print">
          <router-link :to="`/reporting/reporting-availability-rtu`">
            <b-button variant="secondary" class="mr-2">
              <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              Back
            </b-button>
          </router-link>
          <div class="title-avai">
            Total Alert RTU {{ $route.params.selectTotalAlert }}
          </div>
        </div>
        <div class="wrap-print">
          <b-button
            variant="primary"
            class="mr-3"
            @click="
              generatePdf(
                'Table Report Total Alert RTU',
                'table-report-total-alert-rtu'
              )
            "
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                'Table Report Total Alert RTU',
                'table-report-total-alert-rtu'
              )
            "
          >
            <b-icon icon="file-earmark-excel-fill" aria-hidden="true"></b-icon>
            Print To Excel
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            id="table-report-total-alert-rtu"
            class="table table-striped table-bordered table-hover"
            v-if="isReady"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>RTU Sname</th>
                <th>Start Downtime</th>
                <th>End Downtime</th>
                <th>Downtime Duration</th>
                <th v-if="getFlagAvaiRtu != 'rtu'">Current Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listDataAlert" :key="i">
                <td v-if="currentPage == 1">{{ i + 1 }}</td>
                <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
                <td>{{ item.sname }}</td>
                <td>{{ getDataReturn(item.clock) }}</td>
                <td>{{ getDataReturn(item.normal_clock) }}</td>
                <td>{{ secondsToDhms(item) }}</td>
                <td v-if="getFlagAvaiRtu != 'rtu'">
                  <b-badge
                    :style="{
                      'background-color': item.severity.colors,
                    }"
                    class="p-2 fw-bold text-white"
                    >{{ item.severity.status }}</b-badge
                  >
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
              :per-page="perPage"
              aria-controls="table-list-permission"
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
                  <option v-for="(page, i) in listPage" :key="i" :value="page">
                    {{ page }}
                  </option>
                </select>
              </div>
              <div class="col">
                <div class="info-page" v-if="currentPage == 1">
                  Showing 1 - {{ perPage }} of
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
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import textHelper from "@/core/helpers/textHelper";

import ApiService from "@/core/services/api.service";
// import Swal from "sweetalert2";

export default {
  data() {
    return {
      page: "nasional",
      isReady: false,

      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],
      level: "1",

      listDataAlert: [],
      startDate: Date.now() - 86400000,
      endDate: Date.now(),
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalAvaiRtu",
      "getIdWitelAvaiRtu",
      "getIdDatelAvaiRtu",
      "getIdLocationAvaiRtu",
      "getIdTagsAvaiRtu",
      "getStartDateAvaiRtu",
      "getEndDateAvaiRtu",
      "getFlagAvaiRtu",
      "getCheckAlertRtu",
    ]),
  },
  watch: {
    getIdDatelAvaiRtu() {
      this.level = "3";
      this.isReady = false;

      this.checkFlagRtu();
    },
    getIdLocationAvaiRtu() {
      this.level = "4";
      this.isReady = false;

      this.checkFlagRtu();
    },
    getIdTagsAvaiRtu() {
      this.level = "5";
      this.isReady = false;

      this.checkFlagRtu();
    },
    getStartDateAvaiRtu() {
      // if (this.getStartDateAvaiRtu != null) {
      //   this.startDate = this.getStartDateAvaiRtu;
      // }
      this.isReady = false;
      this.checkFlagRtu();
    },
    getEndDateAvaiRtu() {
      // if (this.getEndDateAvaiRtu != null) {
      //   this.endDate = this.getEndDateAvaiRtu;
      // }
      this.isReady = false;
      this.checkFlagRtu();
    },

    getFlagAvaiRtu() {},
  },

  mounted() {
    if (this.getFlagAvaiRtu === "witel") {
      this.level = 2;
      this.isReady = false;
      this.getDataTotalAlertRTU();
    } else if (this.getFlagAvaiRtu === "regional") {
      this.level = 1;
      this.isReady = false;
      this.getDataTotalAlertRTU();
    } else if (this.getFlagAvaiRtu == "rtu") {
      this.isReady = false;
      this.getDataRtu();
    } else if (this.getFlagAvaiRtu == null) {
      this.$router.push({ name: "ReportingAvailabilityRtu" });
    }
  },
  methods: {
    getDataRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `alert-rtu/${this.$route.params.idTotalAlert}?page=${this.currentPage}&limit=${this.perPage}&startDate=${this.getStartDateAvaiRtu}&endDate=${this.getEndDateAvaiRtu}`
      )
        .then(({ data }) => {
          this.isReady = true;
          this.listDataAlert = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
        })
        .catch((error) => {
          this.isReady = true;
          console.log(error.response);
        });
    },
    getDataTotalAlertRTU() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `alert-rtu?level=${this.level}&page=${this.currentPage}&limit=${
          this.perPage
        }&regional_id=${
          this.getIdRegionalAvaiRtu == null
            ? ""
            : "(" + this.getIdRegionalAvaiRtu.join("|") + ")"
        }&id=${
          this.$route.params.idTotalAlert == null
            ? ""
            : this.$route.params.idTotalAlert
        }&witel_id=${
          this.getIdWitelAvaiRtu == null
            ? "%%"
            : "(" + this.getIdWitelAvaiRtu.join("|") + ")"
        }&datel_id=${
          this.getIdDatelAvaiRtu == null
            ? "%%"
            : "(" + this.getIdDatelAvaiRtu.join("|") + ")"
        }&lokasi_id=${
          this.getIdLocationAvaiRtu == null
            ? "%%"
            : "(" + this.getIdLocationAvaiRtu.join("|") + ")"
        }&id_tags=${
          this.getIdTagsAvaiRtu == null
            ? "%%"
            : "(" + this.getIdTagsAvaiRtu.join("|") + ")"
        }&startDate=${this.getStartDateAvaiRtu}&endDate=${
          this.getEndDateAvaiRtu
        }`
      )
        .then(({ data }) => {
          this.isReady = true;
          this.listDataAlert = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
        })
        .catch((error) => {
          this.isReady = true;
          console.log(error.response);
        });
    },
    checkFlagRtu() {
      if (this.getFlagAvaiRtu == "rtu") {
        this.getDataRtu();
      } else {
        this.getDataTotalAlertRTU();
      }
    },
    changePerPage() {
      this.listDataAlert = [];
      this.checkFlagRtu();
    },
    updatePage(page) {
      this.currentPage = page;
      this.listDataAlert = [];
      this.checkFlagRtu();
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("DD/MM/YYYY, HH:mm:ss", data);
      }
    },

    secondsToDhms(item) {
      const seconds = item.alert_duration
        ? Number(item.alert_duration)
        : (new Date().getTime() - Number(item.clock)) / 1000;
      let d = Math.floor(seconds / (3600 * 24));
      let h = Math.floor((seconds % (3600 * 24)) / 3600);
      let m = Math.floor((seconds % 3600) / 60);
      let s = Math.floor(seconds % 60);

      let dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "0d ";
      let hDisplay = h > 0 ? h + (h == 1 ? "h" : "h ") : "0h ";
      let mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "0m ";
      let sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
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
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
