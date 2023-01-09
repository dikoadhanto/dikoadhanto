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
        id="table-status-md"
      >
        <thead class="text-center">
          <tr>
            <th rowspan="2">#</th>
            <th colspan="2">Main</th>
            <th colspan="2">Backup</th>
            <th rowspan="2">Active MD</th>
          </tr>
          <tr>
            <th>Region-Witel</th>
            <th>Nama MD</th>
            <th>Region-Witel</th>
            <th>Nama MD</th>
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
                v-model="reg_wit_main"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="name_md"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="reg_wit_backup"
                @keyup="getData"
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Search..."
                class="form-control"
                v-model="name_mdbackup"
                @keyup="getData"
              />
            </td>
            <td></td>
          </tr>
          <tr v-for="(data, i) in dataViewMd" :key="i">
            <td v-if="currentPage == 1">{{ i + 1 }}</td>
            <td v-else>{{ i + 1 + (currentPage - 1) * perPage }}</td>
            <td>
              {{ data.regional == null ? "REGIONAL VIRTUAL" : data.regional }}
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="getBgClass(data.status)"
              >
                {{ data.name_md == null ? "-" : data.name_md }}
              </div>
            </td>
            <td>
              {{
                data.md_backup.length
                  ? data.md_backup[0].regional == null
                    ? "REGIONAL VIRTUAL"
                    : data.md_backup[0].regional
                  : "-"
              }}
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="getBgClass(data.status)"
              >
                {{
                  data.md_backup.length
                    ? data.md_backup[0].name == null
                      ? "-"
                      : data.md_backup[0].name
                    : "-"
                }}
              </div>
            </td>
            <td class="text-center">
              <div
                class="badge badge-sm text-white"
                :class="getBgClass(data.status)"
              >
                {{
                  data.status == "normal"
                    ? data.name_md
                    : data.md_backup.length
                    ? data.md_backup[0].status == "normal"
                      ? data.md_backup[0].name
                      : "-"
                    : "-"
                }}
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
import Pagination from "@/view/pages/Components/Pagination.vue";
import ApiService from "@/core/services/api.service.js";

export default {
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.getData();
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
  components: {
    Pagination,
  },
  data() {
    return {
      reg_wit_main: "",
      reg_wit_backup: "",
      name_md: "",
      name_mdbackup: "",
      dataViewMd: [],
    };
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
  },
  methods: {
    getData() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `monitoring/tblviewmd?page=${this.currentPage}&limit=${
          this.perPage
        }&reg_wit_main=${
          this.reg_wit_main == "" ? "%%" : `%${this.reg_wit_main}%`
        }&reg_wit_backup=${
          this.reg_wit_backup == "" ? "%%" : `%${this.reg_wit_backup}%`
        }&name_md=${
          this.name_md == "" ? "%%" : `%${this.name_md}%`
        }&name_mdbackup=${
          this.name_mdbackup == "" ? "%%" : `%${this.name_mdbackup}%`
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
          this.dataViewMd = data.result.payload;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getBgClass(status) {
      return status == "normal" ? "bg-success" : "bg-dark";
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
