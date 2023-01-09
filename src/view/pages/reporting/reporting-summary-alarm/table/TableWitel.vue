<template>
  <div class="table-responsive">
    <table
      class="table table-striped table-bordered table-hover"
      id="table-reporting-summary-alarm"
      border="1"
      v-if="isReady"
    >
      <thead class="text-center">
        <tr>
          <th>#</th>
          <th>RTU Name</th>
          <th>Deskripsi RTU</th>
          <th>Port Type</th>
          <th>Total Alert</th>
        </tr>
      </thead>
      <tbody v-if="!isError">
        <tr v-for="(data, i) in dataSummaryAlarm" :key="i" class="text-center">
          <td v-if="currentPage == 1">{{ i + 1 }}</td>
          <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.description }}</td>
          <td>Analog</td>
          <td class="text-center" @click="goToDetail(data)">
            <b-badge variant="danger" class="cursor-pointer">{{
              data.total_alert
            }}</b-badge>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">
            <b-alert variant="danger" show>Oops, gagal memuat data...</b-alert>
          </td>
        </tr>
      </tbody>
    </table>
    <b-alert variant="warning" show v-else
      >Tunggu sebentar, sedang pengambilan data...</b-alert
    >
    <Pagination @getData="getData" @changeStatusReady="changeReady" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";
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
      dataSummaryAlarm: [],
    };
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getData();
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getIdRegionalSummaryAlarm",
      "getIdWitelSummaryAlarm",
      "getIdDatelSummaryAlarm",
      "getIdLocationSummaryAlarm",
      "getIdTagsSummaryAlarm",
      "getStartDateSummaryAlarm",
      "getEndDateSummaryAlarm",
    ]),
  },
  watch: {
    getStartDateSummaryAlarm: function () {
      this.startDate = this.getStartDateSummaryAlarm;
      this.getData();
    },
    getEndDateSummaryAlarm: function () {
      this.endDate = this.getEndDateSummaryAlarm;
      this.getData();
    },
    getIdTagsSummaryAlarm: function () {
      this.getData();
    },
  },
  methods: {
    getData() {
      this.isReady = false;
      this.isError = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `most-alarm?page=${this.currentPage}&limit=${
          this.perPage
        }&level=3&startDate=${this.startDate}&endDate=${
          this.endDate
        }&regional_id=${
          this.getIdRegionalSummaryAlarm == null
            ? "%%"
            : `${this.getIdRegionalSummaryAlarm}`
        }&witel_id=${
          this.getIdWitelSummaryAlarm == null
            ? "%%"
            : `${this.getIdWitelSummaryAlarm}`
        }&datel_id=${
          this.getIdDatelSummaryAlarm == null
            ? "%%"
            : `${this.getIdDatelSummaryAlarm}`
        }&location_id=${
          this.getIdLocationSummaryAlarm == null
            ? "%%"
            : `${this.getIdLocationSummaryAlarm}`
        }&id_tags=${
          this.getIdTagsSummaryAlarm == null
            ? "%%"
            : `${this.getIdTagsSummaryAlarm.join("|")}`
        }`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.dataSummaryAlarm = data.result.payload;
          this.isReady = true;
          this.isError = false;
        })
        .catch((e) => {
          this.isError = true;
          this.isReady = true;
          console.log(e.response, "error response bre...");
        });
    },
    goToDetail(data) {
      this.$store.dispatch("setDetailSummaryAlarm", data);
      this.$store.dispatch("setSnameAlertSummaryAlarm", data.sname);
      this.$store.dispatch("setTableSummaryAlarm", "detail");
    },
    changeReady() {
      this.isReady = false;
    },
  },
};
</script>
