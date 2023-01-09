<template>
  <div>
    <div class="card">
      <!-- header card -->
      <b-row class="head-wrapper">
        <b-col>
          <h2 class="mt-7 ml-10">List Users</h2>
        </b-col>

        <!-- button add user -->
        <b-col>
          <div class="button-wrapper">
            <button
              class="btn btn-sm btn-success mr-5"
              @click="showModalAdd('add-user')"
            >
              <span><i class="fas fa-plus icon-sm"></i></span>
              Tambah
            </button>
          </div>
        </b-col>
        <!-- end button add user -->
      </b-row>
      <!-- header card -->

      <hr />

      <!-- table user -->
      <div class="p-10">
        <b-row>
          <b-col>
            <table
              class="table table-hover table-bordered table-striped table-responsive"
              id="table-monitoring"
              :current-page="currentPage"
              :per-page="perPage"
              small
            >
              <col style="width: 5%" />
              <col style="width: 10%" />
              <col style="width: 23%" />
              <col style="width: 20%" />
              <col style="width: 12%" />
              <col style="width: 9%" />
              <col style="width: 10%" />
              <col style="width: 20%" />
              <head-table-user :propsHeadConfig="headTable"></head-table-user>
              <tr>
                <th></th>
                <th>
                  <b-form-input
                    size="sm"
                    v-model="filterUsername"
                    placeholder="Search"
                    v-on:keyup="getUser"
                    style="height: 30px"
                  ></b-form-input>
                </th>
                <th>
                  <b-form-input
                    size="sm"
                    v-model="filterName"
                    placeholder="Search"
                    v-on:keyup="getUser"
                    style="height: 30px"
                  ></b-form-input>
                </th>
                <th>
                  <b-form-input
                    size="sm"
                    v-model="filterOrganization"
                    placeholder="Search"
                    v-on:keyup="getUser"
                    style="height: 30px"
                  ></b-form-input>
                </th>
                <th>
                  <input
                    type="text"
                    class="form-control"
                    v-model="filterRole"
                    placeholder="Search"
                    v-on:keyup="getUser"
                    style="height: 30px"
                  />
                </th>
                <th>
                  <select
                    class="form-control text-center"
                    v-model="filterLdap"
                    @change="getUser"
                    style="height: 30px; padding: 0px"
                  >
                    <option value="" selected disabled hidden>Pilih</option>
                    <option :value="null">ALL</option>
                    <option :value="1">LDAP</option>
                    <option :value="0">LOCAL</option>
                  </select>
                </th>
                <th>
                  <select
                    class="form-control text-center"
                    v-model="filterActive"
                    @change="getUser"
                    style="height: 30px; padding: 0px"
                  >
                    <option value="" selected disabled hidden>Pilih</option>
                    <option :value="null">ALL</option>
                    <option :value="1">ACTIVE</option>
                    <option :value="0">NOT ACTIVE</option>
                  </select>
                </th>
                <th></th>
              </tr>
              <tbody v-if="isReady">
                <tr v-for="(item, i) in dataUser" :key="i">
                  <td v-if="currentPage == 1">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        class="fas fa-minus-circle text-success icon-detail mx-1"
                        @click="showDetail(item.users_id)"
                        v-if="showSecondaryDataId == item.users_id"
                      ></i>
                      <i
                        class="fas fa-plus-circle text-success icon-detail mx-1"
                        @click="showDetail(item.users_id)"
                        v-else
                      ></i>
                      {{ i + 1 }}
                    </div>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == item.users_id"
                    >
                      <div class="text-left card pt-4 pl-4 pr-10">
                        <ul class="list-detail">
                          <li>
                            TELEGRAM VERIFIED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_telegram_verified)
                            }}</span>
                          </li>
                          <li>
                            TELEGRAM APPROVED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_telegram_approved)
                            }}</span>
                          </li>
                          <li>
                            EMAIL VERIFIED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_email_verified)
                            }}</span>
                          </li>
                          <li>
                            EXPIRED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.expired_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.created_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              getDataCreatedBy(item.created_by)
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
                              getDataCreatedBy(item.updated_by)
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td v-else>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <i
                        class="fas fa-minus-circle text-success icon-detail mx-1"
                        @click="showDetail(item.users_id)"
                        v-if="showSecondaryDataId == item.users_id"
                      ></i>
                      <i
                        class="fas fa-plus-circle text-success icon-detail mx-1"
                        @click="showDetail(item.users_id)"
                        v-else
                      ></i>
                      {{ i + 1 + (currentPage - 1) * perPage }}
                    </div>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == item.users_id"
                    >
                      <div class="text-left card pt-4 pl-4 pr-10">
                        <ul class="list-detail">
                          <li>
                            TELEGRAM VERIFIED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_telegram_verified)
                            }}</span>
                          </li>
                          <li>
                            TELEGRAM APPROVED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_telegram_approved)
                            }}</span>
                          </li>
                          <li>
                            EMAIL VERIFIED :
                            <span class="ml-4">{{
                              getDataVerified(item.is_email_verified)
                            }}</span>
                          </li>
                          <li>
                            EXPIRED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.expired_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              getDataReturn(item.created_at)
                            }}</span>
                          </li>
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              getDataCreatedBy(item.created_by)
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
                              getDataCreatedBy(item.updated_by)
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.organization }}</td>
                  <td>
                    {{ item.roles[0] ? item.roles[0].title : null }}
                  </td>
                  <td>
                    <span
                      class="switch switch-sm switch-icon justify-content-center"
                      v-if="item.is_ldap == 1"
                      @click="changeLdap(item, item.is_ldap)"
                    >
                      <label>
                        <input type="checkbox" checked="checked" />
                        <span></span>
                      </label>
                    </span>
                    <span
                      class="switch switch-sm switch-icon justify-content-center"
                      v-else
                      @click="changeLdap(item, item.is_ldap)"
                    >
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </span>
                  </td>
                  <td>
                    <span
                      class="switch switch-sm switch-icon justify-content-center"
                      v-if="item.is_active == 1"
                      @click="changeIsActive(item, item.is_active)"
                    >
                      <label>
                        <input type="checkbox" checked="checked" />
                        <span></span>
                      </label>
                    </span>
                    <span
                      class="switch switch-sm switch-icon justify-content-center"
                      v-else
                      @click="changeIsActive(item, item.is_active)"
                    >
                      <label>
                        <input class="justify-content-center" type="checkbox" />
                        <span></span>
                      </label>
                    </span>
                  </td>
                  <td class="px-0 text-center">
                    <i
                      class="fas fa-eye text-dark mx-1 icon-detail icon-view"
                      @click="showModalDetail(item.users_id)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark mx-1 icon-detail icon-edit"
                      @click="showModalEdit(item.users_id)"
                    ></i>
                    <i
                      class="fas fa-trash text-dark mx-1 icon-detail icon-delete"
                      @click="deleteUser(item)"
                    ></i>
                  </td>
                </tr>
                <tr v-if="dataUser.length == 0">
                  <td colspan="11">
                    <b-alert class="text-center" variant="warning" show
                      >User tidak ditemukan</b-alert
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="alert alert-warning mt-15" role="alert" v-else>
              User tidak ditemukan
            </div> -->
          </b-col>
        </b-row>
        <Pagination @getData="getUser" />
      </div>
      <!-- end table user -->
    </div>

    <!-- modal -->
    <add-user :isAdd="isAdd" @getUser="getUser" @closeAdd="closeAdd" />
    <detail-user
      :idSelected="idSelected"
      :isDetail="isDetail"
      @hideDetail="hideDetail"
    />
    <edit-user
      :userSelected="idSelected"
      v-on:success="getUser"
      :isUpdate="isUpdateUser"
      @hideUpdate="hideUpdateUser"
    />
    <!-- end modal -->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
// import { SET_USERNAME } from "@/core/services/store/user.module";
import ApiService from "@/core/services/api.service";
import Swal from "sweetalert2";
import textHelper from "@/core/helpers/textHelper.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { mapGetters } from "vuex";

export default {
  name: "User",
  data() {
    return {
      headTable: "headUser",
      dataUser: [],
      showSecondaryDataId: null,

      // pagination
      // prevCurrentPage: 0,
      // resultPage: 0,
      // currentPage: 1,
      // totalData: 0,
      // perPage: 10,
      // listPage: [5, 10, 15, 25],

      opened: [],

      // search filter
      idSelected: "",
      filterUsername: "",
      filterName: "",
      filterOrganization: "",
      filterRole: "",
      filterLdap: null,
      filterActive: null,
      isDetail: false,
      isUpdateUser: false,
      isAdd: false,
      isReady: false,
    };
  },
  mounted() {
    this.checkPermission(
      "administration_users",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.getUser();
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "User Management" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.writeNewTitle("User Management");
  },
  watch: {
    // currentPage: {
    //   handler: function () {
    //     this.getUser();
    //   },
    // },
    filterUsername() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getUser();
    },
    filterName() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getUser();
    },
    filterOrganization() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getUser();
    },
    filterRole() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getUser();
    },
    filterLdap() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getUser();
    },
  },
  computed: {
    activeUser: function () {
      return this.dataUser.filter(function (user) {
        return user.is_active === 1;
      });
    },
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  components: {
    HeadTableUser: () => import("../../Components/Table/HeadTableUser.vue"),
    AddUser: () => import("./AddUser.vue"),
    DetailUser: () => import("./DetailUser.vue"),
    EditUser: () => import("./EditUser.vue"),
    Pagination,
  },
  methods: {
    isUserLdap(user) {
      return user.is_ldap === this.filterLdap;
    },
    isUserActive(user) {
      return user.is_active === 1;
    },
    async getUser() {
      ApiService.query(
        `${process.env.VUE_APP_ROOT_API_1}/administrative/users`,
        {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            q_username: this.filterUsername,
            q_name: this.filterName,
            q_org_name: this.filterOrganization,
            q_role: this.filterRole,
            q_ldap: this.filterLdap,
            q_active: this.filterActive,
          },
        }
      )
        .then(({ data }) => {
          if (data.result.payload === []) {
            this.isReady = true;
            this.dataUser = [];
          } else {
            this.isReady = true;
            this.dataUser = data.result.payload.map((user) => {
              return {
                ...user,
                isLdap: user.is_ldap === this.filterLdap,
                isActive: user.is_active === 1,
              };
            });
            this.$store.dispatch("setCurrentPage", data.result.currentPage);
            this.$store.dispatch("setLastPage", data.result.lastPage);
            this.$store.dispatch("setPerPage", data.result.perPage);
            this.$store.dispatch("setTotalData", data.result.totalData);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `${error.response.data.message}`,
          });
        });
    },
    // updatePage() {
    //   this.getUser();
    // },
    // changePerPage() {
    //   this.getUser();
    // },
    showDetail(id) {
      this.checkPermission(
        "administration_users_view",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return textHelper.formatDate("YYYY-MM-DD H:mm:ss", data);
      }
    },
    getDataCreatedBy(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return data;
      }
    },
    getDataVerified(data) {
      if (data === 1) {
        return "Yes";
      } else {
        return "No";
      }
    },
    showModalDetail(id) {
      this.checkPermission(
        "administration_users_view",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.idSelected = id;
      this.isDetail = true;
      this.$bvModal.show("detail-user");
    },
    hideDetail() {
      this.isDetail = false;
    },
    changeLdap(data, isLdap) {
      let user = {
        is_ldap: isLdap == 1 ? 0 : 1,
      };
      ApiService.patch(
        `${process.env.VUE_APP_ROOT_API_1}/administrative/users-is/update/${data.users_id}`,
        user
      )
        .then(() => {
          this.getUser();
        })
        .catch((error) => {
          console.log(error, "ini error change ldap");
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },
    changeIsActive(data, isActive) {
      let user = {
        is_active: isActive == 1 ? 0 : 1,
      };
      ApiService.patch(
        `${process.env.VUE_APP_ROOT_API_1}/administrative/users-is/update/${data.users_id}`,
        user
      )
        .then(() => {
          this.getUser();
        })
        .catch((error) => {
          console.log(error.response);
          Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },
    showModalAdd(id) {
      this.checkPermission(
        "administration_users_create",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.$bvModal.show(id);
      this.isAdd = true;
    },
    closeAdd() {
      this.isAdd = false;
    },
    showModalEdit(id) {
      this.checkPermission(
        "administration_users_update",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.idSelected = id;
      this.isUpdateUser = true;
      this.$bvModal.show("edit-user");
    },
    hideUpdateUser() {
      this.isUpdateUser = false;
    },
    deleteUser(user) {
      this.checkPermission(
        "administration_users_delete",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      Swal.fire({
        title: `Anda yakin ingin menghapus user ${user.name}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_1}/administrative/users/delete/${user.users_id}`,
            {
              data: {
                is_deleted: 1,
              },
            }
          )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: `Anda telah berhasil menghapus user ${user.name}`,
                });
                this.getUser();
              } else if (data.code == 409) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Anda tidak berhak menghapus user ini",
                });
              } else if (data.code == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Maaf..",
                  text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi",
                });
              }
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

/* table */
.icon-detail {
  cursor: pointer;
}

/* hidden column */
.card-detail {
  z-index: 999;
  position: absolute;
}

.list-detail {
  list-style-type: none;
}

/* switch icon */
.switch input:empty ~ span:before {
  background-color: #afb2c7;
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
</style>
