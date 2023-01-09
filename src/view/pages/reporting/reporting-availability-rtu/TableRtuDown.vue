<template>
  <section id="rtu-down">
    <div class="card">
      <div class="card-header">
        <div class="wrap-title">
          <b-button variant="secondary" class="mr-2" @click="backToPage">
            <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
            Back
          </b-button>
          <h4>Table RTU Down</h4>
        </div>
        <div class="wrap-print">
          <b-button
            variant="primary"
            class="mr-3"
            @click="generatePdf('Table RTU Down', 'table-rtu-down')"
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon> Print
          </b-button>
          <b-button
            variant="danger"
            @click="ExportToExcelFromMixin('Table RTU Down', 'table-rtu-down')"
          >
            <b-icon icon="file-earmark-excel-fill" aria-hidden="true"></b-icon>
            Print To Excel
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-hover table-striped table-bordered"
            id="table-rtu-down"
            border="1"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>RTU Sname</th>
                <th>Deskripsi RTU</th>
                <th class="text-center">Total Alert</th>
                <th>RTU Availability Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rtu, i) in dataRtuDown" :key="i">
                <td v-if="currentPage == 1">{{ i + 1 }}</td>
                <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
                <td>
                  <router-link
                    :to="`/reporting/reporting-availability/detail-rtu/${rtu.id}`"
                    class="badge badge-sm bg-danger text-white"
                  >
                    {{ rtu.sname }}
                  </router-link>
                </td>
                <td>{{ rtu.description }}</td>
                <td v-if="rtu.total_alert > 0" class="text-center">
                  <div
                    class="badge badge-sm bg-danger text-white cursor-pointer"
                    @click="goToPageAlert(rtu)"
                  >
                    {{ rtu.total_alert }}
                  </div>
                </td>
                <td v-else>{{ rtu.total_alert }}</td>
                <td>{{ returnAvailableRate(rtu.hours_available) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination @getData="getDataRtuDown" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Reporting", subtitle: "Reporting Availability RTU" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.getDataRtuDown();
  },
  computed: {
    ...mapGetters([
      "getIdRtuDown",
      "getIdRtuNormal",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getStartDateAvaiRtu",
      "getEndDateAvaiRtu",
    ]),
  },
  components: {
    Pagination,
  },
  data() {
    return {
      dataRtuDown: [],
    };
  },
  methods: {
    backToPage() {
      this.$router.push({ name: "ReportingAvailabilityRtu" });
    },
    getDataRtuDown() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_2,
        `rtu/avail?page=${this.currentPage}&limit=${this.perPage}&rtu_id=${
          this.getIdRtuDown == [] && this.getIdRtuNormal == []
            ? "%%"
            : `(${this.getIdRtuDown.concat(this.getIdRtuNormal).join("|")})`
        }&startDate=${this.getStartDateAvaiRtu}&endDate=${
          this.getEndDateAvaiRtu
        }`
      )
        .then(({ data }) => {
          this.dataRtuDown = data.result.payload;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
        })
        .catch((err) => {
          console.log(err.response, "err data .. ..");
        });
    },
    returnAvailableRate(num) {
      if (num == 0) {
        return num;
      } else {
        return num.toFixed(2);
      }
    },
    goToPageAlert(item) {
      this.$store.dispatch("setFlagAvaiRtu", "rtu");
      this.$router.push({
        path: `/reporting/reporting-availability/table-total-alert/RTU/${item.id}/${item.sname}`,
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
.wrap-print,
.wrap-title {
  display: flex;
  align-items: center;
}
</style>
