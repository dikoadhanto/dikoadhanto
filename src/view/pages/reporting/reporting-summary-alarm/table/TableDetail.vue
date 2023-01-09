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
          <th>Start Alert</th>
          <th>End Alert</th>
          <th>Alert Duration</th>
          <th>Severity</th>
        </tr>
      </thead>
      <tbody v-if="!isError">
        <tr
          v-for="(data, i) in dataDetailSummaryAlarm"
          :key="i"
          class="text-center"
        >
          <td v-if="currentPage == 1">{{ i + 1 }}</td>
          <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
          <td v-if="isRtu">{{ changeTimeUpdate(data.begin.clock) }}</td>
          <td v-else>{{ changeTimeUpdate(data.start.clock) }}</td>
          <td>{{ changeTimeUpdate(data.end.clock) }}</td>
          <td>{{ getReturnTime(data.alert_duration) }}</td>
          <td class="text-center" v-if="isRtu">
            <b-badge
              class="text-white"
              :style="{ backgroundColor: data.status.color }"
              >{{ data.status.severity }}</b-badge
            >
          </td>
          <td class="text-center" v-else>
            <b-badge
              class="text-white"
              :style="{ backgroundColor: data.severity.colors }"
              >{{ data.severity.status }}</b-badge
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <b-alert variant="danger" show
          >Ada kesalahan saat pengambilan data...</b-alert
        >
      </tbody>
    </table>
    <b-alert variant="warning" show v-else
      >Tunggu sebentar, sedang pengambilan data...</b-alert
    >
    <Pagination
      @getData="getDataRtu"
      @changeStatusReady="changeReady"
      v-if="getPageSummaryAlarm == 'Witel'"
    />
    <Pagination @getData="getData" @changeStatusReady="changeReady" v-else />
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
      isRtu: false,
      level: 1,
      dataDetailSummaryAlarm: [],
    };
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getPageSummaryAlarm",
      "getDetailSummaryAlarm",
    ]),
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.setLevel();
  },
  methods: {
    setLevel() {
      if (this.getPageSummaryAlarm == "National") {
        this.level = 1;
        this.getData();
      } else if (this.getPageSummaryAlarm == "Regional") {
        this.level = 2;
        this.getData();
      } else if (this.getPageSummaryAlarm == "Witel") {
        this.level = 3;
        this.getDataRtu();
      }
    },
    getData() {
      this.isReady = false;
      this.isError = false;
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `alert-rtu?page=${this.currentPage}&limit=${this.perPage}&level=${this.level}&id=${this.getDetailSummaryAlarm.id}`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.dataDetailSummaryAlarm = data.result.payload;
          this.isRtu = false;
          this.isReady = true;
        })
        .catch((e) => {
          this.isError = true;
          console.log(e.response, "error response bree...");
        });
    },
    getDataRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `alert-rtu-port/${this.getDetailSummaryAlarm.id}?page=${this.currentPage}&limit=${this.perPage}`
      )
        .then(({ data }) => {
          this.isReady = false;
          this.isError = false;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.dataDetailSummaryAlarm = data.result.payload;
          this.isRtu = true;
          this.isReady = true;
        })
        .catch((e) => {
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
        let fixDate = `${day}/${month}/${year}`;
        return fixDate;
      }
    },
    getReturnTime(seconds) {
      seconds = Number(seconds);
      let d = Math.floor(seconds / (3600 * 24));
      let h = Math.floor((seconds % (3600 * 24)) / 3600);
      let m = Math.floor((seconds % 3600) / 60);
      let s = Math.floor(seconds % 60);
      return `${d}d ${h}h ${m}m ${s}s`;
    },
    changeReady() {
      this.isReady = false;
    },
  },
};
</script>
