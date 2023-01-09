<template>
  <section>
    <div class="card px-8 py-10">
      <div class="table-responsive">
        <table class="table table-bordered table-striped" v-if="isReady">
          <thead>
            <tr>
              <th>#</th>
              <th>NAMA RTU</th>
              <th>PORT</th>
              <th>IDENTIFIER</th>
              <th>METRICS</th>
              <th>UNIT</th>
              <th>SEVERITY</th>
              <th>HISTORY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <b-form-input
                  size="sm"
                  v-model="filterPort"
                  placeholder="Search"
                  @keyup="getPort"
                  filter-included-fields
                ></b-form-input>
              </td>
              <td>
                <b-form-input
                  size="sm"
                  v-model="filterIdentifier"
                  placeholder="Search"
                  @keyup="getPort"
                  filter-included-fields
                ></b-form-input>
              </td>
              <td>
                <b-form-input
                  size="sm"
                  v-model="filterMetrics"
                  placeholder="Search"
                  @keyup="getPort"
                  filter-included-fields
                ></b-form-input>
              </td>
              <td>
                <b-form-input
                  size="sm"
                  v-model="filterUnits"
                  placeholder="Search"
                  @keyup="getPort"
                  filter-included-fields
                ></b-form-input>
              </td>
              <td>
                <select
                  class="form-control form-control-sm"
                  v-model="filterAlert"
                  @change="getPort"
                >
                  <option value="" selected disabled hidden>
                    Pilih Status
                  </option>

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
              </td>
              <td></td>
            </tr>
            <tr v-for="(item, i) in listPortDigital" :key="i">
              <td v-if="currentPage == 1">
                <div class="d-flex justify-content-between align-items-center">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.id)"
                    v-if="showSecondaryDataId == item.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id"
                  >
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            getDataReturn(item.created_at)
                          }}</span>
                        </li>
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            item.created_by ? item.created_by : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            getDataReturn(item.updated_at)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            item.updated_by ? item.updated_by : "-"
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {{ i + 1 }}
                </div>
              </td>

              <td v-else>
                <div class="d-flex justify-content-between align-items-center">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.id)"
                    v-if="showSecondaryDataId == item.id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id"
                  >
                    <div class="card pt-4 pl-4 pr-10">
                      <ul class="list-detail text-left">
                        <li>
                          CREATED AT :
                          <span class="ml-4">{{
                            getDataReturn(item.created_at)
                          }}</span>
                        </li>
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            item.created_by ? item.created_by : "-"
                          }}</span>
                        </li>
                        <li>
                          UPDATED AT :
                          <span class="ml-4">{{
                            getDataReturn(item.updated_at)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            item.updated_by ? item.updated_by : "-"
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {{ i + 1 + (currentPage - 1) * perPage }}
                </div>
              </td>

              <td
                style="cursor: pointer"
                @click="goToDetailRtu"
                class="clickable"
              >
                {{ rtuName }}
              </td>
              <td>{{ item.no_port }}</td>
              <td>
                {{ item.identifier }}
              </td>
              <td>{{ item.metrics_value }}</td>
              <td>{{ item.units }}</td>
              <td>
                <b-badge
                  :style="{
                    'background-color':
                      item.rules.length != 0 ? item.rules[0].colors : '#5DCD89',
                  }"
                  class="p-2 fw-bold text-white"
                  >{{
                    item.rules.length != 0
                      ? item.rules[0].status != null
                        ? item.rules[0].status
                        : "Normal"
                      : "Normal"
                  }}</b-badge
                >
              </td>
              <td>
                <div
                  class="badge badge-sm badge-success"
                  style="cursor: pointer"
                  @click="openModal(item.id, item.no_port)"
                >
                  History
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
            class="mt-15"
            v-model="currentPage"
            :total-rows="totalData"
            :per-page="perPage"
            aria-controls="table-list-permission"
            @change="updatePage"
          ></b-pagination>

          <!-- show per page -->
          <div class="row align-items-center mb-2">
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

    <!-- modal detail -->
    <ModalAnalog
      portMode="Analog"
      :idSelected="idSelected"
      :isOpen="isOpen"
      @hideModal="hideModal"
    />
    <ModalDigital
      portMode="Digital"
      :idSelected="idSelected"
      :isOpen="isOpen"
      @hideModal="hideModal"
    />
  </section>
</template>

<script>
import ModalAnalog from "../operational/content-detail/ModalPort.vue";
import ModalDigital from "../operational/content-detail/ModalPortDigital.vue";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  components: {
    ModalAnalog,
    ModalDigital,
  },
  data() {
    return {
      rtuName: "",
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 20],
      showSecondaryDataId: null,

      isReady: false,
      isOpen: false,

      filterPort: "",
      filterIdentifier: "",
      filterMetrics: "",
      filterUnits: "",
      filterAlert: "",

      idSelected: "",
      listSeverity: [],

      listPortDigital: [],
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Table View" },
    ]);
    this.writeNewTitle("Table View");
    this.getDataRtu();
    this.getColorSeverity();
    this.getPort();
  },

  watch: {
    filterPort() {
      this.currentPage = 1;
      this.getPort();
    },
    filterIdentifier() {
      this.currentPage = 1;
      this.getPort();
    },
    filterMetrics() {
      this.currentPage = 1;
      this.getPort();
    },
    filterUnits() {
      this.currentPage = 1;
      this.getPort();
    },
    filterAlert() {
      this.currentPage = 1;
      this.getPort();
    },
  },
  methods: {
    goToDetailRtu() {
      this.$router.push({
        name: "Detail RTU",
        params: { idRtu: this.$route.params.idRtu },
      });
      // let a = 'dashboard/operational/detail-rtu/:idRtu'
    },
    getDataRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_4,
        `operation/rtu/${this.$route.params.idRtu}`
      )
        .then(({ data }) => {
          this.rtuName = data.result.name;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    getPort() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_4}/operation/rtu/port/${this.$route.params.idRtu}`,
        {
          params: {
            mode: "",
            page: this.currentPage,
            limit: this.perPage,
            identifier: this.filterIdentifier,
            port: this.filterPort,
            metrics_value: this.filterMetrics,
            units: this.filterUnits,
            severity: this.filterAlert,
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
    getColorSeverity() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          this.listSeverity = [{ name: "All" }, ...data.result];
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    setColorAlert(name) {
      let output = this.listSeverity.filter((data) => data.name == name);
      return output[0].colors;
    },

    changePerPage() {
      this.isReady = false;
      this.listPortDigital = [];

      this.getPort();
    },
    updatePage(page) {
      this.currentPage = page;
      this.isReady = false;
      this.listPortDigital = [];

      this.getPort();
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    // get created at and updated at for hidden column
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },

    openModal(id, port) {
      this.isOpen = true;
      this.idSelected = id;
      if (port[0] == "A") {
        this.$bvModal.show("modal-detail-port");
      } else {
        this.$bvModal.show("modal-detail-port-digital");
      }
    },
    hideModal() {
      this.isOpen = false;
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
