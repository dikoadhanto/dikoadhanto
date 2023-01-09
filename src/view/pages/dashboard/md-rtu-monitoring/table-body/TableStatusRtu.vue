<template>
  <section>
    <b-row class="justify-content-md-center mb-5">
      <b-col cols="12" md="auto">
        <div class="border-status">
          <span class="title-span"> STATUS</span>
          <div class="status-ready"></div>
          Ready
          <div class="status-ongoing"></div>
          On Going
          <div class="status-down"></div>
          Down
          <div class="status-failed"></div>
          Failed
        </div>
      </b-col>
    </b-row>
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped table-hover"
        border="1"
        id="table-status-rtu"
      >
        <thead class="text-center">
          <tr>
            <th rowspan="2">#</th>
            <th colspan="4">RTU</th>
            <th rowspan="2">MD</th>
          </tr>
          <tr>
            <th>Region-Witel</th>
            <th>Sname</th>
            <th>Nama RTU</th>
            <th>Deskripsi RTU</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="reg_wit"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="sname_rtu"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="name_rtu"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="filterDescription"
                @keyup="getData"
              />
            </td>
            <td></td>
          </tr>
          <tr v-for="(data, i) in dataViewRTU" :key="i">
            <td v-if="currentPage == 1">{{ i + 1 }}</td>
            <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>{{ data.regional }}</td>
            <td>{{ data.sname_rtu }}</td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="getBgClass(data.status)"
                @click="goToRTU(parseInt(data.id_m_rtu))"
                style="cursor: pointer"
              >
                {{ data.name_rtu }}
              </div>
            </td>
            <td>{{ data.description }}</td>

            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="getBgClass(data.status)"
              >
                {{ data.name_md }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- pagination -->
      <Pagination @getData="getData" @changeStatusReady="changeReady" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  data() {
    return {
      name_rtu: "",
      filterDescription: "",
      sname_rtu: "",
      reg_wit: "",
      dataViewRTU: [],
    };
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters([
      "getIdWitelMdRtu",
      "getIdRegionalMdRtu",
      "getIdLocationMdRtu",
      "getIdTagsMdRtu",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
    ]),
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getData();
  },
  watch: {
    getIdRegionalMdRtu: function () {
      this.$store.dispatch("setCurrentPage", 1);
      this.getData();
    },
    getIdWitelMdRtu: function () {
      this.$store.dispatch("setCurrentPage", 1);
      this.getData();
    },
    getIdLocationMdRtu: function () {
      this.$store.dispatch("setCurrentPage", 1);
      this.getData();
    },
    getIdTagsMdRtu: function () {
      this.$store.dispatch("setCurrentPage", 1);
      this.getData();
    },
    filterDescription: function () {
      this.$store.dispatch("setCurrentPage", 1);
      this.getData();
    },
  },
  methods: {
    getData() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `monitoring/tblviewrtu?page=${this.currentPage}&limit=${
          this.perPage
        }&reg_wit=${this.reg_wit == "" ? "%%" : `%${this.reg_wit}%`}&name_rtu=${
          this.name_rtu == "" ? "%%" : `%${this.name_rtu}%`
        }&sname_rtu=${
          this.sname_rtu == "" ? "%%" : `%${this.sname_rtu}%`
        }&description_rtu=${
          this.filterDescription == "" ? "%%" : `%${this.filterDescription}%`
        }&regional_id=${
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
          setTimeout(() => {
            this.dataViewRTU = data.result.payload;
          }, 1000);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    goToRTU(id) {
      this.$router.push({
        name: "Detail RTU",
        params: { idRtu: id },
      });
    },
    getBgClass(status) {
      if (status == "normal") {
        return "bg-success";
      } else if (status == "alert") {
        return "bg-danger";
      } else if (status == "off") {
        return "bg-dark";
      }
    },
    changeReady() {
      this.isReady = false;
    },
  },
};
</script>

<style scoped>
.border-status {
  border: 1px solid rgb(204, 201, 201);
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
}
.title-span {
  font-weight: bold;
}
.status-ready,
.status-ongoing,
.status-down,
.status-failed {
  border-radius: 100%;
  width: 15px;
  height: 15px;
  margin: 0 7px 0 7px;
}
.status-ready {
  background-color: #00c853;
}
.status-down {
  background-color: #000;
}
.status-ongoing {
  background-color: #ffc107;
}
.status-failed {
  background-color: #f44336;
}
</style>
