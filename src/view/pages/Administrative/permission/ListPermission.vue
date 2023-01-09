<template>
  <section id="list-permission">
    <div class="card">
      <div class="card-header">
        <div class="leading">
          <div class="title-header mr-5">List Permission</div>
        </div>
        <div class="actions">
          <div
            class="btn btn-success btn-sm mr-5"
            @click="addPermission('modal-add-permission')"
          >
            <i class="fas fa-sm fa-plus"></i> Tambah
          </div>
          <div
            class="btn btn-success btn-sm"
            @click="deleteMultiplePermissions"
          >
            <i class="fas fa-sm fa-trash"></i> Delete
          </div>
        </div>
      </div>
      <div class="card-body p-4">
        <div class="container">
          <!-- data ready -->
          <div class="table-responsive" v-if="isReady">
            <table
              class="table table-bordered table-hover text-center"
              id="table-list-permission"
            >
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      class="checkbox d-flex justiify-content-center"
                      disabled
                    />
                  </th>
                  <th>#</th>
                  <th>NAMA PERMISSION</th>
                  <th>DESKRIPSI</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td class="p-2">
                    <input
                      type="text"
                      class="form-control"
                      v-model="permissionName"
                      v-on:keyup="getDataPermission"
                      placeholder="Search..."
                    />
                  </td>
                  <td class="p-2">
                    <input
                      type="text"
                      class="form-control"
                      v-model="permissionDesc"
                      v-on:keyup="getDataPermission"
                      placeholder="Search..."
                    />
                  </td>
                  <td></td>
                </tr>
                <tr v-for="(perm, i) in listPermissions" :key="i">
                  <td>
                    <input
                      type="checkbox"
                      class="checkbox"
                      :value="perm"
                      v-model="dataChoose"
                    />
                  </td>
                  <td v-if="currentPage == 1">
                    <!-- detail secondary -->
                    <i
                      class="fas fa-minus-circle text-success icon-detail"
                      @click="showDetail(perm.id)"
                      v-if="showSecondaryDataId == perm.id"
                    ></i>
                    <i
                      class="fas fa-plus-circle text-success icon-detail"
                      @click="showDetail(perm.id)"
                      v-else
                    ></i>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == perm.id"
                    >
                      <div class="card pt-4 pl-4 pr-10">
                        <ul class="list-detail text-left">
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              perm.created_by
                                ? perm.created_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              perm.created_at
                                ? changeDateTime(perm.created_at)
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              perm.updated_by
                                ? perm.updated_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              perm.updated_at
                                ? changeDateTime(perm.updated_at)
                                : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 }}
                  </td>
                  <td v-else>
                    <!-- detail secondary -->
                    <i
                      class="fas fa-minus-circle text-success icon-detail"
                      @click="showDetail(perm.id)"
                      v-if="showSecondaryDataId == perm.id"
                    ></i>
                    <i
                      class="fas fa-plus-circle text-success icon-detail"
                      @click="showDetail(perm.id)"
                      v-else
                    ></i>
                    <div
                      class="card-detail"
                      v-if="showSecondaryDataId == perm.id"
                    >
                      <div class="card pt-4 pl-4 pr-10">
                        <ul class="list-detail text-left">
                          <li>
                            CREATED BY :
                            <span class="ml-4">{{
                              perm.created_by
                                ? perm.created_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            CREATED AT :
                            <span class="ml-4">{{
                              perm.created_at
                                ? changeDateTime(perm.created_at)
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED BY :
                            <span class="ml-4">{{
                              perm.updated_by
                                ? perm.updated_by.toUpperCase()
                                : "-"
                            }}</span>
                          </li>
                          <li>
                            UPDATED AT :
                            <span class="ml-4">{{
                              perm.updated_at
                                ? changeDateTime(perm.updated_at)
                                : "-"
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <!-- index -->
                    {{ i + 1 + (currentPage - 1) * perPage }}
                  </td>
                  <td>{{ perm.name.toUpperCase() }}</td>
                  <td>
                    {{
                      perm.description ? perm.description.toUpperCase() : "-"
                    }}
                  </td>
                  <td>
                    <i
                      class="fas fa-eye text-dark mr-5 icon-detail icon-view"
                      title="detail"
                      @click="detailPermission('modal-detail-permission', perm)"
                    ></i>
                    <i
                      class="fas fa-pen text-dark mr-5 icon-detail icon-edit"
                      title="update"
                      @click="updatePermission('modal-update-permission', perm)"
                    ></i>
                    <i
                      class="fas fa-trash text-dark icon-detail icon-delete"
                      title="hapus"
                      @click="justDelete(perm.id)"
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

          <Pagination
            @getData="getDataPermission"
            @changeStatusReady="changeReady"
          />
        </div>
      </div>
    </div>

    <!-- Modal Add Permission -->
    <AddPermission
      :selectedPermission="dataChoose"
      @hideAdd="hideAdd"
      @getDataPermissions="getDataPermission"
    />

    <!-- Modal Update Permission -->
    <UpdatePermission
      :selectedPermission="dataUpdate"
      :isUpdate="isUpdate"
      @hideUpdate="hideUpdate"
      @getDataPermissions="getDataPermission"
    />

    <!-- Modal Detail -->
    <DetailPermission
      :selectedPermission="dataDetail"
      :isDetail="isDetail"
      @hideDetail="hideDetail"
    />>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import AddPermission from "./AddPermission.vue";
import DetailPermission from "./DetailPermission.vue";
import UpdatePermission from "./UpdatePermission.vue";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.checkPermission(
      "administration_permissions",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Permission Management" },
    ]);
    this.$store.dispatch("setDefaultPagination");
    this.getDataPermission();
    this.writeNewTitle("Permission Management");
  },
  components: {
    Pagination,
    AddPermission,
    UpdatePermission,
    DetailPermission,
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  data() {
    return {
      listPermissions: [],

      // detail data
      showSecondaryDataId: null,

      // data ready
      isReady: false,

      // data choose
      dataChoose: [],

      // add data
      isAdd: false,

      // update data
      isUpdate: false,
      dataUpdate: {},

      // detail data
      isDetail: false,
      dataDetail: {},

      // search
      permissionName: "",
      permissionDesc: "",

      listPermission: this.getReturnRolePermissions(),
    };
  },
  watch: {
    permissionName() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataPermission();
    },
    permissionDesc() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataPermission();
    },
  },
  methods: {
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
    // get data
    getDataPermission() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `permissions?limit=${this.perPage}&page=${this.currentPage}&searchName=${this.permissionName}&searchDescription=${this.permissionDesc}`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.listPermissions = data.result.permissions;
          this.dataChoose = [];
          this.isReady = true;
        })
        .catch((e) => {
          this.listPermissions = [];
          this.$store.dispatch("setDefaultPagination");
          console.log(e);
        });
    },

    // show secondary detail
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    changeDateTime(time) {
      let miliseconds = time * 1000;
      let dateObject = new Date(miliseconds);
      return dateObject;
    },

    // pagination
    changeReady() {
      this.isReady = false;
    },

    // function to add
    addPermission(id) {
      this.checkPermission(
        "administration_permissions_create",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.dataChoose.length > 1) {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Parent permission hanya boleh 1 data",
        });
      } else {
        this.isAdd = true;
        this.$bvModal.show(id);
      }
    },
    hideAdd() {
      this.isAdd = false;
    },

    // delete permissions
    deleteMultiplePermissions() {
      this.checkPermission(
        "administration_permissions_delete",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      if (this.dataChoose.length) {
        this.justDelete();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Anda harus memilih setidaknya 1 permission untuk dihapus",
        });
      }
    },

    // delete permissions
    justDelete(id) {
      Swal.fire({
        title: `Anda yakin ingin menghapus permission ini?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          let idPermissions = [];

          // foreach id to idPerms
          if (this.dataChoose.length) {
            this.dataChoose.forEach((element) => {
              idPermissions.push(element.id);
            });
          }

          if (id !== null) {
            idPermissions.push(id);
          }

          // call api to delete
          ApiService.delete(
            `${
              process.env.VUE_APP_ROOT_API_3
            }/permissions?permissionId=${idPermissions.join("&permissionId=")}`
          )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: "Anda berhasil menghapus data permission.",
                });
                this.getDataPermission();
              }
            })
            .catch((e) => {
              if (e.response.status == 403) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Maaf, permission ini tidak dapat dihapus karena sudah digunakan untuk role!",
                });
              } else if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops",
                  text: "Maaf, server sedang dalam perbaikan. Silahkan coba beberapa saat lagi.",
                });
              }
            });
        }
      });
    },

    // update permission
    updatePermission(id, perm) {
      this.checkPermission(
        "administration_permissions_delete",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.dataUpdate = perm;
      this.isUpdate = true;
      this.$bvModal.show(id);
    },
    hideUpdate() {
      this.isUpdate = false;
    },

    // detail permission
    detailPermission(id, perm) {
      this.checkPermission(
        "administration_permissions_view",
        "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
      );
      this.dataDetail = perm;
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
.leading {
  display: flex;
  align-items: center;
}
.title-header {
  font-size: 20px;
  font-weight: bold;
}

/* table */
.icon-detail,
.form-select,
.checkbox {
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

.card-detail {
  z-index: 999;
  position: absolute;
}
.list-detail {
  list-style-type: none;
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

@media only screen and (max-width: 600px) {
  .card-header {
    display: initial;
  }
  .leading {
    display: initial;
  }
  .actions {
    margin-top: 10px;
  }
}
</style>
