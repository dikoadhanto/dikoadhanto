<template>
  <b-modal
    id="modal-update-api"
    size="lg"
    title="Update API"
    ok-title="Simpan"
    @ok="updateApi"
    button-size="sm"
    ok-variant="success"
    ok-only
    @close="closeUpdate"
  >
    <section id="update-api">
      <div class="container">
        <form>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >API ROLE <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <treeselect
                noOptionsText="Data tidak ada"
                noResultsText="API Role tidak ditemukan"
                :options="roleItems"
                placeholder="Pilih API Role"
                :normalizer="normalizer"
                :clear-on-select="true"
                v-model="role"
              >
              </treeselect>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label"
              >APPLICATION <span class="required-icon">*</span> :</label
            >
            <div class="col-sm-9">
              <input type="text" class="form-control" v-model="application" />
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">TOKEN :</label>
            <div class="col-sm-6 mb-2">
              <input
                type="text"
                class="form-control"
                disabled
                v-model="token"
              />
            </div>
            <div class="col-sm-3">
              <div class="btn btn-success px-8" @click="revokeToken">
                REVOKE TOKEN
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">EXPIRED DATE :</label>
            <div class="col-sm-9">
              <input type="date" class="form-control" v-model="date" />
            </div>
          </div>
        </form>
      </div>
    </section>
  </b-modal>
</template>

<script>
import Swal from "sweetalert2";
import Treeselect from "@riophae/vue-treeselect";
import ApiService from "@/core/services/api.service.js";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: ["apiSelected", "isUpdate"],
  emits: ["hideUpdate", "getDataApi"],
  components: {
    Treeselect,
  },
  data() {
    return {
      role: null,
      application: "",
      token: "",
      date: "",
      roleItems: [],
      normalizer(node) {
        return {
          label: node.title,
        };
      },
    };
  },
  watch: {
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.setDataApi();
        this.getDataRoles();
      }
    },
  },
  methods: {
    setDataApi() {
      this.application = this.apiSelected.application;
      this.token = this.apiSelected.token;
      this.date = this.getReturnTime(this.apiSelected.expired_at);
    },
    getReturnTime(time) {
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
      return `${year}-${month}-${date}`;
    },
    getDataRoles() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, `roles`)
        .then(({ data }) => {
          let dataRoleSelected = data.result.roles.find(
            (role) => role.id == this.apiSelected.role_id
          );
          this.role = dataRoleSelected.id;
          this.roleItems = data.result.roles;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    revokeToken() {
      let dataRevoke = {
        application: this.application,
        expired_at: new Date(this.date).getTime(),
        is_active: this.apiSelected.is_active,
        roleId: this.role,
      };

      // call api revoke token
      ApiService.put(
        `${process.env.VUE_APP_ROOT_API_1}/apis/${this.apiSelected.id}/generateToken`,
        dataRevoke
      )
        .then(({ data }) => {
          if (data.code == 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil..",
              text: "Anda berhasil melakukan Revoke Token",
            });
            this.$emit("hideUpdate");
          }
        })
        .catch((e) => {
          if (e.response.status == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: "Maaf, server sedang dalam perbaikan. Silahkan coba beberapa saat lagi",
            });
            this.$emit("hideUpdate");
          }
        });
    },
    updateApi() {
      if (this.role == "" || this.role == null) {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "API Role tidak boleh kosong",
        });
        this.$emit("hideUpdate");
      } else {
        if (this.application == "") {
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "Application tidak boleh kosong",
          });
          this.$emit("hideUpdate");
        } else {
          let dataUpdate = {
            application: this.application,
            expired_at: new Date(this.date).getTime(),
            is_active: this.apiSelected.is_active,
            roleId: this.role,
          };

          // call api update api
          ApiService.put(
            `${process.env.VUE_APP_ROOT_API_1}/apis/${this.apiSelected.id}`,
            dataUpdate
          )
            .then(({ data }) => {
              if (data.code == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil..",
                  text: "Anda berhasil melakukan Update API",
                });
                this.$emit("hideUpdate");
                this.$emit("getDataApi");
              }
            })
            .catch((e) => {
              if (e.response.status == 500) {
                Swal.fire({
                  icon: "error",
                  title: "Oops..",
                  text: "Maaf, server sedang dalam perbaikan. Silahkan coba beberapa saat lagi",
                });
                this.$emit("hideUpdate");
              }
            });
        }
      }
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
.form-control {
  background-color: #f4f8fa;
}
</style>
