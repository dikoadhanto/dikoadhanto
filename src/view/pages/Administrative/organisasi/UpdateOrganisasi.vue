<template>
  <b-modal
    id="modal-update-organisasi"
    size="lg"
    title="Update Organisasi"
    ok-variant="success"
    ok-title="Simpan"
    button-size="sm"
    ok-only
    @close="closeUpdate"
    @ok="updateDataOrganization"
  >
    <section id="update-organisasi">
      <div class="container">
        <form>
          <!-- parent and name -->
          <div class="card p-4 mb-10">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">PARENT ORGANISASI :</label>
              <div class="col-sm-9">
                <treeselect
                  class="tree-select"
                  v-model="parentId"
                  :options="listOrganization"
                  placeholder="Pilih parent organisasi..."
                  :normalizer="normalizer"
                  noChildrenText="Tidak ada data selanjutnya"
                  noOptionsText="Data belum ada"
                  @select="getParentUpdate"
                >
                </treeselect>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >NAMA ORGANISASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="nameOrganisasi"
                />
              </div>
            </div>
          </div>
          <!-- pic, lokasi and alamat -->
          <div class="card p-4">
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">NAMA PIC :</label>
              <div class="col-sm-9">
                <b-form-select class="form-control" v-model="picId" disabled>
                  <option disabled value="">Pilih Nama PIC</option>
                  <option
                    v-for="(pic, i) in dataPic"
                    :key="i"
                    :value="pic.users_id"
                  >
                    {{ pic.name }}
                  </option>
                </b-form-select>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label"
                >LOKASI <span class="required-icon">*</span> :</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="location"
                  disabled
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label class="col-sm-3 col-form-label">ALAMAT :</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  v-model="address"
                  disabled
                />
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
import Treeselect from "@riophae/vue-treeselect";
import ApiService from "@/core/services/api.service.js";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  props: ["idOrganizationUpdate", "isUpdate"],
  emits: ["hideUpdate", "getAllDataOrganization"],
  data() {
    return {
      picId: "",
      address: "",
      dataPic: [],
      location: "",
      parentId: "",
      oldLevel: "",
      nameOrganisasi: "",
      parentSelected: {},
      listOrganization: [],
      normalizer(node) {
        return {
          label: node.name,
          children: node.organizations,
        };
      },
    };
  },
  components: {
    Treeselect,
  },
  watch: {
    isUpdate: function () {
      if (this.isUpdate == true) {
        this.getDetailOrganization();
      }
    },
  },
  methods: {
    getDetailOrganization() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_3,
        `organizations/${this.idOrganizationUpdate}`
      )
        .then(({ data }) => {
          if (data.code == 200) {
            this.parentId = data.result.parent_id;
            this.nameOrganisasi = data.result.name;
            this.oldLevel = parseInt(data.result.level);
            this.picId = data.result.pic == "null" ? "" : data.result.pic;
            this.location =
              data.result.sname == "null" ? "-" : data.result.sname;
            this.address =
              data.result.address == "null" ? "-" : data.result.address;
            this.getDataOrganizations();
            this.getDataPic();
          } else if (data.code == 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // function get data all organization
    getDataOrganizations() {
      ApiService.get(process.env.VUE_APP_ROOT_API_3, "organizations/hierarchy")
        .then(({ data }) => {
          let dataOrg = data.result.organizations;
          this.listOrganization = dataOrg;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDataPic() {
      ApiService.get(
        process.env.VUE_APP_ROOT_API_1,
        "administrative/users"
      ).then(({ data }) => {
        this.dataPic = data.result.payload;
      });
    },
    getParentUpdate(node) {
      this.parentSelected = node;
    },
    updateDataOrganization() {
      if (this.parentId == "" || this.parentId == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda harus memilih parent terlebih dahulu!",
        });
      } else {
        if (
          this.parentSelected.level == 3 ||
          this.parentSelected.level == "3"
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Level tingkat 3 tidak bisa menjadi parent. Anda harus memilih tingkat level diatasnya",
          });
        } else if (this.parentId == this.idOrganizationUpdate) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Anda tidak boleh memilih organisasi yang sedang diupdate sebagai parent",
          });
        } else {
          if (this.nameOrganisasi == "" || this.nameOrganisasi == null) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Nama organisasi wajib diisi...",
            });
          } else {
            if (
              this.location == "-" ||
              this.location == "" ||
              this.location == null
            ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Lokasi wajib diisi...",
              });
            } else {
              let dataOrganizationUpdate = {
                parentId: this.parentId,
                name: this.nameOrganisasi,
                sname: this.location,
                level: this.isEmptyObject(this.parentSelected)
                  ? this.oldLevel
                  : parseInt(this.parentSelected.level) + 1,
                address: this.address,
                pic: this.picId,
              };
              ApiService.put(
                `${process.env.VUE_APP_ROOT_API_3}/organizations/${this.idOrganizationUpdate}`,
                dataOrganizationUpdate
              )
                .then(({ data }) => {
                  if (data.code == 200) {
                    Swal.fire({
                      icon: "success",
                      title: "Sukses",
                      text: `Anda berhasil mengupdate data organisasi ${this.nameOrganisasi}`,
                    });
                    this.$emit("hideUpdate");
                    this.$emit("getAllDataOrganization");
                  }
                })
                .catch((e) => {
                  if (e.response.status == 500) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Maaf, server sedang dalam perbaikan. Mohon menunggu sebentar lagi!",
                    });
                    this.$emit("hideUpdate");
                  }
                  console.log(e);
                });
            }
          }
        }
      }
    },
    isEmptyObject(obj) {
      return JSON.stringify(obj) === "{}";
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
.form-control {
  background-color: #f4f8fa;
}
.required-icon {
  color: #c70000;
}
.tree-select {
  background-color: #f4f8fa !important;
}
</style>
