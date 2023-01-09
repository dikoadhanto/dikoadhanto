<template>
  <section>
    <div class="table-responsive">
      <table class="table table-bordered table-striped" v-if="isReady">
        <!-- <TableHeader /> -->
        <thead>
          <tr>
            <th style="width: 7%">#</th>
            <th style="width: 10%">
              <div class="header-flex">
                PORT <i class="fas fa fa-sort" @click="sortData('port')"></i>
              </div>
            </th>
            <th>
              <div class="header-flex">
                DESKRIPSI
                <i class="fas fa fa-sort" @click="sortData('description')"></i>
              </div>
            </th>
            <th style="width: 10%">VALUE</th>
            <th style="width: 10%">
              <div class="header-flex">
                UNITS <i class="fas fa fa-sort" @click="sortData('units')"></i>
              </div>
            </th>
            <th>RULES</th>
            <th style="width: 8%">STATUS</th>
            <th style="width: 12%">SEVERITY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterPort"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterDeskripsi"
                placeholder="Search"
                filter-included-fields
              >
              </b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterRules"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterValue"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterUnits"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                size="sm"
                v-model="filterStatus"
                placeholder="Search"
                filter-included-fields
              ></b-form-input>
            </td>
            <td>
              <select
                class="form-control form-control-sm"
                v-model="filterAlert"
              >
                <option value="" selected disabled hidden>Pilih Status</option>

                <option
                  v-for="(data, i) in listSeverity"
                  :key="i"
                  :value="data.id"
                >
                  <span class="badge badge-danger text-white">{{
                    data.name
                  }}</span>
                </option>
              </select>
            </td>
          </tr>
          <tr v-for="(item, i) in listPortDigital" :key="i">
            <td>
              <i
                class="fas fa-minus-circle text-success icon-detail"
                @click="showDetail(i)"
                v-if="showSecondaryDataId == i"
              ></i>
              <i
                class="fas fa-plus-circle text-success icon-detail"
                @click="showDetail(i)"
                v-else
              ></i>
              <div class="card-detail" v-if="showSecondaryDataId == i">
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
              {{ showNumbering(i) }}
            </td>

            <td>{{ item.no_port }}</td>
            <td class="clickable" @click="openModal(item.id, item.is_formula)">
              {{ item.description == null ? "-" : item.description }}
            </td>
            <td>
              {{
                item.hasMetric == false
                  ? "-"
                  : item.hasMetric == null
                  ? "-"
                  : item.metrics_value
              }}
            </td>
            <td>{{ item.units }}</td>

            <td>
              {{ item.rules.length == 0 ? "-" : item.rules[0].rule }}
            </td>
            <td>{{ getStatusAlert(item) }}</td>
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
          </tr>
        </tbody>
      </table>

      <div class="alert alert-warning mt-15" role="alert" v-else>
        Tunggu sebentar, sedang pengambilan data...
      </div>

      <Pagination @getData="getPortDigital" @changeStatusReady="changeReady" />
    </div>

    <!-- modal detail -->
    <Modal
      portMode="Digital"
      :detailRTU="dataDetailRtu"
      :idSelected="idSelected"
      :isOpen="isOpen"
      @hideModal="hideModal"
      :isFormula="isFormula"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "./ModalPortDigital.vue";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";
import Pagination from "@/view/pages/Components/Pagination.vue";

export default {
  components: {
    Modal,
    Pagination,
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
      "getIsAutoRefresh",
    ]),
  },
  data() {
    return {
      showSecondaryDataId: null,
      condition: "asc",

      isReady: true,
      isOpen: false,
      sendDataList: "",
      dataDetailRtu: {},
      isFormula: 0,

      filterPort: "",
      filterDeskripsi: "",
      filterRules: "",
      filterValue: "",
      filterUnits: "",
      filterStatus: "",
      filterAlert: "",

      idSelected: "",
      listSeverity: [{ id: "", name: "Semua" }],

      listPortDigital: [],
    };
  },
  mounted() {
    this.$store.dispatch("setDefaultPagination");
    this.isReady = false;
    this.getColorSeverity();
    this.getPortDigital();
  },

  watch: {
    filterPort() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterDeskripsi() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterRules() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterValue() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterUnits() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterStatus() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },
    filterAlert() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getPortDigital();
    },

    getIsAutoRefresh: function () {
      if (this.getIsAutoRefresh) {
        this.$store.dispatch("setIsAutoRefresh", false);
        this.getPortDigital();
      }
    },
  },
  methods: {
    showNumbering(index) {
      return this.currentPage == 1
        ? index + 1
        : index + 1 + (this.currentPage - 1) * this.perPage;
    },
    sortData(sortBy) {
      if (sortBy == "port") {
        if (this.condition == "asc") {
          this.condition = "desc";
          this.listPortDigital = this.listPortDigital.sort((a, b) => {
            let portA = a.no_port.split("-")[1];
            let portB = b.no_port.split("-")[1];
            return portA - portB;
          });
        } else {
          this.condition = "asc";
          this.listPortDigital = this.listPortDigital.sort((a, b) => {
            let portA = a.no_port.split("-")[1];
            let portB = b.no_port.split("-")[1];
            return portB - portA;
          });
        }
      } else if (sortBy == "description") {
        if (this.condition == "asc") {
          this.condition = "desc";
          this.listPortDigital = this.listPortDigital.sort((a, b) =>
            a.description.localeCompare(b.description)
          );
        } else {
          this.condition = "asc";
          this.listPortDigital = this.listPortDigital.sort((a, b) =>
            b.description.localeCompare(a.description)
          );
        }
      } else if (sortBy == "units") {
        if (this.condition == "asc") {
          this.condition = "desc";
          this.listPortDigital = this.listPortDigital.sort((a, b) =>
            a.units.localeCompare(b.units)
          );
        } else {
          this.condition = "asc";
          this.listPortDigital = this.listPortDigital.sort((a, b) =>
            b.units.localeCompare(a.units)
          );
        }
      }
    },
    getPortDigital() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_5}/operation/rtu/port/${this.$route.params.idRtu}`,
        {
          params: {
            mode: "digital",
            page: this.currentPage,
            limit: this.perPage,
            port: this.filterPort,
            description: this.filterDeskripsi,
            rules: this.filterRules,
            metrics_value: this.filterValue,
            units: this.filterUnits,
            severity: this.filterAlert.length == 0 ? "All" : this.filterAlert,
          },
        }
      )
        .then(({ data }) => {
          this.listPortDigital = data.result.payload;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch(
            "setPerPage",
            this.perPage == "all" ? data.result.totalData : data.result.perPage
          );
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.listPortDigital = [];
          }
          this.isReady = true;
        });
    },
    getColorSeverity() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          data.result.forEach((data) => {
            if (data.name != null) {
              let newData = {
                id: data.name,
                name: data.name,
              };
              this.listSeverity.push(newData);
            }
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    setColorAlert(name) {
      let output = this.listSeverity.filter((data) => data.name == name);
      return output[0].colors;
    },
    changeReady() {
      this.isReady = false;
    },

    showDetail(index) {
      this.showSecondaryDataId =
        this.showSecondaryDataId == index ? null : index;
    },

    getStatusAlert(item) {
      if (item.hasMetric) {
        if (item.device_name === "GENSET") {
          if (Number(item.metrics_value) == 0) {
            return "OFF";
          } else {
            return "ON";
          }
        } else if (item.device_name === "PLN") {
          if (Number(item.metrics_value) == 0) {
            return "ON";
          } else {
            return "OFF";
          }
        } else {
          return "-";
        }
      } else {
        return "-";
      }
    },

    // get created at and updated at for hidden column
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },

    async openModal(id, isFormula) {
      this.isOpen = true;
      this.idSelected = id;
      this.isFormula = isFormula;
      await this.getDetailRtu();
      this.$bvModal.show("modal-detail-port-digital");
    },
    getDetailRtu() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_5,
        `operation/rtu/${this.$route.params.idRtu}`
      )
        .then(({ data }) => {
          this.dataDetailRtu = data.result;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    hideModal() {
      this.idSelected = "";
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
/* icon plus for hidden column */
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
  background-color: #1bc5bd !important;
}

.fa-minus-circle {
  color: #ffffff !important;
  background-color: #1bc5bd !important;
  border: 1px solid transparent !important;
}

/* hover icon minus circle */
.fa-minus-circle:hover {
  color: #ffffff !important;
  background-color: #1ba8a1 !important;
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

.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-flex i {
  cursor: pointer;
}
</style>
