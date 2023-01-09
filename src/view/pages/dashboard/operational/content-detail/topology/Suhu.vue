<template>
  <section>
    <div class="table-responsive">
      <table class="table table-bordered table-striped" v-if="isReady">
        <TableHeader />
        <tbody>
          <tr v-for="(suhu, i) in dataSuhu" :key="i">
            <td v-if="currentPage == 1">{{ i + 1 }}</td>
            <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>{{ suhu.no_port }}</td>
            <td>{{ suhu.identifier }}</td>
            <td>{{ suhu.description }}</td>
            <td>{{ suhu.metrics_value }}</td>
            <td>{{ suhu.units }}</td>
          </tr>
        </tbody>
      </table>

      <!-- data not ready -->
      <div v-else>
        <div class="alert alert-danger mt-15" role="alert" v-if="isEmpty">
          Data tidak ada...
        </div>
        <div class="alert alert-warning mt-15" role="alert" v-else>
          Tunggu sebentar, sedang pengambilan data...
        </div>
      </div>

      <div class="wrap-pagination">
        <!-- pagination -->
        <b-pagination
          class="mt-15"
          v-model="currentPage"
          :total-rows="totalData"
          :per-page="perPage"
          aria-controls="table-list-permission"
          @change="updatePage"
        ></b-pagination>

        <!-- show per page -->
        <div class="row align-items-center">
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
              Showing 1 - {{ perPage }} of {{ totalData }}
            </div>
            <div class="info-page" v-else>
              Showing {{ (currentPage - 1) * perPage + 1 }} -
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
import { mapGetters } from "vuex";
import TableHeader from "./TableHeaderTopology.vue";
import ApiService from "@/core/services/api.service";

export default {
  data() {
    return {
      dataSuhu: [],
      isReady: false,
      isEmpty: false,
      idRtu: this.$route.params.idRtu,

      // pagination
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 20],
    };
  },
  components: {
    TableHeader,
  },
  computed: {
    ...mapGetters(["getIsAutoRefresh"]),
  },

  watch: {
    getIsAutoRefresh: function () {
      if (this.getIsAutoRefresh) {
        this.getdataSuhu();
      }
    },
  },
  mounted() {
    this.getdataSuhu();
  },
  methods: {
    getdataSuhu() {
      if (this.getIsAutoRefresh) {
        this.$store.dispatch("setIsAutoRefresh", false);
      } else {
        this.isReady = false;
      }
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/topology/${this.idRtu}/?page=${this.currentPage}&limit=${this.perPage}&mode=digital&desc=R. PERANGKAT`
      )
        .then(({ data }) => {
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.dataSuhu = data.result.payload;
          this.isEmpty = false;
          this.isReady = true;
        })
        .catch((e) => {
          this.isReady = false;
          this.isEmpty = true;
          console.log(e.response, "error");
        });
    },

    // pagination
    updatePage(page) {
      this.currentPage = page;
      this.dataSuhu = [];
      this.getdataSuhu();
    },
    changePerPage() {
      this.dataSuhu = [];
      this.getdataSuhu();
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
</style>
