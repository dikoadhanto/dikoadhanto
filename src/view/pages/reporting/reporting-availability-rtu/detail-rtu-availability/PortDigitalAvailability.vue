<template>
  <section>
    <div class="table-responsive">
      <table class="table table-bordered table-striped" v-if="isReady">
        <TableHeader />
        <tbody>
          <tr>
            <td></td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterPort"
                placeholder="Search"
                @keyup="getPortDigital"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterDeskripsi"
                placeholder="Search"
                @keyup="getPortDigital"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterNama"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterUnits"
                placeholder="Search"
                @keyup="getPortDigital"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterDownTime"
                placeholder="Search By second"
                @keyup="getPortDigital"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterTotalAlert"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <!-- <td>
              <select
                class="form-control form-control-sm"
                v-model="filterAlert"
                @change="getPortDigital"
              >
                <option value="" selected disabled hidden>Pilih Status</option>

                <option
                  v-for="(data, i) in listSeverity"
                  :key="i"
                  :value="data.name"
                >
                  <span class="badge badge-danger text-white">{{
                    data.name
                  }}</span>
                </option>
              </select>
            </td> -->
          </tr>
          <tr v-for="(item, i) in listPortDigital" :key="i">
            <td v-if="currentPage == 1">
              {{ i + 1 }}
            </td>

            <td v-else>
              {{ i + 1 + (currentPage - 1) * perPage }}
            </td>

            <td>{{ item.no_port }}</td>
            <td>
              {{ item.description == null ? "-" : item.description }}
            </td>
            <td>{{ item.metrics }}</td>

            <td>{{ item.units }}</td>

            <td>{{ secondsToDhms(item.duration) }}</td>
            <td>
              <div class="badge badge-sm bg-danger text-white">
                {{ item.total_alert }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="alert alert-warning mt-15" role="alert" v-else>
        Tunggu sebentar, sedang pengambilan data...
      </div>

      <div class="wrap-pagination">
        <!-- pagination -->
        <b-pagination
          class="mt-10"
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
  </section>
</template>

<script>
import TableHeader from "./TableHeaderPortDigital.vue";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";

export default {
  components: {
    TableHeader,
  },
  data() {
    return {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 20],
      showSecondaryDataId: null,

      isReady: false,
      isOpen: false,

      filterPort: "",
      filterNama: "",
      filterDeskripsi: "",
      filterTotalAlert: "",
      filterDownTime: "",
      filterUnits: "",

      idSelected: "",
      listSeverity: [],

      listPortDigital: [],
    };
  },
  mounted() {
    this.getPortDigital();
  },

  watch: {
    filterPort() {
      this.currentPage = 1;
      this.getPortDigital();
    },
    filterNama() {
      this.currentPage = 1;
      this.getPortDigital();
    },
    filterTotalAlert() {
      this.currentPage = 1;
      this.getPortDigital();
    },
    filterDownTime() {
      this.currentPage = 1;
      this.getPortDigital();
    },
    filterUnits() {
      this.currentPage = 1;
      this.getPortDigital();
    },
  },
  methods: {
    getPortDigital() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_2}/analog-digital/${this.$route.params.idRTU}`,
        {
          params: {
            mode: "digital",
            page: this.currentPage,
            limit: this.perPage,
            no_port: this.filterPort,
            description: this.filterDeskripsi,
            units: this.filterUnits,
            downtime: this.filterDownTime,
            metrics: this.filterNama,
            total_alert: this.filterTotalAlert,
          },
        }
      ).then(({ data }) => {
        this.listPortDigital = data.result.payload;
        this.currentPage = data.result.currentPage;
        this.lastPage = data.result.lastPage;
        this.perPage = data.result.perPage;
        this.totalData = data.result.totalData;
        this.isReady = true;
      });
    },

    changePerPage() {
      this.isReady = false;
      this.listPortDigital = [];

      this.getPortDigital();
    },
    updatePage(page) {
      this.currentPage = page;
      this.isReady = false;
      this.listPortDigital = [];

      this.getPortDigital();
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    getStatusAlert(item) {
      if (item.device_name === "GENSET") {
        if (item.metrics_value === "0.00") {
          return "OFF";
        } else {
          return "ON";
        }
      } else if (item.device_name === "PLN") {
        if (item.metrics_value === "0.00") {
          return "ON";
        } else {
          return "OFF";
        }
      } else {
        return "-";
      }
    },

    // get created at and updated at for hidden column
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },

    secondsToDhms(seconds) {
      seconds = Number(seconds);
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
/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.info-page {
  font-size: 10px;
}

/* icon plus for hidden column */
.icon-detail {
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #adadad;
  background-color: transparent;
}

.icon-detail:hover {
  border: 1px solid transparent;
}

/* hover icon plus circle */
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

/* card for hidden column */
.card-detail {
  z-index: 999;
  position: absolute;
}

/* list in hidden column */
.list-detail {
  list-style-type: none;
}
</style>
