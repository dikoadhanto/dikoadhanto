<template>
  <section>
    <div class="table-responsive">
      <table class="table table-bordered table-striped" v-if="isReady">
        <thead>
          <tr>
            <th>#</th>
            <th>PORT</th>
            <th>IDENTIFIER</th>
            <th>DESKRIPSI</th>
            <th>VALUE</th>
            <th>UNITS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in dataAts" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ item.no_port }}</td>
            <td>{{ item.identifier }}</td>
            <td>
              {{
                item.description == null || item.description == "null"
                  ? "-"
                  : item.description
              }}
            </td>
            <td>{{ item.metrics_value }}</td>
            <td>{{ item.units }}</td>
          </tr>
        </tbody>
      </table>
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

import ApiService from "@/core/services/api.service.js";

export default {
  data() {
    return {
      dataAts: [],
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 20],
      isReady: false,
      isEmpty: false,
    };
  },
  computed: {
    ...mapGetters(["getIsAutoRefresh"]),
  },

  watch: {
    getIsAutoRefresh: function () {
      if (this.getIsAutoRefresh) {
        this.getDataAts();
      }
    },
  },
  mounted() {
    this.getDataAts();
  },
  methods: {
    getDataAts() {
      if (this.getIsAutoRefresh) {
        this.$store.dispatch("setIsAutoRefresh", false);
      } else {
        this.isReady = false;
      }
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/topology/${this.$route.params.idRtu}?desc=ATS`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
          },
        }
      )
        .then(({ data }) => {
          this.dataAts = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isEmpty = false;
          this.isReady = true;
        })
        .catch((e) => {
          this.isReady = false;
          this.isEmpty = true;
          console.log(e.response, "error... ... . .. .");
        });
    },

    // pagination
    updatePage(page) {
      this.currentPage = page;
      this.dataAmf = [];
      this.getDataAmf();
    },
    changePerPage() {
      this.dataAmf = [];
      this.getDataAmf();
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
