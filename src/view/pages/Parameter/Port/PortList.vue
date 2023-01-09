<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Port</h2>
        </b-col>

        <!-- button add user -->
        <b-col>
          <div class="button-wrapper">
            <router-link
              to="/parameter/port-type-management-add-port"
              v-slot="{ navigate }"
            >
              <button class="btn btn-sm btn-success mr-5" @click="navigate">
                <span><i class="fas fa-plus icon-sm"></i></span>
                Tambah
              </button>
            </router-link>
          </div>
        </b-col>
      </b-row>
      <hr />

      <div class="p-10">
        <div class="table-responsive">
          <table class="table table-bordered table-striped" v-if="isReady">
            <thead>
              <tr class="text-center">
                <th style="width: 10%">#</th>
                <th style="width: 15%">NAMA PORT</th>
                <th style="width: 12%">MODE PORT</th>
                <th style="width: 12%">IDENTIFIER NAME</th>
                <th style="width: 10%">UNIT</th>
                <th style="width: 7%">CALIBRATION VALUE</th>
                <th style="width: 15%">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="getNamePort"
                    v-on:keyup="getPort"
                  ></b-form-input>
                </td>

                <td>
                  <select
                    class="form-control form-control-sm"
                    v-model="getModePort"
                    v-on:keyup="getPort"
                  >
                    <option value="" selected disabled hidden>
                      Pilih Mode
                    </option>
                    <option
                      v-for="(data, i) in modePort"
                      :key="i"
                      :value="data.id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.name
                      }}</span>
                    </option>
                  </select>
                </td>
                <!-- <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="getModePort"
                    v-on:keyup="getPort"
                  ></b-form-input>
                </td> -->

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="getIdentifier"
                    v-on:keyup="getPort"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    v-model="getUnit"
                    placeholder="Search"
                    v-on:keyup="getPort"
                    ><span><i class="fa fa-search icon-sm"></i></span
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    v-model="getCaliberation"
                    placeholder="Search"
                    v-on:keyup="getPort"
                  ></b-form-input>
                </td>

                <td></td>
              </tr>

              <tr v-for="(item, i) in dataPort" :key="i">
                <td v-if="currentPage == 1">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.id_port)"
                    v-if="showSecondaryDataId == item.id_port"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.id_port)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id_port"
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
                </td>
                <td v-else>
                  <!-- secondary detail -->
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.id_port)"
                    v-if="showSecondaryDataId == item.id_port"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.id_port)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.id_port"
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
                </td>
                <td>{{ item.port_name }}</td>
                <td>{{ item.port_mode }}</td>
                <td>{{ item.identifier }}</td>
                <td>{{ item.units }}</td>
                <td>{{ item.calibration_value }}</td>
                <td align="center">
                  <i
                    class="fas fa-eye text-dark mx-1 icon-view"
                    @click="showDetailPort(item.id_port)"
                  ></i>
                  <i
                    class="fas fa-pen text-dark mx-1 icon-edit"
                    @click="updatePort(item.id_port)"
                  ></i>
                  <i
                    class="fas fa-trash text-dark mx-1 icon-delete"
                    @click="deletePort(item)"
                  ></i>
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
              class="mt-10"
              v-model="currentPage"
              :total-rows="totalData"
              :per-page="perPage"
              aria-controls="table-list-permission"
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

    <DetailPort
      :idSelected="idSelected"
      :isDetail="isDetail"
      @hideDetail="hideDetail"
    />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service";
import DetailPort from "../Port/DetailPort.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import textHelper from "@/core/helpers/textHelper";

export default {
  name: "TableContainnerPort",
  components: {
    DetailPort,
  },
  data() {
    return {
      headerTable: "tableConfig",
      isReady: true,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],

      dataPort: [],
      showSecondaryDataId: null,

      getNamePort: "",
      getModePort: "",
      getIdentifier: "",
      getUnit: "",
      getCaliberation: "",
      getRule: "",

      idSelected: "",

      modePort: [
        {
          id: "",
          name: "SEMUA",
        },
        {
          id: "analog",
          name: "ANALOG",
        },
        {
          id: "digital",
          name: "DIGITAL",
        },
      ],

      // status detail
      isDetail: false,

      // status edit
      isEdit: false,

      // status add
      isAdd: false,
    };
  },

  watch: {
    getNamePort() {
      this.currentPage = 1;
      this.getPort();
    },
    getModePort() {
      this.currentPage = 1;
      this.getPort();
    },
    getIdentifier() {
      this.currentPage = 1;
      this.getPort();
    },
    getUnit() {
      this.currentPage = 1;
      this.getPort();
    },
    getCaliberation() {
      this.currentPage = 1;
      this.getPort();
    },
    getRule() {
      this.currentPage = 1;
      this.getPort();
    },
  },

  mounted() {
    this.checkPermission(
      "parameter_ports",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "Port Type Management" },
    ]);
    this.writeNewTitle("Port Type Management");
    this.isReady = false;
    this.getPort();
  },
  methods: {
    async getPort() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/port`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          mode: this.getModePort,
          identifier: this.getIdentifier,
          name: this.getNamePort,
          calibration_value: this.getCaliberation,
          units: this.getUnit,
        },
      })
        .then(({ data }) => {
          this.dataPort = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataPort = [];
          }
          console.log("error", error);
        });
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataPort = [];
      this.isReady = false;
      this.getPort();
    },
    changePerPage() {
      this.dataPort = [];
      this.isReady = false;
      this.getPort();
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },

    // for add data port
    addPort() {
      this.isAdd = true;
      this.$bvModal.show("modal-add-port");
    },
    hideAdd() {
      this.isAdd = false;
    },

    // for status primary detail
    showDetailPort(id) {
      this.idSelected = id;
      this.$bvModal.show("modal-detail-port");
    },
    hideDetail() {
      this.isDetail = false;
      this.$bvModal.hide("modal-detail-port");
    },

    updatePort(id) {
      this.$router.push({
        name: "UpdatePort",
        params: { idSelected: id },
      });
    },

    // for delete
    deletePort(port) {
      Swal.fire({
        title: "Oops!",
        text: `Anda yakin ingin menghapus data port ${port.port_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#c70000",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_4}/port/del/${port.id_port}`
          )
            // eslint-disable-next-line no-unused-vars
            .then(({ data }) => {
              Swal.fire(
                "Terhapus!",
                `Data port ${port.port_name} berhasil dihapus`,
                "success"
              );
              this.getPort();
            })
            .catch((e) => {
              if (e.response.status == 500) {
                Swal.fire(
                  "Oops!",
                  "Server sedang dalam perbaikan. Mohon tunggu beberapa saat lagi!",
                  "error"
                );
              }
            });
        }
      });
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

/* button add and delete */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}

.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}
</style>
