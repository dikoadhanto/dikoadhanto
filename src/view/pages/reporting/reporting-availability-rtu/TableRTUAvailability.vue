<template>
  <section id="table-avai">
    <CardFilter />

    <div class="card mb-8">
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
                'Table Report Detail RTU Availability',
                'table-report-detail-RTU-Availability'
              )
            "
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="
              ExportToExcelFromMixin(
                'Table Report Detail RTU Availability',
                'table-report-detail-RTU-Availability'
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
            id="table-report-detail-RTU-Availability"
            class="table table-striped table-bordered table-hover"
            v-if="isReady"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>RTU Sname</th>
                <th>Deskripsi RTU</th>
                <th>Total RTU</th>
                <th>Total Alert</th>
                <th>RTU Availability Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listRTU" :key="i">
                <td v-if="currentPageRTU == 1">
                  {{ i + 1 }}
                </td>
                <td v-else>
                  {{ i + 1 + (currentPageRTU - 1) * perPageRTU }}
                </td>

                <td>
                  <router-link
                    :to="`/reporting/reporting-availability/detail-rtu/${item.id}`"
                    class="badge badge-sm bg-danger text-white"
                  >
                    {{ item.sname }}
                  </router-link>
                </td>
                <td>
                  {{ item.description }}
                </td>
                <td>{{ item.total_port }}</td>
                <td v-if="item.total_alert === '0'">
                  <div class="badge badge-sm bg-success text-white">
                    {{ item.total_alert }}
                  </div>
                </td>
                <td v-else>
                  <div class="badge badge-sm bg-danger text-white">
                    {{ item.total_alert }}
                  </div>
                </td>
                <td>
                  {{
                    item.hours_available
                      ? item.hours_available.toFixed(0)
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
  </section>
</template>

<script>
import CardFilter from "./CardFilter.vue";
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";

export default {
  components: {
    CardFilter,
  },
  data() {
    return {
      level: "",
      isReady: true,

      currentPageRTU: 1,
      lastPageRTU: 1,
      perPageRTU: 10,
      totalDataRTU: 1,
      listPageRTU: [5, 10, 15, 25],

      dataAllWitel: [],

      listRTU: [],
    };
  },
  computed: {
    ...mapGetters([
      "getIdRegionalAvaiRtu",
      "getIdWitelAvaiRtu",
      "getFlagAvaiRtu",
      "getIdTagsAvaiRtu",
    ]),
  },
  watch: {
    getIdWitelAvaiRtu() {
      this.isReady = false;
      this.getRTUAvability();
    },
    getIdTagsAvaiRtu() {
      this.isReady = false;
      this.getRTUAvability();
    },
  },
  mounted() {
    // this.getRTUAvability();
  },
  methods: {
    showTags() {
      if (this.dataTags.length > 2) {
        return this.dataTags.slice(0, 2).join(", ") + "...";
      } else {
        return this.dataTags.join(", ");
      }
    },

    backToPage() {
      if (this.getIdWitelAvaiRtu !== null) {
        this.getDataWitel();
        this.$store.dispatch("setFlagAvaiRtu", "witel");

        // this.getDataWitel();
      }
    },
    goToPageAlert() {
      this.$store.dispatch("setFlagAvaiRtu", this.page);
    },

    getRTUAvability() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_2}/witel/${this.$route.params.idWitel}`,
        {
          params: {
            page: this.currentPageRTU,
            limit: this.perPageRTU,
          },
        }
      )

        .then(({ data }) => {
          this.isReady = true;
          this.listRTU = data.result.payload;
          this.currentPageRTU = data.result.currentPage;
          this.lastPageRTU = data.result.lastPage;
          this.perPageRTU = data.result.perPage;
          this.totalDataRTU = data.result.totalData;
        })
        .catch((error) => {
          this.isReady = true;

          console.log(error.response);
        });
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
          this.$store.dispatch("setWitelMdRtu", temporaryData);
        })
        .catch((e) => {
          console.log(e.response, "error");
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
