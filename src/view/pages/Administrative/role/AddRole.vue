<template>
  <b-modal
    id="modal-add-role"
    size="xl"
    title="Tambah Role"
    ok-title="Simpan"
    button-size="sm"
    ok-variant="success"
    ok-only
    @ok="addNewRole"
    @close="closeAdd"
    @cancel="closeAdd"
    @hidden="closeAdd"
  >
    <section id="add-organisasi">
      <div class="container">
        <form>
          <!-- name, desc, template -->
          <div class="card p-4 mb-3">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >ROLE NAME <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="roleName" />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">ROLE DESCRIPTION :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="roleDescription"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">TEMPLATE ROLE :</label>
              <div class="col-sm-9">
                <b-form-select
                  class="form-control"
                  v-model="templateRoleSelected"
                  @change="updatePermissions"
                >
                  <option disabled value="">Pilih Template Role</option>
                  <option v-for="(role, i) in roleItems" :key="i" :value="role">
                    {{ role.title }}
                  </option>
                </b-form-select>
              </div>
            </div>
          </div>

          <!-- list permission uam -->
          <div class="card p-4">
            <label class="col-form-label mb-3">LIST PERMISSION UAM :</label>
            <div class="row">
              <!-- list wrap -->
              <div class="col-md-6">
                <div class="card p-3 card-permission mb-4">
                  <div class="mb-3">
                    <!-- select all -->
                    <div class="row">
                      <div class="col-md-10 align-middle">
                        <input
                          type="checkbox"
                          class="mr-2"
                          id="allPermission"
                          v-model="isSelectAll"
                          @change="selectAllPermission"
                        />
                        <label for="allPermission" v-if="isSelectAll"
                          >Hapus Semua Permission</label
                        >
                        <label for="allPermission" v-else
                          >Pilih Semua Permission</label
                        >
                      </div>
                    </div>
                    <!-- search -->
                    <div class="row">
                      <div class="col-md-8">
                        <input
                          v-model="searchKey"
                          type="text"
                          placeholder="Search..."
                          class="form-control form-search"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- list -->
                  <div
                    class="mb-3"
                    v-for="(permission, i) in searchPermission()"
                    :key="i"
                  >
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :value="permission"
                        :id="permission.id"
                        v-model="newListPermissions"
                      />
                      <label class="form-check-label" :for="permission.id">
                        {{ permission.name.toUpperCase() }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- choose list -->
              <div class="col-md-6">
                <div class="card card-permission p-8">
                  <ol>
                    <li v-for="(perm, i) in newListPermissions" :key="i">
                      {{ perm.name.toUpperCase() }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import ApiService from "@/core/services/api.service.js";

export default {
  props: ["isAdd"],
  emits: ["hideAdd", "getDataRoles"],
  data() {
    return {
      roleName: "",
      searchKey: "",
      roleItems: [],
      listPermissions: [],
      newListPermissions: [],
      roleDescription: "",
      templateRoleSelected: "",
      isSelectAll: false,
    };
  },
  watch: {
    isAdd: function () {
      if (this.isAdd == true) {
        this.getDataRole();
        this.getPermissions();
      }
    },
  },
  methods: {
    selectAllPermission() {
      if (this.isSelectAll) {
        this.newListPermissions = this.searchPermission();
      } else {
        this.newListPermissions = [];
      }
    },
    getDataRole() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `roles`)
        .then(({ data }) => {
          this.roleItems = data.result.roles;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPermissions() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `permissions`)
        .then(({ data }) => {
          data.result.permissions.forEach((element) => {
            let newElement = {
              id: element.id,
              name: element.name,
            };
            this.listPermissions.push(newElement);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchPermission() {
      let searchInput = this.searchKey.toLowerCase();
      return this.listPermissions.filter((perm) => {
        return perm.name.toLowerCase().search(searchInput) !== -1;
      });
    },
    updatePermissions() {
      this.newListPermissions = [];
      this.templateRoleSelected.permissions.forEach((element) => {
        if (element != null) {
          let newElement = {
            id: element.id,
            name: element.name,
          };
          this.newListPermissions.push(newElement);
        }
      });
    },
    addNewRole() {
      if (this.roleName == "" || this.roleName == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama role tidak boleh kosong!",
        });
      } else {
        // check permission in permission uam
        let newRolePermission = [];
        if (this.newListPermissions.length) {
          this.newListPermissions.forEach((element) => {
            newRolePermission.push(element.id);
          });
        }

        let dataRole = {
          title: this.roleName,
          description: this.roleDescription,
          permissionIds: newRolePermission,
        };
        ApiService.post(`${process.env.VUE_APP_ROOT_API_3}/roles`, dataRole)
          .then(({ data }) => {
            if (data.code == 201) {
              Swal.fire({
                icon: "success",
                title: "Berhasil...",
                text: "Role berhasil ditambahkan",
              });
            }
            this.roleName = "";
            this.roleDescription = "";
            this.templateRoleSelected = "";
            this.newListPermissions = [];
            this.$emit("getDataRoles");
            this.$emit("hideAdd");
          })
          .catch((e) => {
            if (e.response.status == 400) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sepertinya ada yang salah",
              });
              this.$emit("hideAdd");
            } else if (e.response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Maaf..",
                text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
              });
              this.$emit("hideAdd");
            }
            console.log(e);
          });
      }
      this.$emit("hideAdd");
    },
    closeAdd() {
      this.$emit("hideAdd");
    },
  },
};
</script>

<style scoped>
.col-form-label {
  font-weight: bold;
}
.required-icon {
  color: #c70000;
}
.form-control {
  background-color: #f4f8fa;
}
.form-search {
  background-color: #ffffff;
}
.card-permission {
  height: 600px;
  overflow: scroll;
}
</style>
