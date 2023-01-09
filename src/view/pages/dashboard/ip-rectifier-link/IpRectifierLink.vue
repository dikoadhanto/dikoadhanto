<template>
  <div class="card">
    <h2 class="card-header">Table View List IP Rectifier</h2>
    <div class="card-body">
      <div class="table-responsive">
        <table
          class="table table-striped table-bordered table-hover"
          v-if="isReady"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>RTU Name</th>
              <th>Deskripsi</th>
              <th>Rectifier Name</th>
              <th>IP Rectifier</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="filterRtu"
                  placeholder="Searches..."
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="filterDescription"
                  placeholder="Searches..."
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="filterRectifier"
                  placeholder="Search..."
                />
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model="filterIp"
                  placeholder="Search..."
                />
              </td>
            </tr>
            <tr v-for="(data, i) in dataIpRectifier" :key="i">
              <td class="text-center">
                {{ i + 1 }}
              </td>
              <td>{{ data.rtu_name }}</td>
              <td>{{ data.rtu_description }}</td>
              <td>{{ data.name }}</td>
              <td>
                <a :href="'http://' + data.ip_address" target="_blank">{{
                  data.ip_address
                }}</a>
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
            aria-controls="table-iprectifier"
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
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "IpRectifierLink",
  data() {
    return {
      dataIpRectifier: [],
      currentPage: 1,
      perPage: 10,
      lastPage: 1,
      totalData: 0,
      listPage: [5, 10, 15, 25],
      filterRtu: "",
      filterDescription: "",
      filterRectifier: "",
      filterIp: "",
      isReady: false,
    };
  },
  watch: {
    filterRtu() {
      this.currentPage = 1;
      this.getRectifier();
    },
    filterDescription() {
      this.currentPage = 1;
      this.getRectifier();
    },
    filterRectifier() {
      this.currentPage = 1;
      this.getRectifier();
    },
    filterIp() {
      this.currentPage = 1;
      this.getRectifier();
    },
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "IP Rectifier Link" },
    ]);
    this.getRectifier();
    this.writeNewTitle("IP Rectifier Link");
  },
  methods: {
    getRectifier() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/ip-rectifier`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          searchRTU: this.filterRtu,
          searchRTUDesc: this.filterDescription,
          searchName: this.filterRectifier,
          searchIp: this.filterIp,
        },
      })
        .then(({ data }) => {
          this.dataIpRectifier = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    changePerPage() {
      this.dataIpRectifier = [];
      this.isReady = false;
      this.getRectifier();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataIpRectifier = [];
      this.isReady = false;
      this.getRectifier();
    },
  },
  filters: {
    formatDateHour(date) {
      return textHelper.formatDate("DD/MM/YYYY | HH:mm", date);
    },
  },
};
</script>

<style scoped>
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
