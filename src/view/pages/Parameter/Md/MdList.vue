<template>
  <div>
    <div class="card">
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List MD</h2>
        </b-col>

        <!-- button add user -->

        <b-col>
          <div class="button-wrapper">
            <button class="btn btn-sm btn-success mr-5" @click="refreshData()">
              <span><i class="ki ki-reload icon-sm"></i></span>
              Refresh
            </button>
            <button class="btn btn-sm btn-success mr-5" @click="showAddMd()">
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
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
                <th style="width: 20%">NAMA MD</th>
                <th style="width: 12%">MD IP</th>
                <th style="width: 15%">LOKASI</th>
                <th style="width: 10%">MODE MD</th>
                <th style="width: 10%">TIPE MD</th>
                <th style="width: 11%">STATUS</th>
                <th style="width: 12%">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="mdName"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="ipAddress"
                  ></b-form-input>
                </td>

                <td>
                  <b-form-input
                    size="sm"
                    placeholder="Search"
                    v-model="locName"
                  ></b-form-input>
                </td>

                <td>
                  <select
                    class="form-control form-control-sm"
                    v-model="mdBackup"
                  >
                    <option value="" selected disabled hidden>
                      Pilih Mode
                    </option>
                    <option
                      v-for="(data, i) in dataBackup"
                      :key="i"
                      :value="data.id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.name
                      }}</span>
                    </option>
                  </select>
                </td>

                <td>
                  <select class="form-control form-control-sm" v-model="mdType">
                    <option value="" selected disabled hidden>
                      Pilih Tipe
                    </option>
                    <option
                      v-for="(data, i) in dataType"
                      :key="i"
                      :value="data.id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.name
                      }}</span>
                    </option>
                  </select>
                </td>

                <td>
                  <select
                    class="form-control form-control-sm"
                    v-model="selectedStatus"
                  >
                    <option value="" selected disabled hidden>
                      Pilih Status
                    </option>
                    <option
                      v-for="(data, i) in dataStatus"
                      :key="i"
                      :value="data.id"
                    >
                      <span class="badge badge-danger text-white">{{
                        data.name
                      }}</span>
                    </option>
                  </select>
                </td>
                <td></td>
              </tr>
              <tr v-for="(item, i) in dataMd" :key="i">
                <td v-if="currentPage == 1">
                  <i
                    class="fas fa-minus-circle text-success icon-detail"
                    @click="showDetail(item.md_id)"
                    v-if="showSecondaryDataId == item.md_id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.md_id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.md_id"
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
                    @click="showDetail(item.md_id)"
                    v-if="showSecondaryDataId == item.md_id"
                  ></i>
                  <i
                    class="fas fa-plus-circle text-success icon-detail"
                    @click="showDetail(item.md_id)"
                    v-else
                  ></i>
                  <div
                    class="card-detail"
                    v-if="showSecondaryDataId == item.md_id"
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
                <td>{{ item.md_name ? item.md_name : "-" }}</td>
                <td>{{ item.md_ip ? item.md_ip : "-" }}</td>
                <td class="w-180px">
                  {{ item.location_name ? item.location_name : "-" }}
                </td>
                <td class="w-110px">
                  {{ item.md_backup == 0 ? "MAIN" : "BACKUP" }}
                </td>
                <td class="w-100px">
                  {{ item.md_type == 0 ? "FISIK" : "VIRTUAL" }}
                </td>
                <td class="w-110px">
                  <span
                    class="badge text-white"
                    :class="getReturnClass(item.status)"
                    >{{ item.status ? item.status : "-" }}</span
                  >
                </td>
                <td class="px-0 text-center">
                  <i
                    class="fas fa-eye text-dark mx-1 icon-view"
                    @click="showModalDetail(item.md_id)"
                  ></i>
                  <i
                    @click="showModalUpdate(item.md_id)"
                    class="fas fa-pen text-dark mx-1 icon-edit"
                  ></i>
                  <i
                    @click="deleteMd(item)"
                    class="fas fa-trash text-dark mx-1 icon-delete"
                  ></i>
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
              aria-controls="table-list-permission"
              @change="updatePage"
            ></b-pagination>

            <!-- show per page -->
            <div class="row align-items-center mb-2 mr-0 ml-0">
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
                  Showing 1 -
                  {{
                    Number(perPage) > Number(totalData) ? totalData : perPage
                  }}
                  of
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
    <detail-md ref="detail" />
    <AddMd @getAllMd="getMd" ref="add" />
    <UpdateMd @getAllDataMd="getMd" ref="update" />
  </div>
</template>

<script>
import Swal from "sweetalert2";
import AddMd from "../Md/AddMd.vue";
import UpdateMd from "../Md/UpdateMd.vue";
import ApiService from "@/core/services/api.service";
import textHelper from "@/core/helpers/textHelper";

import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  name: "TableContainnerMd",
  components: {
    DetailMd: () => import("../Md/DetailMd.vue"),
    AddMd,
    UpdateMd,
  },
  data() {
    return {
      isReady: true,
      isOpenDetail: false,
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      totalData: 1,
      listPage: [5, 10, 15, 25],

      headerTable: "tableConfig",
      dataStatus: [
        {
          id: "",
          name: "semua",
        },
        {
          id: "on going",
          name: "On Going",
        },
        { id: "normal", name: "Normal" },
        { id: "failed", name: "Failed" },
        {
          id: "off",
          name: "Off",
        },
      ],
      dataBackup: [
        {
          id: "",
          name: "SEMUA",
        },
        {
          id: 0,
          name: "MAIN",
        },
        {
          id: 1,
          name: "BACKUP",
        },
      ],
      dataType: [
        {
          id: "",
          name: "SEMUA",
        },
        {
          id: 0,
          name: "FISIK",
        },
        {
          id: 1,
          name: "VIRTUAL",
        },
      ],

      dataMd: [],
      showSecondaryDataId: null,

      // search
      mdName: "",
      locName: "",
      ipAddress: "",
      selectedStatus: "",
      mdBackup: "",
      mdType: "",
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Parameter", subtitle: "MD Management" },
    ]);
    this.writeNewTitle("MD Management");
    this.isReady = false;
    this.getMd();
  },

  watch: {
    mdName() {
      this.currentPage = 1;
      this.getMd();
    },

    locName() {
      this.currentPage = 1;
      this.getMd();
    },
    ipAddress() {
      this.currentPage = 1;
      this.getMd();
    },

    selectedStatus() {
      this.currentPage = 1;
      this.getMd();
    },
    mdBackup() {
      this.currentPage = 1;
      this.getMd();
    },
    mdType() {
      this.currentPage = 1;
      this.getMd();
    },
  },
  methods: {
    getMd() {
      ApiService.query(`${process.env.VUE_APP_ROOT_API_4}/md`, {
        params: {
          page: this.currentPage,
          limit: this.perPage,
          md_name: this.mdName,
          ip_address: this.ipAddress,
          loc_name: this.locName,
          is_status: this.selectedStatus == "semua" ? "" : this.selectedStatus,
          is_backup: this.mdBackup,
          type_md: this.mdType,
        },
      })
        .then(({ data }) => {
          this.dataMd = data.result.payload;
          this.currentPage = data.result.currentPage;
          this.lastPage = data.result.lastPage;
          this.perPage = data.result.perPage;
          this.totalData = data.result.totalData;
          this.isReady = true;
        })
        .catch((error) => {
          if (error.response.data.code == 404) {
            this.dataMd = [];
          }
          console.log(error);
        });
    },

    changePerPage() {
      this.dataMd = [];
      this.isReady = false;
      this.getMd();
    },
    updatePage(page) {
      this.currentPage = page;
      this.dataMd = [];
      this.isReady = false;
      this.getMd();
    },

    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    showModalDetail(id) {
      this.$refs["detail"].getDetailMd(id);
      this.$bvModal.show("detail-md");
    },
    showAddMd() {
      this.$refs["add"].openAddMD();
      this.$bvModal.show("add-md");
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD HH:mm:ss", data);
      }
    },
    deleteMd(md) {
      Swal.fire({
        title: `Anda yakin ingin menghapus md ${md.md_name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isReady = false;

          ApiService.delete(`${process.env.VUE_APP_ROOT_API_4}/md/${md.md_id}`)
            // eslint-disable-next-line no-unused-vars
            .then(({ data }) => {
              this.isReady = true;
              Swal.fire({
                icon: "success",
                title: "Success...",
                text: `Anda berhasil menghapus data md ${md.md_name}`,
              });
              this.getMd();
            })
            .catch((error) => {
              this.isReady = true;
              if (error.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `Server sedang dalam perbaikan. Mohon menunggu beberapa saat lagi.`,
                });
              } else if (error.response.status == 403) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response.data.result,
                });
              }

              console.log(error);
            });
        }
      });
    },

    // function for update
    showModalUpdate(id) {
      this.$refs["update"].showModal(id);
    },
    getReturnClass(status) {
      let classStatus = "badge-success";
      if (status == "normal") {
        classStatus = "badge-success";
      } else if (status == "off") {
        classStatus = "badge-dark";
      } else if (status == "on going") {
        classStatus = "badge-warning";
      } else if (status == "failed") {
        classStatus = "badge-danger";
      }
      return classStatus;
    },
    refreshData() {
      this.isReady = false;
      this.currentPage = 1;
      this.mdName = "";
      this.locName = "";
      this.ipAddress = "";
      this.selectedStatus = "";
      this.mdBackup = "";
      this.mdType = "";
      this.getMd();
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

.wrap-pagination {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.badge-success {
  background-color: rgb(36, 199, 36);
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

.fa-eye,
.fa-pen,
.fa-trash,
.icon-detail,
.button-click {
  cursor: pointer;
}

.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}
</style>
