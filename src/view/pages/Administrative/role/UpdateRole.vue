<template>
  <b-modal
    id="modal-update-role"
    size="xl"
    title="Update Role"
    ok-title="Simpan"
    button-size="sm"
    ok-variant="success"
    ok-only
    @ok="UpdateRole"
    @close="closeUpdate"
    @cancel="closeUpdate"
    @hidden="closeUpdate"
  >
    <section id="add-organisasi">
      <div class="container">
        <form>
          <!-- card name, desc and template -->
          <div class="card p-4 mb-10">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >ROLE NAME <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="nameRoleUpdate"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">ROLE DESCRIPTION :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="descRoleUpdate"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">TEMPLATE ROLE :</label>
              <div class="col-sm-9">
                <select
                  class="form-control"
                  v-model="roleChoose"
                  @change="updatePermissions"
                >
                  <option disabled value="">Pilih Template Role</option>
                  <option
                    v-for="(role, i) in dataRoleItems"
                    :key="i"
                    :value="role"
                  >
                    {{ role.title }}
                  </option>
                </select>
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
  props: ["isUpdate", "updateRoleSelected"],
  emits: ["hideUpdate", "getDataRoles", "setNewPermission"],
  data() {
    return {
      searchKey: "",
      roleChoose: {},
      dataRoleItems: [],
      nameRoleUpdate: "",
      descRoleUpdate: "",
      listPermissions: [],
      newListPermissions: [],
      isSelectAll: false,
    };
  },
  watch: {
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.listPermissions = [];
        this.newListPermissions = [];
        this.setDataRole();
        this.getDataRole();
        this.getPermissions();
        this.getPermissionRole();
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
    setDataRole() {
      this.roleChoose = this.updateRoleSelected;
      (this.nameRoleUpdate = this.updateRoleSelected.title),
        (this.descRoleUpdate = this.updateRoleSelected.description
          ? this.updateRoleSelected.description
          : "-");
    },
    getDataRole() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `roles`)
        .then(({ data }) => {
          this.dataRoleItems = data.result.roles;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getPermissionRole() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `roles/${this.updateRoleSelected.id}/permissions`
      )
        .then(({ data }) => {
          let permission = data.result.permissions;
          if (permission.length) {
            permission.forEach((element) => {
              let newElement = {
                id: element.id,
                name: element.name,
              };
              this.newListPermissions.push(newElement);
            });
          }
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
      this.roleChoose.permissions.forEach((element) => {
        if (element != null) {
          let newElement = {
            id: element.id,
            name: element.name,
          };
          this.newListPermissions.push(newElement);
        }
      });
    },
    UpdateRole() {
      if (this.nameRoleUpdate == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Nama role tidak boleh kosong!",
        });
      } else {
        let newRolePermission = [];
        // check permission in permission uam
        if (this.newListPermissions.length) {
          this.newListPermissions.forEach((element) => {
            newRolePermission.push(element.id);
          });
        }

        // set data role
        let dataRole = {
          title: this.nameRoleUpdate,
          description: this.descRoleUpdate,
          permissionIds: newRolePermission,
        };
        ApiService.put(
          `${process.env.VUE_APP_ROOT_API_3}/roles/${this.updateRoleSelected.id}`,
          dataRole
        )
          .then(({ data }) => {
            if (data.code == 200) {
              Swal.fire({
                icon: "success",
                title: "Berhasil...",
                text: "Role berhasil di update",
              });
            }
            this.nameRoleUpdate = "";
            this.descRoleUpdate = "";
            this.roleChoose = {};
            this.newListPermissions = [];
            this.$emit("getDataRoles");
            this.checkRoleUser(this.updateRoleSelected.id);
          })
          .catch((e) => {
            if (e.response.status == 400) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sepertinya ada yang salah",
              });
            } else if (e.response.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Maaf..",
                text: "Server sedang dalam perbaikan, silahkan coba beberapa saat lagi!",
              });
            }
            console.log(e);
          });
      }
      this.$emit("hideUpdate");
    },
    checkRoleUser(idRole) {
      const idUser = localStorage.getItem("user_id");
      ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        `administrative/users/${idUser}`
      )
        .then(({ data }) => {
          const idRolesUser = [];
          data.result.roles.forEach((role) => {
            idRolesUser.push(role.id);
          });
          if (idRolesUser.includes(idRole)) {
            this.$emit("setNewPermission");
          }
        })
        .catch((error) => {
          console.log(error, "log error");
        });
    },
    closeUpdate() {
      this.$emit("hideUpdate");
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
.form-control,
.card-permission {
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
