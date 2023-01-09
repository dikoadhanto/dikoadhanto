<template>
  <section id="list-api">
    <div class="card">
      <div class="card-header">
        <div class="title-header">List API</div>
        <div
          class="btn btn-sm btn-success"
          @click="goToAddApi('modal-add-api')"
        >
          <i class="fas fa-sm fa-plus"></i> TAMBAH
        </div>
      </div>
      <div class="card-body">
        <div class="container">
          <!-- if data ready -->
          <div class="table-responsive" v-if="isReady">
            <table
              class="table table-bordered text-center"
              id="table-api-permission"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>API ROLE</th>
                  <th>APPLICATION</th>
                  <th>EXPIRED AT</th>
                  <th>IS ACTIVE</th>
                  <th>TOKEN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <!-- row to input search -->
                <tr>
                  <td></td>
                  <td class="p-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      v-model="filterRole"
                      v-on:keyup="getDataApi"
                      class="form-control"
                    />
                  </td>
                  <td class="p-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      v-model="filterApplication"
                      v-on:keyup="getDataApi"
                      class="form-control"
                    />
                  </td>
                  <td class="p-2"></td>
                  <td>
                    <b-form-select
                      v-model="filterIsActive"
                      @change="getDataApi"
                    >
                      <option value="1">On</option>
                      <option value="0">Off</option>
                    </b-form-select>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <!-- foreach data apis -->
                <tr v-for="(api, i) in listApi" :key="i">
                  <td v-if="currentPage == 1">
                    <!-- secondary detail -->
                    <i
                      class="fas fa-minus-circle text-success icon-detail"
                      @click="showDetail(api.id)"
                      v-if="showSecondaryDataId == api.id"
                    ></i>
                    <i
                      class="fas fa-plus-circle text-success icon-detail"
                      @click="showDetail(api.id)"
                      v-else
                    ></i>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == api.id"
                    >
                      <div class="card pt-4 pl-4 pr-10">
                        <ul class="list-detail text-left">
                          <li>
                            EXPIRED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.expired_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.created_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              api.created_by ? api.created_by : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.updated_at)
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              api.updated_by ? api.updated_by : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 }}
                  </td>
                  <td v-else>
                    <!-- secondary detail -->
                    <i
                      class="fas fa-minus-circle text-success icon-detail"
                      @click="showDetail(api.id)"
                      v-if="showSecondaryDataId == api.id"
                    ></i>
                    <i
                      class="fas fa-plus-circle text-success icon-detail"
                      @click="showDetail(api.id)"
                      v-else
                    ></i>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == api.id"
                    >
                      <div class="card pt-4 pl-4 pr-10">
                        <ul class="list-detail text-left">
                          <li>
                            EXPIRED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.expired_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.created_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              api.created_by ? api.created_by : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              getReturnTime(api.updated_at)
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              api.updated_by ? api.updated_by : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 + (currentPage - 1) * perPage }}
                  </td>
                  <td>{{ api.role }}</td>
                  <td>{{ api.application }}</td>
                  <td>{{ getReturnTimeSimple(api.expired_at) }}</td>
                  <td>
                    <b-form-checkbox
                      switch
                      size="lg"
                      checked="true"
                      disabled
                      v-if="api.is_active == 1"
                    ></b-form-checkbox>
                    <b-form-checkbox
                      switch
                      size="lg"
                      disabled
                      v-else
                    ></b-form-checkbox>
                  </td>
                  <td>
                    <!-- copy -->
                    <i
                      class="fas fa-copy icon-detail text-dark"
                      title="Copy to clipboard"
                      @click="copyToClipboard(api.token)"
                    ></i>
                  </td>
                  <td>
                    <!-- detail -->
                    <i
                      class="fas fa-eye icon-detail mr-5 text-dark"
                      title="Detail"
                      @click="detailApi(api, 'modal-detail-api')"
                    ></i>
                    <!-- edit -->
                    <i
                      class="fas fa-pen icon-detail mr-5 text-dark"
                      title="Edit"
                      @click="updateApi(api, 'modal-update-api')"
                    ></i>
                    <!-- delete -->
                    <i
                      class="fas fa-trash icon-detail text-dark"
                      title="Hapus"
                      @click="deleteApi(api.id)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- data not ready -->
          <div class="alert alert-warning mt-15" role="alert" v-else>
            Tunggu sebentar, sedang pengambilan data...
          </div>

          <Pagination @getData="getDataApi" @changeStatusReady="changeReady" />
        </div>
      </div>
    </div>

    <!-- add api -->
    <AddApi @getDataApi="getDataApi" :isAdd="isAdd" @hideAdd="hideAdd" />

    <!-- update api -->
    <UpdateApi
      @getDataApi="getDataApi"
      :isUpdate="isUpdate"
      :apiSelected="apiSelected"
      @hideUpdate="hideUpdate"
    />

    <!-- detail api -->
    <DetailApi
      :isDetail="isDetail"
      :apiSelected="apiSelected"
      @hideDetail="hideDetail"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import AddApi from "./AddApi.vue";
import UpdateApi from "./UpdateApi.vue";
import DetailApi from "./DetailApi.vue";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { SET_PERMISSIONS } from "@/core/services/store/auth.module";

export default {
  data() {
    return {
      isActive: true,
      listApi: [],
      filterRole: "",
      filterApplication: "",
      filterIsActive: 1,
      picName: "",
      isReady: false,

      // show deatik secondary
      showSecondaryDataId: null,

      // add api
      isAdd: false,

      // update api
      isUpdate: false,
      apiSelected: {},

      // detail
      isDetail: false,

      listPermission: this.getReturnRolePermissions(),
    };
  },
  components: {
    AddApi,
    UpdateApi,
    DetailApi,
    Pagination,
  },
  watch: {
    filterRole() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataApi();
    },
    filterApplication() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataApi();
    },
  },
  mounted() {
    this.checkPermission(
      "administration_api",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.writeNewTitle("Api Management");

    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "API Management" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.getDataApi();
  },
  computed: {
    ...mapGetters([
      "currentPermissions",
      "currentPage",
      "lastPage",
      "perPage",
      "totalData",
    ]),
  },
  methods: {
    // check permission
    checkPermission(name, textError) {
      if (!this.listPermission.includes(name)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: textError,
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            this.$router.push({ name: "MapView" });
          }
        });
      }
    },

    // get data list
    getDataApi() {
      let params = {
        limit: this.perPage,
        page: this.currentPage,
        searchRole: this.filterRole,
        searchApplication: this.filterApplication,
      };

      if (this.filterIsActive == 1 || this.filterIsActive == 0) {
        params.isActive = this.filterIsActive;
      }

      ApiService.query(`${process.env.VUE_APP_ROOT_API_1}/apis`, {
        params: params,
      })
        .then(({ data }) => {
          this.$store.commit(SET_PERMISSIONS, data.auth.permissions);
          // this.isReady = false;
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.listApi = data.result.apis;
          this.isReady = true;
        })
        .catch((e) => {
          this.listApi = [];
          if (e.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Maaf..",
              text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
            });
          }
        });
    },

    // return date time
    getReturnTime(time) {
      let timeObject = new Date(parseInt(time));
      let newDate = timeObject.toLocaleString();
      return newDate;
    },

    getReturnTimeSimple(time) {
      let timeObject = new Date(parseInt(time));
      let date = timeObject.getDate();
      let month = timeObject.getMonth() + 1;
      let year = timeObject.getFullYear();
      if (month.toString().length == 1) {
        month = `0${month}`;
      }
      if (date.toString().length == 1) {
        date = `0${date}`;
      }
      return `${year}/${month}/${date}`;
    },

    // show detail
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },

    // copy to clipboard
    copyToClipboard(id) {
      const fullUrl = window.location.href.split(":");
      const secure = fullUrl[0];
      const link = fullUrl[1].split("//");
      const local = link[1];
      if (secure == "http") {
        if (local == "localhost") {
          navigator.clipboard.writeText(id);
          Swal.fire({
            icon: "success",
            title: "Berhasil...",
            text: "Token berhasil disalin ke clipboard",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Ops...",
            text: "Anda harus memiliki url yang secure (https) agar dapat menyalin token",
          });
        }
      } else if (secure == "https") {
        navigator.clipboard.writeText(id);
        Swal.fire({
          icon: "success",
          title: "Berhasil...",
          text: "Token berhasil disalin ke clipboard",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ops...",
          text: "Anda harus memiliki url yang secure (https) agar dapat menyalin token",
        });
      }
    },

    // delete api
    deleteApi(id) {
      this.checkPermission(
        "administration_api_delete",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      Swal.fire({
        title: `Anda yakin ingin menghapus API ini?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          // call api to delete
          ApiService.delete(`${process.env.VUE_APP_ROOT_API_1}/apis/${id}`)
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil...",
                  text: "Anda berhasil menghapus data API",
                });
                this.getDataApi();
              }
            })
            .catch((e) => {
              if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Maaf..",
                  text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
                });
              }
            });
        }
      });
    },
    changeReady() {
      this.isReady = false;
    },

    // add api
    goToAddApi(id) {
      this.checkPermission(
        "administration_api_create",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.isAdd = true;
      this.$bvModal.show(id);
    },
    hideAdd() {
      this.isAdd = false;
    },

    // update Api
    updateApi(api, id) {
      this.checkPermission(
        "administration_api_update",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.apiSelected = api;
      this.isUpdate = true;
      this.$bvModal.show(id);
    },
    hideUpdate() {
      this.isUpdate = false;
    },

    // detail Api
    detailApi(api, id) {
      this.checkPermission(
        "administration_api_view",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.apiSelected = api;
      this.isDetail = true;
      this.$bvModal.show(id);
    },
    hideDetail() {
      this.isDetail = false;
    },
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-header {
  font-size: 20px;
  font-weight: bold;
}

/* table */
.card-detail {
  z-index: 999;
  position: absolute;
}
.list-detail {
  list-style-type: none;
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

/* hover icon copy */
.fa-copy {
  color: #ffffff !important;
  background-color: #ffa200 !important;
}

/* hover icon copy */
.fa-copy:hover {
  color: #ffffff !important;
  background-color: #d38704 !important;
}

.fa-eye {
  color: #ffffff !important;
  background-color: #139ae9 !important;
}

/* hover icon add */
.fa-eye:hover {
  color: #ffffff !important;
  background-color: #177db8 !important;
}

.fa-pen {
  color: #ffffff !important;
  background-color: #01b652 !important;
}

/* hover icon edit */
.fa-pen:hover {
  color: #ffffff !important;
  background-color: #009c46 !important;
}

.fa-trash {
  color: #ffffff !important;
  background-color: #f10000 !important;
}

/* hover icon delete */
.fa-trash:hover {
  color: #ffffff !important;
  background-color: #bb0000 !important;
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
</style>
