<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List RTU</h2>
        </b-col>

        <!-- button add user -->
        <b-col>
          <div class="button-wrapper">
            <router-link
              to="/parameter/rtu-management/add-rtu-new"
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
          <table
            class="table table-hover table-bordered table-striped"
            v-if="isReady"
          >
            <thead>
              <tr class="text-center">
                <th style="width: 8%">#</th>
                <th style="width: 10%">SNAME</th>
                <th style="width: 10%">NAMA RTU</th>
                <th style="width: 15%">RTU Deskripsi</th>
                <th style="width: 8%">RTU IP</th>
                <th style="width: 8%">NAMA MD</th>
                <th style="width: 8%">MD IP</th>
                <th style="width: 8%">LOKASI</th>
                <th colspan="4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterSname"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterNameRtu"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterDeskripsi"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterRtuIp"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterNameMd"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterMdIp"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="filterLocation"
                  ></b-form-input>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr v-for="(item, i) in dataRtu" :key="i">
                <td v-if="currentPage == 1">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.rtu_id)"
                    v-if="showSecondaryDataId == item.rtu_id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.rtu_id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.rtu_id"
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
                    @click="showDetail(item.rtu_id)"
                    v-if="showSecondaryDataId == item.rtu_id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.rtu_id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.rtu_id"
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
                <td>{{ item.rtu_sname }}</td>
                <td>{{ item.rtu_name }}</td>
                <td>{{ item.rtu_description }}</td>
                <td>{{ item.rtu_ip }}</td>
                <td>{{ item.md_name }}</td>
                <td>{{ item.md_ip }}</td>
                <td>{{ item.rtu_location }}</td>
                <td align="center">
                  <i
                    class="fas fa-list text-dark icon-list mx-1"
                    title="Show ports"
                    @click="showPorts(item)"
                  ></i>
                </td>
                <td align="center">
                  <i
                    class="fas fa-eye text-dark icon-view mx-1"
                    title="Detail"
                    @click="showModalDetail(item.rtu_id)"
                  ></i>
                </td>
                <td align="center">
                  <i
                    class="fas fa-pen text-dark px-1 icon-edit mx-1"
                    title="Update"
                    @click="showUpdateRtu(item.rtu_id)"
                  ></i>
                </td>
                <td align="center">
                  <i
                    class="fas fa-trash text-dark icon-delete mx-1"
                    title="Delete"
                    @click="deleteRtu(item)"
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
    <DetailRtu :idSelected="idSelected" />
  </div>
</template>

<script>
import ApiService from "@/core/services/api.service";
import DetailRtu from "../Rtu/DetailRtu.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import textHelper from "@/core/helpers/textHelper.js";

import Swal from "sweetalert2";

export default {
  name: "TableContainnerRtu2",
  components: {
    DetailRtu,
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

      dataRtu: [],

      idSelected: "",
      showSecondaryDataId: null,

      filterSname: "",
      filterNameRtu: "",
      filterDeskripsi: "",
      filterRtuIp: "",
      filterNameMd: "",
      filterMdIp: "",
      filterLocation: "",
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "RTU Management" },
    ]);
    this.writeNewTitle("RTU Management");
    this.isReady = false;
    this.getRtu();
    this.$store.dispatch("setDefaultPorts");
  },
  watch: {
    filterSname() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterNameRtu() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterDeskripsi() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterRtuIp() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterNameMd() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterMdIp() {
      this.currentPage = 1;
      this.getRtu();
    },
    filterLocation() {
      this.currentPage = 1;
      this.getRtu();
    },
  },
  methods: {
    async getRtu() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/rtu`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          name_md: this.filterNameMd,
          sname_rtu: this.filterSname,
          ip_addr_rtu: this.filterRtuIp,
          ip_addr_md: this.filterMdIp,
          name_rtu: this.filterNameRtu,
          desc_rtu: this.filterDeskripsi,
          rtu_location: this.filterLocation,
        },
      })
        .then(({ data }) => {
          this.dataRtu = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataRtu = "";
          }
          console.log("error :", error.response);
        });
    },
    changePerPage() {
      this.dataRtu = [];
      this.isReady = false;

      this.getRtu();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataRtu = [];
      this.isReady = false;
      this.getRtu();
    },
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    showPorts(item) {
      this.$router.push({
        name: "RtuPort",
        params: { id: item.rtu_id },
        props: {
          rtuName: "testing port",
        },
      });
    },
    showModalDetail(id) {
      this.idSelected = id;
      this.$bvModal.show("detail-rtu");
    },
    showUpdateRtu(id) {
      this.$router.push({
        name: "UpdateRtu2",
        params: { idSelected: id },
      });
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },

    deleteRtu(item) {
      Swal.fire({
        title: `Anda yakin ingin menghapus ${item.rtu_name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_4}/rtu/del/${item.rtu_id}`
          )
            // eslint-disable-next-line no-unused-vars
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: `Anda telah berhasil menghapus ${item.rtu_name}`,
              });
              this.getRtu();
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      });
    },
  },
};
</script>

<style scoped>
/* button add and delete */
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 20px;
}

/* pagination */
.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.info-page {
  font-size: 10px;
}

.fa-eye,
.fa-pen,
.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
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
