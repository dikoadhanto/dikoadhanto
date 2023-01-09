<template>
  <section id="list-permission">
    <div class="card">
      <div class="card-header">
        <div class="leading">
          <div class="title-header mr-5">List Permission</div>
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
                  <td v-if="checkRolePerm(perm.id)">
                    <input type="checkbox" class="checkbox" disabled checked />
                  </td>
                  <td v-else>
                    <input type="checkbox" class="checkbox" disabled />
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
                </tr>
              </tbody>
            </table>
          </div>

          <!-- data not ready -->
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
            <div class="row align-items-center">
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
                  Showing 1 - {{ perPage }} of {{ totalData }}
                </div>
                <div class="info-page" v-else>
                  Showing {{ (currentPage - 1) * perPage + 1 }} -
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
  </section>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  mounted() {
    this.checkPermission(
      "administration_permissions",
      "Maaf, Anda tidak dapet mengakses halaman ini, karena Anda tidak memiliki hak akses"
    );
    this.$store.dispatch(SET_BREADCRUMB, [
      {
        title: "Administrative",
        subtitle: "Role Management - Link To Permission",
      },
    ]);
    this.getDataPermission();
    this.getPermissionRole();
  },
  data() {
    return {
      // pagination and get data
      lastpage: 0,
      perPage: 10,
      totalData: 0,
      currentPage: 1,
      listPermissions: [],
      permissionName: "",
      permissionDesc: "",
      listPage: [5, 10, 15, 20],

      // detail data
      showSecondaryDataId: null,

      // data ready
      isReady: false,

      // data choose
      dataChoose: [],

      listPermission: this.getReturnRolePermissions(),
    };
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
            this.$router.push({ name: "Role" });
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
          this.currentPage = parseInt(data.result.currentPage);
          this.lastpage = data.result.lastpage;
          this.perPage = parseInt(data.result.perPage);
          this.totalData = parseInt(data.result.totalData);
          this.listPermissions = data.result.permissions;
          this.isReady = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPermissionRole() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `roles/${this.$route.params.idRole}/permissions`
      )
        .then(({ data }) => {
          let permission = data.result.permissions;
          if (permission.length) {
            permission.forEach((element) => {
              this.dataChoose.push(element.id);
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    checkRolePerm(id) {
      return this.dataChoose.includes(id) ? true : false;
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
    updatePage(page) {
      this.isReady = false;
      this.currentPage = page;
      this.getDataPermission();
    },
    changePerPage() {
      this.isReady = false;
      this.getDataPermission();
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
