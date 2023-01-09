<template>
  <section id="table-avai">
    <div v-if="page == 'regional' || page == 'witel'">
      <div class="card mb-8">
        <div class="card-header">
          <div class="wrap-print">
            <b-button
              variant="secondary"
              class="mr-2"
              v-if="page != 'regional'"
              @click="backToPage"
            >
              <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
              Back
            </b-button>

            <div class="title-avai" v-if="page == 'regional'">
              RTU Availability National
            </div>
            <div class="title-avai" v-else-if="page == 'witel'">
              RTU Availability Witel
            </div>
          </div>
          <div class="wrap-print">
            <b-button
              variant="primary"
              class="mr-3"
              @click="generatePdf('Table RTU Availability', 'RTU-table-avai')"
            >
              <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
            </b-button>
            <b-button
              variant="danger"
              @click="
                ExportToExcelFromMixin(
                  'Table RTU Availability',
                  'RTU-table-avai'
                )
              "
            >
              <b-icon
                icon="file-earmark-excel-fill"
                aria-hidden="true"
              ></b-icon>
              Print To Excel
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-striped table-bordered table-hover"
              v-if="isReadyTableAvaiRTU"
              id="RTU-table-avai"
            >
              <thead>
                <tr class="text-center">
                  <th>#</th>
                  <th class="text-left">Organization</th>
                  <th>RTU Down</th>
                  <th>Total RTU</th>
                  <th>
                    Total History <br />
                    Downtime
                  </th>
                  <th>
                    RTU Availability <br />
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in listRTU" :key="i" class="text-center">
                  <td v-if="currentPageRTU == 1">
                    {{ i + 1 }}
                  </td>
                  <td v-else>
                    {{ i + 1 + (currentPageRTU - 1) * perPageRTU }}
                  </td>
                  <td v-if="page == 'regional'" class="text-left">
                    <div
                      class="badge badge-sm bg-danger text-white cursor-pointer"
                      @click="goToPage(item.id)"
                    >
                      {{ item.name }}
                    </div>
                  </td>
                  <td v-else-if="page === 'witel'" class="text-left">
                    <div
                      class="badge badge-sm bg-danger text-white cursor-pointer"
                      @click="goToPageWitel(item)"
                    >
                      {{ item.name }}
                    </div>
                  </td>
                  <td v-if="item.rtu_down > 0 && page == 'regional'">
                    <div
                      class="badge badge-sm bg-danger text-white cursor-pointer"
                      @click="goToRtuDown(item.rtu_down_id)"
                    >
                      {{ item.rtu_down }}
                    </div>
                  </td>
                  <td v-else>
                    {{ item.rtu_down }}
                  </td>

                  <td>{{ item.total_rtu }}</td>
                  <td v-if="item.total_alert === '0'">
                    {{ item.total_alert }}
                  </td>
                  <td v-else>
                    <div
                      style="cursor: pointer"
                      class="badge badge-sm bg-danger text-white cursor-pointer"
                      @click="goToPageAlert(item)"
                    >
                      {{ item.total_alert }}
                    </div>
                  </td>
                  <td>
                    {{
                      item.hours_available
                        ? item.hours_available.toFixed(2)
                        : "0"
                    }}%
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
                v-model="currentPageRTU"
                :total-rows="totalDataRTU"
                :per-page="perPageRTU"
                aria-controls="table-list-permission"
                @change="updatePageRTU"
              ></b-pagination>

              <!-- show per page -->
              <div class="row align-items-center mr-0 ml-0 mb-2">
                <div class="col">
                  <select
                    class="form-control form-select"
                    v-model="perPageRTU"
                    @change="changePerPageRTU"
                  >
                    <option
                      v-for="(page, i) in listPageRTU"
                      :key="i"
                      :value="page"
                    >
                      {{ page }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <div class="info-page" v-if="currentPageRTU == 1">
                    Showing 1 - {{ perPageRTU }} of
                    {{ totalDataRTU }}
                  </div>
                  <div class="info-page" v-else>
                    Showing
                    {{ (currentPageRTU - 1) * perPageRTU + 1 }}
                    -
                    {{
                      perPageRTU + (currentPageRTU - 1) * perPageRTU >
                      totalDataRTU
                        ? totalDataRTU
                        : perPageRTU + (currentPageRTU - 1) * perPageRTU
                    }}
                    of {{ totalDataRTU }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- table MD avaibability -->
      <div class="card" v-if="page == 'regional'">
        <div class="card-header">
          <div class="wrap-print">
            <div class="title-avai">MD Availability National</div>
          </div>
          <div class="wrap-print">
            <b-button
              variant="primary"
              class="mr-3"
              @click="generatePdf('Table MD Availability', 'md-table-avai')"
            >
              <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
            </b-button>
            <b-button
              variant="danger"
              @click="
                ExportToExcelFromMixin('Table MD Availability', 'md-table-avai')
              "
            >
              <b-icon
                icon="file-earmark-excel-fill"
                aria-hidden="true"
              ></b-icon>
              Print To Excel
            </b-button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive mt-5">
            <table
              class="table table-striped table-bordered table-hover"
              v-if="isReadyTableMD"
              id="md-table-avai"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>MD Name</th>
                  <th>Total History Downtime</th>
                  <th>MD Availability Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in listMD" :key="i">
                  <td v-if="currentPageMD == 1">
                    {{ i + 1 }}
                  </td>
                  <td v-else>
                    {{ i + 1 + (currentPageMD - 1) * perPageMD }}
                  </td>
                  <td>{{ item.name }}</td>
                  <td v-if="item.total_alert === '0' || !item.total_alert">
                    0
                  </td>
                  <td v-else>
                    <router-link
                      :to="`/reporting/reporting-availability/table-total-alert/MD/${item.id}/${item.name}`"
                      class="badge badge-sm bg-danger text-white"
                    >
                      {{ item.total_alert }}
                    </router-link>
                  </td>
                  <td>
                    {{
                      item.hours_available
                        ? item.hours_available.toFixed(2)
                        : "0"
                    }}%
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
                v-model="currentPageMD"
                :total-rows="totalDataMD"
                :per-page="perPageMD"
                aria-controls="table-list-permission"
                @change="updatePageMD"
              ></b-pagination>

              <!-- show per page -->
              <div class="row align-items-center mr-0 ml-0 mb-2">
                <div class="col">
                  <select
                    class="form-control form-select"
                    v-model="perPageMD"
                    @change="changePerPageMD"
                  >
                    <option
                      v-for="(page, i) in listPageMD"
                      :key="i"
                      :value="page"
                    >
                      {{ page }}
                    </option>
                  </select>
                </div>
                <div class="col">
                  <div class="info-page" v-if="currentPageMD == 1">
                    Showing 1 - {{ perPageMD }} of
                    {{ totalDataMD }}
                  </div>
                  <div class="info-page" v-else>
                    Showing
                    {{ (currentPageMD - 1) * perPageMD + 1 }}
                    -
                    {{
                      perPage + (currentPageMD - 1) * perPageMD > totalDataMD
                        ? totalDataMD
                        : perPageMD + (currentPageMD - 1) * perPageMD
                    }}
                    of {{ totalDataMD }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mb-8" v-else-if="page == 'rtu'">
      <div class="card-header">
        <div class="wrap-print">
          <div @click="backToPage()">
            <router-link :to="`/reporting/reporting-availability-rtu`">
              <b-button variant="secondary" class="mr-2">
                <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
                Back
              </b-button>
            </router-link>
          </div>

          <div class="title-avai">RTU Availability</div>
        </div>
        <div class="wrap-print">
          <b-button
            variant="primary"
            class="mr-3"
            @click="
              generatePdf(
                'Table Report RTU Availability',
                'table-report-rtu-availability'
              )
            "
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                'Table Report RTU Availability',
                'table-report-rtu-availability'
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
            class="table table-striped table-bordered table-hover"
            id="table-report-rtu-availability"
            v-if="isReadyTableRTU"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>RTU Sname</th>
                <th>Deskripsi RTU</th>
                <th>Total History Downtime</th>
                <th>RTU Availability Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listTableRTU" :key="i">
                <td v-if="currentPageTableRtu == 1">
                  {{ i + 1 }}
                </td>
                <td v-else>
                  {{ i + 1 + (currentPageTableRtu - 1) * perPageTableRtu }}
                </td>

                <td v-if="item.status.toLowerCase() == 'normal'">
                  <router-link
                    :to="`/reporting/reporting-availability/detail-rtu/${item.id}`"
                    class="badge badge-sm bg-success text-white"
                  >
                    {{ item.sname }}
                  </router-link>
                </td>
                <td v-else-if="item.status.toLowerCase() == 'alert'">
                  <router-link
                    :to="`/reporting/reporting-availability/detail-rtu/${item.id}`"
                    class="badge badge-sm bg-danger text-white"
                  >
                    {{ item.sname }}
                  </router-link>
                </td>
                <td v-else-if="item.status.toLowerCase() == 'off'">
                  <router-link
                    :to="`/reporting/reporting-availability/detail-rtu/${item.id}`"
                    class="badge badge-sm bg-dark text-white"
                  >
                    {{ item.sname }}
                  </router-link>
                </td>
                <td>
                  {{ item.description }}
                </td>
                <td v-if="item.total_alert == 0">
                  {{ item.total_alert }}
                </td>
                <td v-else>
                  <div
                    class="badge badge-sm bg-danger text-white cursor-pointer"
                    @click="goToPageAlert(item)"
                  >
                    {{ item.total_alert }}
                  </div>
                </td>
                <td>
                  {{
                    item.hours_available
                      ? item.hours_available.toFixed(2)
                      : "0"
                  }}%
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
              v-model="currentPageTableRtu"
              :total-rows="totalDataTableRtu"
              :per-page="perPageTableRtu"
              aria-controls="table-list-permission"
              @change="updatePageTableRtu"
            ></b-pagination>

            <!-- show per page -->
            <div class="row align-items-center mr-0 ml-0 mb-2">
              <div class="col">
                <select
                  class="form-control form-select"
                  v-model="perPageTableRtu"
                  @change="changePerPageTableRtu"
                >
                  <option
                    v-for="(page, i) in listPageTableRtu"
                    :key="i"
                    :value="page"
                  >
                    {{ page }}
                  </option>
                </select>
              </div>
              <div class="col">
                <div class="info-page" v-if="currentPageTableRtu == 1">
                  Showing 1 - {{ perPageTableRtu }} of
                  {{ totalDataTableRtu }}
                </div>
                <div class="info-page" v-else>
                  Showing
                  {{ (currentPageTableRtu - 1) * perPageTableRtu + 1 }}
                  -
                  {{
                    perPageTableRtu +
                      (currentPageTableRtu - 1) * perPageTableRtu >
                    totalDataTableRtu
                      ? totalDataTableRtu
                      : perPageTableRtu +
                        (currentPageTableRtu - 1) * perPageTableRtu
                  }}
                  of {{ totalDataTableRtu }}
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

export default {
  data() {
    return {
      page: "regional",
      level: "",

      isReadyTableAvaiRTU: true,
      currentPageRTU: 1,
      lastPageRTU: 1,
      perPageRTU: 10,
      totalDataRTU: 1,
      listPageRTU: [5, 10, 15, 25],

      isReadyTableMD: true,
      currentPageMD: 1,
      lastPageMD: 1,
      perPageMD: 10,
      totalDataMD: 1,
      listPageMD: [5, 10, 15, 25],

      isReadyTableRTU: true,
      currentPageTableRtu: 1,
      lastPageTableRtu: 1,
      perPageTableRtu: 10,
      totalDataTableRtu: 1,
      listPageTableRtu: [5, 10, 15, 25],

      dataAllWitel: [],

      listRTU: [],
      listMD: [],
      listTableRTU: [],
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
      "getIdRtuDown",
      "getIdRtuNormal",
      "getIdRtuAlert",
    ]),
  },
  watch: {
    getIdRegionalAvaiRtu() {
      if (
        this.getIdRegionalAvaiRtu != null &&
        this.getIdRegionalAvaiRtu.length > 0
      ) {
        this.getDataWitel();
        this.getMDAvability();
      } else {
        this.page = "regional";
        this.level = "";
        this.getRTUAvability();
        this.getMDAvability();
      }
    },
    getIdWitelAvaiRtu() {
      if (this.getIdWitelAvaiRtu != null && this.getIdWitelAvaiRtu.length > 1) {
        this.level = 2;
        this.page = "witel";
        this.getRTUAvability();
        this.getMDAvability();
      }
    },
    getIdDatelAvaiRtu() {
      this.getRTUAvability();
      this.getMDAvability();
    },
    getIdLocationAvaiRtu() {
      this.getRTUAvability();
      this.getMDAvability();
    },
    getIdTagsAvaiRtu() {
      this.getRTUAvability();
      this.getMDAvability();
    },
    getStartDateAvaiRtu() {
      this.startDate = this.getStartDateAvaiRtu;
      this.getRTUAvability();
      this.getMDAvability();
      if (this.page == "rtu") {
        this.getDataTableRtu();
      }
    },
    getEndDateAvaiRtu() {
      this.endDate = this.getEndDateAvaiRtu;
      this.getRTUAvability();
      this.getMDAvability();
      if (this.page == "rtu") {
        this.getDataTableRtu();
      }
    },
  },
  mounted() {
    this.$store.dispatch("setRegionalAvaiRtu", []);
    this.$store.dispatch("setWitelAvaiRtu", []);
    this.$store.dispatch("setFlagAvaiRtu", []);
    this.$store.dispatch("setDatelAvaiRtu", []);
    this.$store.dispatch("setLocationAvaiRtu", []);
    this.$store.dispatch("setTagsAvaiRtu", []);
    this.$store.dispatch("setFlagAvaiRtu", null);
    this.setStartEndDate();
    this.getRTUAvability();
    this.getMDAvability();
  },
  methods: {
    setStartEndDate() {
      if (this.getStartDateAvaiRtu) {
        this.startDate = this.getStartDateAvaiRtu;
      }
      if (this.getEndDateAvaiRtu) {
        this.endDate = this.getEndDateAvaiRtu;
      }
    },
    goToRtuDown(idRtuDown) {
      this.$store.dispatch("setIdRtuDown", null);
      this.$store.dispatch("setIdRtuNormal", null);
      this.$store.dispatch("setIdRtuDown", idRtuDown);
      this.$router.push({
        name: "RTU Down Availability",
      });
    },
    showTags() {
      if (this.dataTags.length > 2) {
        return this.dataTags.slice(0, 2).join(", ") + "...";
      } else {
        return this.dataTags.join(", ");
      }
    },
    // eslint-disable-next-line no-unused-vars
    goToPage(id) {
      this.page = "witel";
      this.$store.dispatch("setRegionalAvaiRtu", [id]);
      this.$store.dispatch("setFlagAvaiRtu", this.page);
      this.getDataWitel();
    },
    goToPageWitel(item) {
      this.$store.dispatch("setIdRtuDown", null);
      this.$store.dispatch("setIdRtuNormal", null);
      this.page = "rtu";
      this.$store.dispatch("setWitelAvaiRtu", [item.id]);
      this.$store.dispatch("setIdRtuDown", item.rtu_down_id);
      this.$store.dispatch("setIdRtuNormal", item.rtu_normal_id);
      this.$store.dispatch("setIdRtuAlert", item.rtu_alert_id);
      this.$store.dispatch("setFlagAvaiRtu", this.page);
      this.getDataTableRtu();
    },
    backToPage() {
      if (this.getIdWitelAvaiRtu != null) {
        if (this.getIdWitelAvaiRtu.length === 1) {
          this.page = "witel";
          this.level = 1;
          this.$store.dispatch("setFlagAvaiRtu", this.page);
          this.getDataWitel();
        } else if (this.getIdWitelAvaiRtu.length > 1) {
          this.page = "regional";
          this.currentPageRTU = 1;
          this.$store.dispatch("setFlagAvaiRtu", this.page);
          this.$store.dispatch("setRegionalAvaiRtu", []);
          this.level = "";
        }
      } else {
        this.page = "regional";
        this.currentPageRTU = 1;
        this.$store.dispatch("setFlagAvaiRtu", this.page);
        this.$store.dispatch("setRegionalAvaiRtu", []);
        this.level = "";
      }
    },

    goToPageAlert(item) {
      // if (this.getFlagAvaiRtu === "regional" || this.page === "regional") {
      //   this.page = "witel";
      //   this.$store.dispatch("setRegionalAvaiRtu", [item.id]);
      // } else if (this.getFlagAvaiRtu === "witel" || this.page === "witel") {
      //   this.page = "rtu";
      //   this.$store.dispatch("setWitelAvaiRtu", [item.id]);
      // }

      this.$store.dispatch("setFlagAvaiRtu", this.page);
      if (this.page == "rtu") {
        this.$router.push({
          path: `/reporting/reporting-availability/table-total-alert/RTU/${item.id}/${item.sname}`,
        });
      } else {
        this.$router.push({
          path: `/reporting/reporting-availability/table-total-alert/RTU/${item.id}/${item.name}`,
        });
      }
    },

    getRTUAvability() {
      this.isReadyTableAvaiRTU = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `rtu?level=${this.level}&page=${this.currentPageRTU}&limit=${
          this.perPageRTU
        }&regional_id=${
          this.getIdRegionalAvaiRtu == null
            ? "%%"
            : "(" + this.getIdRegionalAvaiRtu.join("|") + ")"
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
        }&tags_id=${
          this.getIdTagsAvaiRtu == null
            ? "%%"
            : "(" + this.getIdTagsAvaiRtu.join("|") + ")"
        }&startDate=${this.startDate}&endDate=${this.endDate}`
      )
        .then(({ data }) => {
          this.isReadyTableAvaiRTU = true;
          this.listRTU = data.result.payload;
          this.currentPageRTU = data.result.currentPage;
          this.lastPageRTU = data.result.lastPage;
          this.perPageRTU = data.result.perPage;
          this.totalDataRTU = data.result.totalData;
        })
        .catch((error) => {
          this.isReadyTableAvaiRTU = true;
          console.log(error.response);
        });
    },
    getMDAvability() {
      this.isReadyTableMD = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `md?level=${this.level}&page=${this.currentPageRTU}&limit=${
          this.perPageRTU
        }&regional_id=${
          this.getIdRegionalAvaiRtu == null
            ? ""
            : "(" + this.getIdRegionalAvaiRtu.join("|") + ")"
        }&witel_id=${
          this.getIdWitelAvaiRtu == null
            ? ""
            : "(" + this.getIdWitelAvaiRtu.join("|") + ")"
        }&datel_id=${
          this.getIdDatelAvaiRtu == null
            ? ""
            : "(" + this.getIdDatelAvaiRtu.join("|") + ")"
        }&lokasi_id=${
          this.getIdLocationAvaiRtu == null
            ? ""
            : "(" + this.getIdLocationAvaiRtu.join("|") + ")"
        }&id_tags=${
          this.getIdTagsAvaiRtu == null
            ? ""
            : "(" + this.getIdTagsAvaiRtu.join("|") + ")"
        }&startDate=${this.startDate}&endDate=${this.endDate}`
      )
        .then(({ data }) => {
          this.isReadyTableMD = true;
          this.listMD = data.result.payload;
          this.currentPageMD = data.result.currentPage;
          this.lastPageMD = data.result.lastPage;
          this.perPageMD = data.result.perPage;
          this.totalDataMD = data.result.totalData;
        })
        .catch((error) => {
          this.isReadyTableMD = true;
          console.log(error.response);
        });
    },

    getDataTableRtu() {
      this.isReadyTableRTU = false;
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_2}/rtu/avail?rtu_id=${
          this.getIdRtuDown == [] &&
          this.getIdRtuNormal == [] &&
          this.getIdRtuAlert == []
            ? "%%"
            : `(${this.getIdRtuDown
                .concat(this.getIdRtuNormal, this.getIdRtuAlert)
                .join("|")})`
        }`,
        {
          params: {
            page: this.currentPageTableRtu,
            limit: this.perPageTableRtu,
            startDate: this.startDate,
            endDate: this.endDate,
          },
        }
      )
        .then(({ data }) => {
          this.isReadyTableRTU = true;
          this.listTableRTU = data.result.payload;
          this.currentPageTableRtu = data.result.currentPage;
          this.lastPageTableRtu = data.result.lastPage;
          this.perPageTableRtu = data.result.perPage;
          this.totalDataTableRtu = data.result.totalData;
        })
        .catch((error) => {
          this.isReadyTableRTU = true;
          console.log(error.response);
        });
    },

    changePerPageRTU() {
      this.listRTU = [];
      this.getRTUAvability();
    },
    updatePageRTU(page) {
      this.currentPageRTU = page;
      this.listRTU = [];
      this.getRTUAvability();
    },

    changePerPageTableRtu() {
      this.listTableRTU = [];
      this.getDataTableRtu();
    },
    updatePageTableRtu(page) {
      this.currentPageTableRtu = page;
      this.listTableRTU = [];
      this.getDataTableRtu();
    },

    changePerPageMD() {
      this.listMD = [];
      this.getMDAvability();
    },
    updatePageMD(page) {
      this.currentPageMD = page;
      this.listMD = [];
      this.getMDAvability();
    },
    getDataWitel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=1&id=(${this.getIdRegionalAvaiRtu.join("|")})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.witel.forEach((element) => {
              temporaryData.push(element.id);
            });
          });
          this.dataAllWitel = temporaryData;

          this.$store.dispatch("setWitelAvaiRtu", temporaryData);
          this.level = 2;
          this.getRTUAvability();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    getDataDatel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=2&id=(${this.getIdWitelAvaiRtu.join("|")})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.datel.forEach((element) => {
              temporaryData.push(element.id);
            });
          });

          // this.getDataLocation(temporaryData);

          this.$store.dispatch("setDatelAvaiRtu", temporaryData);
          this.level = 3;
          this.getRTUAvability();
        })
        .catch((e) => {
          console.log(e.response);
        });
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
