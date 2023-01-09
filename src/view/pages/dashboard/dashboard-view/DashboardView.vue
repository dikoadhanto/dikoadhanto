<template>
  <section id="monitoring-table">
    <card-filter />
    <div class="card">
      <div class="card-header">
        <h4 class="title">Location Monitoring Table</h4>
        <div class="wrap-actions">
          <CountTimer @getData="getLocationMonitoring" />
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                'Table Location Monitoring',
                'table-location-monitoring'
              )
            "
          >
            <b-icon icon="file-earmark-excel-fill" aria-hidden="true"></b-icon>
            Export
          </b-button>
        </div>
      </div>
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
                <th rowspan="2">NAMA RTU</th>
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
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="" selected disabled hidden>
                      Pilih Status
                    </option>

                    <option
                      v-for="(data, i) in dataTesting"
                      :key="i"
                      :value="data"
                    >
                      <span class="badge badge-danger text-white">{{
                        data
                      }}</span>
                    </option>
                  </select>
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="" selected disabled hidden>
                      Pilih Status
                    </option>

                    <option
                      v-for="(data, i) in dataTesting"
                      :key="i"
                      :value="data"
                    >
                      <span class="badge badge-danger text-white">{{
                        data
                      }}</span>
                    </option>
                  </select>
                </td>
                <td>
                  <select class="form-control form-control-sm">
                    <option value="" selected disabled hidden>
                      Pilih Status
                    </option>

                    <option
                      v-for="(data, i) in dataTesting"
                      :key="i"
                      :value="data"
                    >
                      <span class="badge badge-danger text-white">{{
                        data
                      }}</span>
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                </td>
              </tr>
              <tr v-for="(data, i) in dataTable" :key="i">
                <td>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
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
                    {{ i + 1 + (currentPage - 1) * perPage }}
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
                <td>{{ data.rtu }}</td>
                <td class="text-center">
                  <div
                    class="badge badge-sm bg-success text-white cursor-pointer"
                    @click="goToPage(data)"
                  >
                    {{ data.total_port }}
                  </div>
                </td>
                <td class="text-center">{{ data.count_port_alarm }}</td>
                <td class="text-center">{{ data.count_port_error }}</td>
                <td class="text-center">
                  <div class="badge badge-sm bg-success text-white">
                    {{ data.count_pln_on }}
                  </div>
                </td>
                <td class="text-center">
                  <div class="badge badge-sm bg-dark text-white">
                    {{ data.count_deg_on }}
                  </div>
                </td>
                <td class="text-center">
                  <div
                    :class="
                      getSummaryColor(data.count_deg_on, data.count_pln_on)
                    "
                    class="text-white badge"
                  >
                    {{
                      getSummaryResponse(data.count_deg_on, data.count_pln_on)
                    }}
                  </div>
                </td>
                <td class="text-center">{{ data.total_alarm_battery }}</td>
                <td class="text-center">{{ data.total_alarm_temperature }}</td>
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
import ApiService from "@/core/services/api.service.js";
import CardFilter from "./CardFilter.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import CountTimer from "@/view/pages/Components/CountTimer.vue";

export default {
  components: {
    CountTimer,
    CardFilter,
  },
  data() {
    return {
      dataTesting: ["ini", "data", "testing"],
      dataTable: [],
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      totalData: 0,
      listPage: [5, 10, 15, 25],
      isReady: false,
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
    ]),
  },
  watch: {
    getIdRegionalLocMonitoring() {
      this.currentPage = 1;
      this.getLocationMonitoring();
    },
    getIdWitelLocMonitoring() {
      this.currentPage = 1;
      this.getLocationMonitoring();
    },
    getIdDatelLocMonitoring() {
      this.currentPage = 1;
      this.getLocationMonitoring();
    },
    getIdLocationLocMonitoring() {
      this.currentPage = 1;
      this.getLocationMonitoring();
    },
    getIdTagsLocMonitoring() {
      this.currentPage = 1;
      this.getLocationMonitoring();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Location Monitoring Table" },
    ]);
    this.getLocationMonitoring();
    this.writeNewTitle("Location Monitoring Table");
  },
  methods: {
    goToPage(data) {
      this.$router.push({ name: "Detail RTU", params: { idRtu: data.rtu_id } });
    },
    getLocationMonitoring() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_5}/locations/monitoring-table`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
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
          },
        }
      )
        .then(({ data }) => {
          this.dataTable = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = parseInt(data.result.totalData);
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changePerPage() {
      this.dataTable = [];
      this.isReady = false;
      this.getLocationMonitoring();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataTable = [];
      this.isReady = false;
      this.getLocationMonitoring();
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
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap-actions,
.wrap-refresh {
  display: flex;
  align-items: center;
}
.icon-list {
  padding: 10px;
  border-radius: 5px;
}

/* table */
.icon-detail {
  cursor: pointer;
}

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

.fa-plus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
}

/* hover icon plus circle */
.fa-plus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
}

.fa-minus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
  border: 1px solid transparent !important;
}

/* hover icon minus circle */
.fa-minus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
  border: 1px solid transparent !important;
}

.list-detail {
  list-style-type: none;
}

.refresh-box,
.wrap-refresh {
  padding: 4px;
  border-radius: 5px;
}
.refresh-text {
  font-weight: 500;
}
</style>
