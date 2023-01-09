<template>
  <section id="list-role">
    <div class="card">
      <div class="card-header">
        <div class="title-card">List Role</div>
        <div
          class="btn btn-success"
          @click="openModalAddRole('modal-add-role')"
        >
          <i class="fas fa-plus"></i> Tambah
        </div>
      </div>
      <div class="card-body">
        <!-- table -->
        <!--if data ready -->
        <div class="table-responsive" v-if="isReady">
          <table
            class="table table-bordered text-center table-striped"
            id="table-list-role"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>ROLE</th>
                <th>DESKRIPSI</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td class="p-2">
                  <input
                    type="text"
                    class="form-control"
                    v-model="roleTitle"
                    v-on:keyup="getDataRole"
                    placeholder="Search..."
                  />
                </td>
                <td class="p-2">
                  <input
                    type="text"
                    class="form-control"
                    v-model="roleDesc"
                    v-on:keyup="getDataRole"
                    placeholder="Search..."
                  />
                </td>
                <td></td>
              </tr>
              <tr v-for="(item, i) in items" :key="i">
                <!-- current page == 1 -->
                <td v-if="currentPage == 1">
                  <!-- detail secondary -->
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
                      <ul class="list-detail">
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            getDataReturn(item.created_by)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            getDataReturn(item.updated_by)
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- index -->
                  {{ i + 1 }}
                </td>

                <!-- current page != 1 -->
                <td v-else>
                  <!-- detail secondary -->
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
                      <ul class="list-detail">
                        <li>
                          CREATED BY :
                          <span class="ml-4">{{
                            getDataReturn(item.created_by)
                          }}</span>
                        </li>
                        <li>
                          UPDATED BY :
                          <span class="ml-4">{{
                            getDataReturn(item.updated_by)
                          }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- index -->
                  {{ i + 1 + (currentPage - 1) * perPage }}
                </td>
                <td>{{ item.title }}</td>
                <td>{{ item.description ? item.description : "-" }}</td>
                <td>
                  <!-- detail -->
                  <i
                    class="fas mr-4 fa-eye text-dark button-click icon-view"
                    title="detail"
                    @click="detailRole(item, 'modal-detail-role')"
                  ></i>
                  <!-- update -->
                  <i
                    class="fas mr-4 fa-pen text-dark button-click icon-edit"
                    title="update"
                    @click="openModalUpdate('modal-update-role', item)"
                  ></i>
                  <!-- link -->
                  <i
                    class="fas mr-4 fa-link text-dark button-click icon-add"
                    title="link"
                    style="display: none"
                    @click="goToLinkPage(item.id)"
                  ></i>
                  <!-- delete -->
                  <i
                    class="fas fa-trash text-dark button-click icon-delete"
                    title="hapus"
                    @click="deleteRole(item)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- if data not ready yet -->
        <div class="alert alert-warning mt-15" role="alert" v-else>
          Tunggu sebentar, sedang pengambilan data...
        </div>

        <Pagination @getData="getDataRole" @changeStatusReady="changeReady" />
      </div>
    </div>
    <!-- detail role -->
    <DetailRole
      :isDetail="isDetail"
      @hideDetail="hideDetail"
      :roleDetail="roleDetail"
    />

    <!-- modal add role -->
    <AddRole
      :isAdd="isAddRole"
      @hideAdd="hideAddRole"
      @getDataRoles="getDataRole"
    />

    <!-- modal update role -->
    <UpdateRole
      :isUpdate="isUpdateRole"
      :updateRoleSelected="updateRoleSelected"
      @hideUpdate="hideUpdateRole"
      @getDataRoles="getDataRole"
      @setNewPermission="setNewPermission"
    />
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import AddRole from "./AddRole.vue";
import DetailRole from "./DetailRole.vue";
import UpdateRole from "./UpdateRole.vue";
import ApiService from "@/core/services/api.service.js";
import Pagination from "@/view/pages/Components/Pagination.vue";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Administrative", subtitle: "Role Management" },
    ]);
    this.checkPermission(
      "administration_roles",
      "Maaf, Anda tidak dapat mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.$store.dispatch("setDefaultPagination");
    this.getDataRole();
    this.writeNewTitle("Role Management");
  },
  components: {
    AddRole,
    UpdateRole,
    DetailRole,
    Pagination,
  },
  computed: {
    ...mapGetters(["currentPage", "lastPage", "perPage", "totalData"]),
  },
  data() {
    return {
      // data
      items: [],
      isReady: false,

      // add
      isAddRole: false,

      // update
      isUpdateRole: false,
      updateRoleSelected: {},

      // detail
      isDetail: false,
      roleDetail: {},

      // detail secondary
      showSecondaryDataId: null,

      // permission
      listPermission: this.getReturnRolePermissions(),

      // search
      roleTitle: "",
      roleDesc: "",
    };
  },
  watch: {
    roleTitle() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataRole();
    },
    roleDesc() {
      this.$store.dispatch("setCurrentPage", 1);
      this.getDataRole();
    },
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
    getDataRole() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `roles?limit=${this.perPage}&page=${this.currentPage}&searchTitle=${this.roleTitle}&searchDescription=${this.roleDesc}`
      )
        .then(({ data }) => {
          this.$store.dispatch("setCurrentPage", data.result.currentPage);
          this.$store.dispatch("setLastPage", data.result.lastPage);
          this.$store.dispatch("setPerPage", data.result.perPage);
          this.$store.dispatch("setTotalData", data.result.totalData);
          this.items = data.result.roles;
          this.isReady = true;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    setNewPermission() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `roles?limit=10&page=1&searchTitle=&searchDescription=`
      )
        .then(({ data }) => {
          localStorage.setItem(
            "user_permissions",
            JSON.stringify(data.auth.permissions)
          );
          // refresh all component
          location.reload();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    goToLinkPage(id) {
      this.$router.push({ name: "Role Permission", params: { idRole: id } });
    },
    // pagination
    changeReady() {
      this.isReady = false;
    },

    // detail secondary
    showDetail(id) {
      this.showSecondaryDataId = this.showSecondaryDataId == id ? null : id;
    },
    getDataReturn(data) {
      if (data == null || data == "") {
        return "-";
      } else {
        return data;
      }
    },

    // add role
    openModalAddRole(id) {
      this.checkPermission(
        "administration_roles_create",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      this.$bvModal.show(id);
      this.isAddRole = true;
    },
    hideAddRole() {
      this.isAddRole = false;
    },

    // update
    openModalUpdate(id, role) {
      this.checkPermission(
        "administration_roles_update",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      (this.updateRoleSelected = role),
        (this.isUpdateRole = true),
        this.$bvModal.show(id);
    },
    hideUpdateRole() {
      this.isUpdateRole = false;
    },

    // delete
    deleteRole(role) {
      this.checkPermission(
        "administration_roles_delete",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      Swal.fire({
        title: `Anda yakin ingin menghapus role ${role.title}?`,
        showCancelButton: true,
        confirmButtonColor: "#c70000",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(
            `${process.env.VUE_APP_ROOT_API_3}/roles?roleId=${role.id}`
          )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil...",
                  text: `Anda berhasil menghapus data role ${role.title}`,
                });
                this.isReady = false;
                this.getDataRole();
              }
            })
            .catch((e) => {
              if (e.response.status == 403) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: `Maaf, data ini tidak bisa dihapus karena ${e.response.data.result}!`,
                });
              } else if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
                });
              }
              console.log(e.response);
            });
        }
      });
    },

    // detail role
    detailRole(role, idComponent) {
      this.checkPermission(
        "administration_roles_view",
        "Maaf, Anda tidak dapat melakukan aksi ini, karena Anda tidak memiliki hak akses"
      );
      this.isDetail = true;
      this.roleDetail = role;
      this.$bvModal.show(idComponent);
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
.card-header .title-card {
  font-weight: bold;
}
.search-button {
  display: flex;
  justify-content: end;
}
.search-button input {
  width: 40%;
}
/* table */
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
  background-color: #1bc5bd !important;
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

/* mobile view */
@media only screen and (max-width: 600px) {
  .search-button input {
    width: 60%;
  }
}
</style>
