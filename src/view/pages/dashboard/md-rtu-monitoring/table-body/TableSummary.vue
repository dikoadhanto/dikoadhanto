<template>
  <section>
    <div class="table-responsive" v-if="getPageMdRtu == 'regional'">
      <table
        class="table table-striped table-bordered table-hover"
        id="table-summary"
        border="1"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Location</th>
            <th>RTU Normal</th>
            <th>RTU Down</th>
            <th>RTU Alert</th>
            <th>Total RTU</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in dataSummary" :key="i">
            <td v-if="currentPage == 1">{{ i + 1 }}</td>
            <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>
              <div
                class="badge badge-sm bg-danger text-white"
                @click="goToOtherPage(data.id)"
              >
                {{ data.name }}
              </div>
            </td>
            <td>
              <div
                class="badge cursor-pointer badge-success"
                @click="goToPortSensor(data.id, 'normal')"
                v-if="data.total_rtu_normal > 0"
              >
                {{ data.total_rtu_normal }}
              </div>
              <div v-else>
                {{ data.total_rtu_normal }}
              </div>
            </td>
            <td>
              <div
                class="badge cursor-pointer badge-dark"
                @click="goToPortSensor(data.id, 'off')"
                v-if="data.total_rtu_off > 0"
              >
                {{ data.total_rtu_off }}
              </div>
              <div v-else>
                {{ data.total_rtu_off }}
              </div>
            </td>
            <td>
              <div
                class="badge cursor-pointer badge-danger"
                @click="goToPortSensor(data.id, 'alert')"
                v-if="data.total_rtu_alert > 0"
              >
                {{ data.total_rtu_alert }}
              </div>
              <div v-else>
                {{ data.total_rtu_alert }}
              </div>
            </td>
            <td>{{ data.total_rtu }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <Pagination
      @getData="getData"
      @changeStatusReady="changeReady"
      v-if="getPageMdRtu == 'regional'"
    />

    <!-- table to show rtu in witel -->
    <TableLokasi v-if="getPageMdRtu == 'location'" />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import TableLokasi from "./TableLokasi.vue";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getData();
    this.$store.dispatch("setRegionalSensor", null);
    this.$store.dispatch("setRtuStatusSensor", null);
  },
  components: {
    TableLokasi,
    Pagination,
  },
  computed: {
    ...mapGetters([
      "getIdWitelMdRtu",
      "getIdRegionalMdRtu",
      "getIdLocationMdRtu",
      "getPageMdRtu",
      "getIdTagsMdRtu",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
    ]),
  },
  data() {
    return {
      dataSummary: [],
      dataAllWitel: [],
      level: 1,
    };
  },
  watch: {
    getIdRegionalMdRtu: function () {
      if (this.getIdRegionalMdRtu != null) {
        this.level = 2;
        this.getDataWitel();
      } else {
        this.level = 1;
        this.getData();
      }
    },
    getIdWitelMdRtu: function () {
      if (this.getIdWitelMdRtu == null) {
        this.level = 1;
        this.$store.dispatch("setPageMdRtu", "regional");
        this.getData();
      } else if (this.getIdWitelMdRtu.length == 1) {
        this.getDataDatel();
      }
    },
    getIdLocationMdRtu: function () {
      if (this.getIdLocationMdRtu == null) {
        this.level = 2;
        this.$store.dispatch("setWitelMdRtu", this.dataAllWitel);
        this.getData();
      }
    },
    getIdTagsMdRtu: function () {
      this.getData();
    },
  },
  methods: {
    getData() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `monitoring/summaryrtu?page=${this.currentPage}&limit=${
          this.perPage
        }&level=${this.level}&regional_id=${
          this.getIdRegionalMdRtu == null
            ? "%%"
            : `${this.getIdRegionalMdRtu.join("|")}`
        }&witel_id=${
          this.getIdWitelMdRtu == null
            ? "%%"
            : `${this.getIdWitelMdRtu.join("|")}`
        }&location_id=${
          this.getIdLocationMdRtu == null
            ? "%%"
            : `${this.getIdLocationMdRtu.join("|")}`
        }&id_tags=${
          this.getIdTagsMdRtu == null
            ? "%%"
            : `${this.getIdTagsMdRtu.join("|")}`
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
          this.dataSummary = data.result.payload;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    goToOtherPage(id) {
      if (this.getIdRegionalMdRtu == null) {
        this.$store.dispatch("setRegionalMdRtu", [id]);
        this.getDataWitel();
      } else {
        this.$store.dispatch("setWitelMdRtu", [id]);
        this.getDataDatel();
      }
    },
    getDataWitel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=1&id=(${this.getIdRegionalMdRtu.join("|")})`
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
          this.level = 2;
          this.getData();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getDataDatel() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=2&id=(${this.getIdWitelMdRtu.join("|")})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.datel.forEach((element) => {
              temporaryData.push(element.id);
            });
          });
          this.getDataLocation(temporaryData);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getDataLocation(idDatel) {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `other/org?level=3&id=(${idDatel.join("|")})`
      )
        .then(({ data }) => {
          let temporaryData = [];
          data.result.forEach((el) => {
            el.locs.forEach((element) => {
              temporaryData.push(element.id);
            });
          });
          this.$store.dispatch("setLocationMdRtu", temporaryData);
          this.level = 3;
          this.$store.dispatch("setPageMdRtu", "location");
          this.getData();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    goToPortSensor(regId, rtuStatus) {
      if (this.getIdRegionalMdRtu == null) {
        this.$store.dispatch("setRegionalSensor", [regId]);
      } else {
        this.$store.dispatch("setRegionalSensor", this.getIdRegionalMdRtu);
        this.$store.dispatch("setWitelSensor", [regId]);
      }
      this.$store.dispatch("setRtuStatusSensor", rtuStatus);
      this.$router.push({
        name: "Port Sensor",
      });
    },
    changeReady() {
      this.isReady = false;
    },
  },
};
</script>

<style scoped>
.badge {
  cursor: pointer;
}
/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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
.info-page {
  font-size: 10px;
}
</style>
