<template>
  <b-modal
    id="modal-add-api"
    size="lg"
    title="Tambah API"
    ok-title="Simpan"
    @ok="addApi"
    button-size="sm"
    ok-variant="success"
    ok-only
    @close="closeAdd"
  >
    <section id="add-api">
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
  props: ["isAdd"],
  emits: ["getDataApi", "hideAdd"],
  data() {
    return {
      role: null,
      application: "",
      date: "",
      roleItems: [],
      normalizer(node) {
        return {
          label: node.title,
        };
      },
    };
  },
  components: {
    Treeselect,
  },
  watch: {
    isAdd: function () {
      if (this.isAdd == true) {
        this.getDataRoles();
      }
    },
  },
  methods: {
    addApi() {
      if (this.role == "" || this.role == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "API ROLE wajib diisi",
        });
        this.$emit("hideAdd");
      } else {
        if (this.application == "") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "APPLICATION wajib diisi",
          });
          this.$emit("hideAdd");
        } else {
          if (this.date == "") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "anda harus memilih tanggal expired",
            });
            this.$emit("hideAdd");
          } else {
            let dataPostApi = {
              application: this.application,
              expired_at: new Date(this.date).getTime(),
              is_active: 1,
              roleId: this.role,
            };

            // call api post data
            ApiService.post(
              `${process.env.VUE_APP_ROOT_API_1}/apis`,
              dataPostApi
            )
              .then(({ data }) => {
                if (data.code == 201) {
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil...",
                    text: "Anda berhasil menambahkan data API",
                  });
                  this.role = "";
                  this.application = "";
                  this.date = "";
                  this.roleItems = [];
                  this.$emit("hideAdd");
                  this.$emit("getDataApi");
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
        }
      }
    },
    getDataRoles() {
      ApiService.get(`${process.env.VUE_APP_ROOT_API_3}`, `roles`)
        .then(({ data }) => {
          this.roleItems = data.result.roles;
        })
        .catch((e) => {
          console.log(e.response);
        });
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
</style>
