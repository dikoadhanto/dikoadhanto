<template>
  <section>
    <div class="card">
      <div class="card-header">
        <div class="justify-between float-right">
          <b-button
            variant="success"
            class="mb-2 mr-2"
            @click="
              ExportToExcelFromMixin('Table Port Sensor', 'table-port-sensor')
            "
          >
            Export To Excel
            <b-icon icon="credit-card" aria-hidden="true"></b-icon>
          </b-button>
          <b-button
            variant="danger"
            class="mb-2"
            @click="generatePdf('Table Port Sensor', 'table-port-sensor')"
          >
            Export To Pdf
            <b-icon icon="credit-card" aria-hidden="true"></b-icon>
          </b-button>
        </div>
      </div>
      <div class="card-body">
        <div v-if="isReady">
          <b-table
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            bordered
            striped
            sort-icon-left
            hover
            show-empty
            id="table-port-sensor"
            v-if="!isError"
          >
            <template #empty="items">
              <div class="alert alert-warning text-center" role="alert">
                Data tidak ada .. ..
              </div>
            </template>
            <template #top-row>
              <td></td>
              <td></td>
              <td>
                <b-form-input v-model="filterName" />
              </td>
              <!-- <td>
                <b-form-select
                  :options="dataStatusRtu"
                  v-model="filterStatusRtu"
                  @change="changeStatusRtu"
                  :disabled="getIdAlarmTypeSensor != null"
                ></b-form-select>
              </td> -->
              <td>
                <b-form-input v-model="filterPort" />
              </td>
              <td>
                <b-form-input v-model="filterDescription" />
              </td>
              <td></td>
              <td></td>
              <td>
                <b-form-select
                  :options="listSeverity"
                  v-model="filterSeverity"
                  @change="getAllRtu"
                ></b-form-select>
              </td>
              <td></td>
            </template>
            <template #cell(index)="data">
              <div class="d-flex justify-content-between align-items-center">
                <!-- <i
                  class="fas fa-minus-circle text-success icon-detail"
                  @click="showDetail(data.item.id)"
                  v-if="showSecondaryDataId == data.item.id"
                ></i>
                <i
                  class="fas fa-plus-circle text-success icon-detail"
                  @click="showDetail(data.item.id)"
                  v-else
                ></i>
                <div
                  class="card-detail"
                  v-if="showSecondaryDataId == data.item.id"
                >
                  <div class="card pt-4 pl-4 pr-10">
                    <ul class="list-detail text-left">
                      <li>
                        CREATED AT :
                        <span class="ml-4">{{
                          getDataReturn(data.item.created_at)
                        }}</span>
                      </li>
                      <li>
                        CREATED BY :
                        <span class="ml-4">{{
                          data.item.created_by ? data.item.created_by : "-"
                        }}</span>
                      </li>
                      <li>
                        UPDATED AT :
                        <span class="ml-4">{{
                          getDataReturn(data.item.updated_at)
                        }}</span>
                      </li>
                      <li>
                        UPDATED BY :
                        <span class="ml-4">{{
                          data.item.updated_by ? data.item.updated_by : "-"
                        }}</span>
                      </li>
                    </ul>
                  </div>
                </div> -->
                {{ showNumbering(data.index) }}
              </div>
            </template>
            <template #cell(rtu_sname)="data">
              <router-link
                :to="'/dashboard/operational/detail-rtu/' + data.item.rtu_id"
              >
                {{ data.item.rtu_sname }}
              </router-link>
            </template>
            <template #cell(value)="data">
              {{
                data.item.value > 0
                  ? data.item.value.toFixed(2)
                  : data.item.value
              }}
            </template>
            <template #cell(units)="data">
              {{ data.item.units ? data.item.units : "-" }}
            </template>
            <template #cell(severity)="data">
              <b-badge
                :style="{
                  'background-color': data.item.severity.colors,
                }"
                class="p-2 fw-bold text-white"
                >{{
                  data.item.severity.name ? data.item.severity.name : "-"
                }}</b-badge
              >
            </template>
            <template #cell(history)="data">
              <div
                class="badge badge-sm badge-success"
                style="cursor: pointer"
                @click="
                  openModal(
                    data.item.id,
                    data.item.no_port,
                    data.item.rtu_name,
                    data.item.rtu_sname,
                    data.item.is_formula
                  )
                "
              >
                History
              </div>
            </template>
          </b-table>
          <div class="alert alert-danger mt-15" role="alert" v-else>
            Mohon maaf, server sedang dalam perbaikan. Mohon mencoba beberapa
            saat lagi.
          </div>
        </div>
        <div class="alert alert-warning mt-15" role="alert" v-else>
          Tunggu sebentar, sedang pengambilan data...
        </div>
        <!-- pagination -->
        <Pagination @getData="getAllRtu" @changeStatusReady="changeReady" />
      </div>
    </div>

    <!-- modal detail -->
    <ModalAnalog
      portMode="Analog"
      :idSelected="idSelected"
      :isOpen="isOpenAnalog"
      :detailRTU="detailRTU"
      @hideModal="hideModal"
      :isFormula="isFormula"
    />
    <ModalDigital
      portMode="Digital"
      :idSelected="idSelected"
      :detailRTU="detailRTU"
      :isOpen="isOpenDigital"
      @hideModal="hideModal"
      :isFormula="isFormula"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import ModalAnalog from "../operational/content-detail/ModalPort.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import ModalDigital from "../operational/content-detail/ModalPortDigital.vue";

export default {
  components: {
    Pagination,
    ModalAnalog,
    ModalDigital,
  },
  computed: {
    ...mapGetters([
      "getIdRegionalSensor",
      "getIdWitelSensor",
      "getIdDatelSensor",
      "getIdLocationSensor",
      "getIdTagsSensor",
      "getRtuIdsSensor",
      "getRtuStatusSensor",
      "getIdAlarmTypeSensor",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
    ]),
  },
  data() {
    return {
      rtuName: "",
      showSecondaryDataId: null,

      isReady: false,
      isError: false,
      isOpenAnalog: false,
      isOpenDigital: false,
      dataStatusRtu: [
        {
          value: "",
          text: "Semua",
        },
        {
          value: "normal",
          text: "Normal",
        },
        {
          value: "off",
          text: "Off",
        },
        {
          value: "alert",
          text: "Alert",
        },
      ],

      filterPort: "",
      filterName: "",
      filterUnits: "",
      filterDescription: "",
      filterStatusRtu: "",
      filterSeverity: "",

      idSelected: "",
      isFormula: 0,
      detailRTU: {},
      idSeverity: "",
      listSeverity: [],

      // table bootstrap
      fields: [
        { key: "index", label: "#" },
        { key: "rtu_sname", label: "SNAME RTU", sortable: true },
        { key: "rtu_name", label: "NAMA RTU", sortable: true },
        { key: "no_port", label: "PORT", sortable: true },
        { key: "description", label: "DESCRIPTION", sortable: true },
        { key: "value", label: "VALUE", sortable: true },
        { key: "units", label: "UNIT", sortable: true },
        { key: "severity", label: "SEVERITY" },
        { key: "history", label: "HISTORY" },
      ],
      items: [],
      sortBy: "",
      sortDesc: false,
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Dashboard", subtitle: "Table View" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.getColorSeverity();
    this.getAllRtu();
  },
  watch: {
    filterName() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterPort() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    filterDescription() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdRegionalSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdWitelSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdDatelSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdLocationSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdTagsSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getRtuStatusSensor() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getAllRtu();
    },
    getIdAlarmTypeSensor(val) {
      this.$store.dispatch("setCurrentPage", 1);
      if (val != null) {
        this.filterStatusRtu = "";
        this.$store.dispatch("setRtuStatusSensor", this.filterStatusRtu);
      }
      this.getAllRtu();
    },
  },
  methods: {
    changeSeverity() {
      this.items = this.items.filter(
        (item) => item.severity.id == this.filterSeverity
      );
      this.$store.dispatch("setCurrentPage", 1);
      this.$store.dispatch("setLastPage", 1);
      this.$store.dispatch("setPerPage", this.perPage);
      this.$store.dispatch("setTotalData", this.items.length);
    },
    showNumbering(index) {
      return this.currentPage == 1
        ? index + 1
        : index + 1 + (this.currentPage - 1) * this.perPage;
    },
    getAllRtu() {
      this.isError = false;
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_5}/dashboard/rtu/port-sensors`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            rtuStatus:
              this.getIdAlarmTypeSensor == null
                ? this.getRtuStatusSensor
                : this.getIdAlarmTypeSensor,
            regionalId:
              this.getIdRegionalSensor == null ? "" : this.getIdRegionalSensor,
            witelId: this.getIdWitelSensor == null ? "" : this.getIdWitelSensor,
            datelId: this.getIdDatelSensor == null ? "" : this.getIdDatelSensor,
            locationId:
              this.getIdLocationSensor == null ? "" : this.getIdLocationSensor,
            tagsId: this.getIdTagsSensor == null ? "" : this.getIdTagsSensor,
            rtuPortId: this.getRtuIdsSensor == null ? "" : this.getRtuIdsSensor,
            searchRtuName: this.filterName,
            searchUnits: this.filterUnits,
            searchNoPort: this.filterPort,
            // severityId: this.idSeverity,
            searchDescription: this.filterDescription,
          },
        }
      )
        .then(({ data }) => {
          this.items = data.result.payload.map((data, index) => ({
            index: index,
            ...data,
          }));
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", Number(data.result.totalData));
          if (this.filterSeverity != "") {
            this.changeSeverity();
          }
          this.isReady = true;
        })
        .catch((error) => {
          this.items = [];
          this.isReady = true;
          if (error.response.status != 404) {
            this.isError = true;
          }
          if (error.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Mohon maaf, server sedang dalam perbaikan",
            });
          }
        });
    },
    getColorSeverity() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_4}/other/severity`)
        .then(({ data }) => {
          this.listSeverity = [
            { value: "", text: "Semua" },
            ...data.result.map((item) => {
              return {
                value: item.id,
                text: item.name,
              };
            }),
          ];
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    setColorAlert(name) {
      let output = this.listSeverity.filter((data) => data.name == name);
      return output[0].colors;
    },
    changeStatusRtu() {
      if (this.getIdAlarmTypeSensor == null) {
        this.$store.dispatch("setRtuStatusSensor", this.filterStatusRtu);
      }
    },
    changeReady() {
      this.isReady = false;
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

    openModal(id, port, name, sname, isFormula) {
      this.idSelected = id;
      this.detailRTU = {
        name,
        sname,
      };
      this.isFormula = isFormula ?? 0;
      if (port[0] == "A") {
        this.isOpenAnalog = true;
        this.$bvModal.show("modal-detail-port");
      } else {
        this.isOpenDigital = true;
        this.$bvModal.show("modal-detail-port-digital");
      }
    },
    hideModal() {
      this.idSelected = "";
      this.isOpenAnalog = false;
      this.isOpenDigital = false;
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
  background-color: #1ba8a1 !important;
}

.fa-minus-circle {
  color: #ffffff !important;
  background-color: #18cfc6 !important;
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
  margin: 100px 0 0 30px;
  position: absolute;
}

/* list in hidden column */
.list-detail {
  list-style-type: none;
}
</style>
